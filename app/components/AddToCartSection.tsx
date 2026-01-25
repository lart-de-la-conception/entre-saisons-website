"use client";

import { useState } from "react";
import SizeSelector from "./SizeSelector";
import { useCart } from "./CartContext";

type Props = {
  slug: string;
  name: string;
  shopifyHandle: string;
  priceLabel?: string;
  sizes?: string[];
};

export default function AddToCartSection({ slug, name, shopifyHandle, priceLabel, sizes = ["S", "M", "L"] }: Props) {
  const [size, setSize] = useState<string | null>(sizes[0] ?? null);
  const { addByHandleAndSize, openDrawer, isLoading } = useCart();

  async function handleAdd() {
    if (!size || sizes.length === 0) return;
    await addByHandleAndSize(shopifyHandle, size, 1);
    openDrawer();
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {sizes.length > 0 && (
        <SizeSelector sizes={sizes} defaultSelected={sizes[0] ?? null} onChange={setSize} />
      )}
      {sizes.length === 0 ? (
        <button
          type="button"
          className="inline-flex cursor-not-allowed items-center bg-black px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white opacity-60"
          disabled
        >
          Notify Me
        </button>
      ) : (
        <button
          type="button"
          onClick={handleAdd}
          disabled={isLoading}
          className="inline-flex items-center bg-black px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white disabled:opacity-60"
        >
          {isLoading ? "Adding…" : `Add to Cart${priceLabel ? ` — ${priceLabel}` : ""}`}
        </button>
      )}
    </div>
  );
}

