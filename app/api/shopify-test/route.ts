export async function GET(request: Request) {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const version = process.env.SHOPIFY_STOREFRONT_API_VERSION;
  const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !version || !accessToken) {
    return Response.json(
      {
        error: "Missing Shopify env vars",
        required: [
          "SHOPIFY_STORE_DOMAIN",
          "SHOPIFY_STOREFRONT_API_VERSION",
          "SHOPIFY_STOREFRONT_ACCESS_TOKEN",
        ],
      },
      { status: 500 }
    );
  }

  const endpoint = `https://${domain}/api/${version}/graphql.json`;

  // Shopify recommends including buyer IP on server-side requests tied to buyer traffic
  const buyerIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined;

  const query = `
    {
      products(first: 1) {
        edges {
          node {
            id
            title
            handle
            description
            availableForSale
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(endpoint, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": accessToken,
      ...(buyerIp ? { "Shopify-Storefront-Buyer-IP": buyerIp } : {}),
    },
    body: JSON.stringify({ query }),
  });

  let json: unknown = null;
  try {
    json = await res.json();
  } catch {
    // ignore
  }

  return Response.json(
    {
      status: res.status,
      ok: res.ok,
      endpoint,
      response: json,
    },
    { status: res.ok ? 200 : res.status }
  );
}