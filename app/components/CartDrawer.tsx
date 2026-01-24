"use client";

import { useCart } from "./CartContext";
import Image from "next/image";
import comingSoon from "../../media/coming-soon.svg";

export default function CartDrawer() {
  const { isDrawerOpen, closeDrawer, items, updateQty, removeItem, subtotal } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeDrawer}
        className={[
          "fixed inset-0 z-40 bg-black/40 transition-opacity duration-300",
          isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />
      {/* Panel */}
      <aside
        aria-hidden={!isDrawerOpen}
        className={[
          "fixed right-0 top-0 z-50 h-full w-[360px] bg-white shadow-xl transition-transform duration-300",
          isDrawerOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="text-base font-medium uppercase tracking-wide text-black mt-2 ml-2">
            Cart {items.length > 0 ? `(${items.reduce((a, b) => a + b.qty, 0)})` : ""}
          </h2>
          <button onClick={closeDrawer} className="text-sm text-zinc-600 hover:text-black mt-2 mr-2">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="px-5 py-8 text-sm text-zinc-600">Your cart is empty.</div>
        ) : (
          <div className="flex h-[calc(100%-64px)] flex-col">
            <ul className="flex-1 overflow-auto px-5 py-4 space-y-6">
              {items.map((item) => (
                <li key={item.id} className="p-0 transform scale-[0.8] origin-top">
                  <div className="flex flex-col items-center text-center">
                    <Image
                      src={comingSoon}
                      alt={item.name}
                      width={400}
                      height={400}
                      className="h-auto w-full max-w-[240px] object-contain"
                    />
                    <div className="mt-4">
                      <div className="text-sm font-semibold uppercase text-black">
                        {item.name}
                      </div>
                      <div className="mt-1 text-xs uppercase text-zinc-600">Size {item.size}</div>
                      <div className="mt-1 text-xs text-zinc-800">
                        {item.priceLabel || `$${item.price.toFixed(2)}`}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-6">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
                        className="text-lg text-black hover:opacity-70"
                      >
                        &minus;
                      </button>
                      <span className="text-sm">{item.qty}</span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="text-lg text-black hover:opacity-70"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="mt-3 text-xs uppercase tracking-wide text-black/70 hover:text-black"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="px-5 py-6">
              <div
                className="text-[12px] mb-4 flex items-baseline justify-center gap-3"
                style={{
                  fontFamily:
                    'ITC Franklin Gothic Std Demi Condensed, "Franklin Gothic Demi Cond", "Franklin Gothic Medium Cond", "Franklin Gothic", Arial, sans-serif',
                }}
              >
                <span className="font-light uppercase tracking-wide text-black">
                  Subtotal :
                </span>
                <span className="font-light text-black">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <button
                onClick={closeDrawer}
                className="block w-full bg-[#171717] py-5 text-center text-sm font-semibold uppercase tracking-wide text-white"
              >
                Continue to Checkout
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

