import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "es_products_access";

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Protect /products and all sub-routes, but allow the login page itself.
  const isProductsRoute = pathname === "/products" || pathname.startsWith("/products/");
  const isLoginRoute = pathname === "/products/login";

  if (!isProductsRoute || isLoginRoute) return NextResponse.next();

  const token = process.env.PRODUCTS_GATE_TOKEN;
  // If no token is configured, default to "locked" to avoid accidental exposure.
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/products/login";
    url.searchParams.set("next", pathname + (search || ""));
    url.searchParams.set("misconfigured", "1");
    return NextResponse.redirect(url);
  }

  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  if (cookie === token) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/products/login";
  url.searchParams.set("next", pathname + (search || ""));
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/products/:path*"],
};

