import { NextResponse } from "next/server";

const COOKIE_NAME = "es_products_access";

export async function POST(req: Request) {
  const password = process.env.PRODUCTS_PASSWORD;
  const token = process.env.PRODUCTS_GATE_TOKEN;

  if (!password || !token) {
    return NextResponse.json(
      {
        ok: false,
        error: "Missing env vars",
        required: ["PRODUCTS_PASSWORD", "PRODUCTS_GATE_TOKEN"],
      },
      { status: 500 }
    );
  }

  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    // ignore
  }

  const provided = typeof (body as any)?.password === "string" ? (body as any).password : "";
  if (provided !== password) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}

