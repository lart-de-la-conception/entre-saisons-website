"use client";

import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";

export default function HeaderCartButton() {
  const pathname = usePathname();
  const { openDrawer, cart } = useCart();
  if (pathname === "/" || pathname === "/ethos" || pathname === "/tracklist") return null;
  const count = cart?.totalQuantity ?? 0;
  return (
    <button
      onClick={openDrawer}
      className="whitespace-nowrap text-[10px] uppercase tracking-[0.08em] text-black hover:opacity-70 sm:text-xs"
      aria-label="Open cart"
    >
      Cart{count > 0 ? ` (${count})` : ""}
    </button>
  );
}

