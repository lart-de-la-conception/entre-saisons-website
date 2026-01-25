type ShopifyFetchResult<T> = {
  data?: T;
  errors?: unknown;
};

export function getShopifyEndpoint() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const version = process.env.SHOPIFY_STOREFRONT_API_VERSION;
  if (!domain || !version) {
    throw new Error("Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_API_VERSION");
  }
  return `https://${domain}/api/${version}/graphql.json`;
}

export function getStorefrontAccessToken() {
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!token) throw new Error("Missing SHOPIFY_STOREFRONT_ACCESS_TOKEN");
  return token;
}

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  request?: Request
): Promise<{ status: number; json: ShopifyFetchResult<T> }> {
  const endpoint = getShopifyEndpoint();
  const token = getStorefrontAccessToken();

  const buyerIp =
    request?.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined;

  const res = await fetch(endpoint, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
      ...(buyerIp ? { "Shopify-Storefront-Buyer-IP": buyerIp } : {}),
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = (await res.json()) as ShopifyFetchResult<T>;
  return { status: res.status, json };
}

