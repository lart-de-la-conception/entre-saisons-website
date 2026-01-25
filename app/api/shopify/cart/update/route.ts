import { shopifyFetch } from "../../_lib";
import { CART_LINES_UPDATE_MUTATION } from "../_queries";

type CartLinesUpdateResponse = {
  cartLinesUpdate: {
    cart: unknown;
    userErrors: Array<{ field: string[] | null; message: string }>;
  };
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { cartId?: string; lineId?: string; quantity?: number }
    | null;

  if (!body?.cartId || !body?.lineId) {
    return Response.json({ error: "cartId and lineId required" }, { status: 400 });
  }
  const quantity = Math.max(1, Number(body.quantity ?? 1));

  const { status, json } = await shopifyFetch<CartLinesUpdateResponse>(
    CART_LINES_UPDATE_MUTATION,
    { cartId: body.cartId, lines: [{ id: body.lineId, quantity }] },
    request
  );
  return Response.json(json, { status });
}

