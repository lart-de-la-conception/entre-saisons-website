import { shopifyFetch } from "../../_lib";
import { CART_LINES_ADD_MUTATION, PRODUCT_VARIANTS_BY_HANDLE_QUERY } from "../_queries";

type ProductByHandleResponse = {
  productByHandle: {
    title: string;
    variants: {
      edges: Array<{
        node: {
          id: string;
          availableForSale: boolean;
          selectedOptions: Array<{ name: string; value: string }>;
        };
      }>;
    };
  } | null;
};

type CartLinesAddResponse = {
  cartLinesAdd: {
    cart: unknown;
    userErrors: Array<{ field: string[] | null; message: string }>;
  };
};

function findVariantId(product: ProductByHandleResponse, size: string) {
  const node = product.productByHandle;
  if (!node) return null;
  const s = size.trim().toLowerCase();
  for (const edge of node.variants.edges) {
    const v = edge.node;
    const match = v.selectedOptions.some(
      (opt) => opt.name.toLowerCase() === "size" && opt.value.trim().toLowerCase() === s
    );
    if (match) return v.id;
  }
  // If no "Size" option exists, fall back to first variant
  return node.variants.edges[0]?.node?.id ?? null;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { cartId?: string; handle?: string; size?: string; quantity?: number }
    | null;

  const handle = body?.handle?.trim();
  const size = (body?.size ?? "S").trim();
  const quantity = Math.max(1, Number(body?.quantity ?? 1));

  if (!handle) return Response.json({ error: "handle required" }, { status: 400 });

  // Create a cart if missing
  let cartId = body?.cartId;
  if (!cartId) {
    const createRes = await shopifyFetch<{ cartCreate: { cart: { id: string } } }>(
      `mutation { cartCreate { cart { id } } }`,
      undefined,
      request
    );
    const created = (createRes.json as any)?.data?.cartCreate?.cart?.id;
    if (!created) return Response.json(createRes.json, { status: createRes.status });
    cartId = created;
  }

  const prodRes = await shopifyFetch<ProductByHandleResponse>(
    PRODUCT_VARIANTS_BY_HANDLE_QUERY,
    { handle },
    request
  );
  const prodData = (prodRes.json as any)?.data as ProductByHandleResponse | undefined;
  if (!prodData?.productByHandle) {
    return Response.json({ error: "product not found", handle }, { status: 404 });
  }

  const variantId = findVariantId(prodData, size);
  if (!variantId) return Response.json({ error: "variant not found", handle, size }, { status: 404 });

  const { status, json } = await shopifyFetch<CartLinesAddResponse>(
    CART_LINES_ADD_MUTATION,
    { cartId, lines: [{ merchandiseId: variantId, quantity }] },
    request
  );

  // include cartId for client persistence
  return Response.json({ ...json, cartId }, { status });
}

