import { shopifyFetch } from "../../_lib";
import { CART_QUERY } from "../_queries";

type CartGetResponse = {
  cart: unknown;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { cartId?: string } | null;
  if (!body?.cartId) {
    return Response.json({ error: "cartId required" }, { status: 400 });
  }
  const { status, json } = await shopifyFetch<CartGetResponse>(CART_QUERY, { cartId: body.cartId }, request);
  return Response.json(json, { status });
}

