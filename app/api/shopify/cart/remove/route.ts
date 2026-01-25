import { shopifyFetch } from "../../_lib";
import { CART_LINES_REMOVE_MUTATION } from "../_queries";

type CartLinesRemoveResponse = {
  cartLinesRemove: {
    cart: unknown;
    userErrors: Array<{ field: string[] | null; message: string }>;
  };
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { cartId?: string; lineId?: string }
    | null;

  if (!body?.cartId || !body?.lineId) {
    return Response.json({ error: "cartId and lineId required" }, { status: 400 });
  }

  const { status, json } = await shopifyFetch<CartLinesRemoveResponse>(
    CART_LINES_REMOVE_MUTATION,
    { cartId: body.cartId, lineIds: [body.lineId] },
    request
  );
  return Response.json(json, { status });
}

