import { shopifyFetch } from "../../_lib";
import { CART_CREATE_MUTATION } from "../_queries";

type CartCreateResponse = {
  cartCreate: {
    cart: unknown;
    userErrors: Array<{ field: string[] | null; message: string }>;
  };
};

export async function POST(request: Request) {
  const { status, json } = await shopifyFetch<CartCreateResponse>(CART_CREATE_MUTATION, undefined, request);
  return Response.json(json, { status });
}

