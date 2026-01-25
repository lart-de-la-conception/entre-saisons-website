"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Money = { amount: string; currencyCode: string };

export type ShopifyCartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: { title: string; handle: string };
    image?: { url: string; altText?: string | null } | null;
    price?: Money | null;
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
  };
  lines: ShopifyCartLine[];
};

type CartContextType = {
  cartId: string | null;
  cart: ShopifyCart | null;
  isLoading: boolean;
  addByTitleAndSize: (title: string, size: string, quantity?: number) => Promise<void>;
  addByHandleAndSize: (handle: string, size: string, quantity?: number) => Promise<void>;
  updateLineQty: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
  clearLocal: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
};

const CartContext = createContext<CartContextType | null>(null);
const CART_ID_KEY = "shopify_cart_id_v1";

function normalizeCart(raw: any): ShopifyCart | null {
  if (!raw?.id) return null;
  const lines: ShopifyCartLine[] =
    raw?.lines?.edges?.map((e: any) => e.node).filter(Boolean) ?? [];
  return { ...raw, lines };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load persisted cartId
  useEffect(() => {
    try {
      const id = localStorage.getItem(CART_ID_KEY);
      if (id) setCartId(id);
    } catch {}
  }, []);

  // Fetch cart when cartId changes
  useEffect(() => {
    if (!cartId) return;
    let cancelled = false;
    (async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/shopify/cart/get", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartId }),
        });
        const json = await res.json();
        const nextCart = normalizeCart(json?.data?.cart);
        if (!cancelled) setCart(nextCart);
      } catch {
        // ignore
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [cartId]);

  const api = useMemo<CartContextType>(() => {
    return {
      cartId,
      cart,
      isLoading,
      isDrawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      toggleDrawer: () => setDrawerOpen((v) => !v),
      clearLocal: () => {
        try {
          localStorage.removeItem(CART_ID_KEY);
        } catch {}
        setCartId(null);
        setCart(null);
      },
      addByTitleAndSize: async (title, size, quantity = 1) => {
        setIsLoading(true);
        try {
          const res = await fetch("/api/shopify/cart/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cartId, title, size, quantity }),
          });
          const json = await res.json();
          const nextCart = normalizeCart(json?.data?.cartLinesAdd?.cart);
          const nextCartId = json?.cartId ?? cartId;
          if (nextCartId && nextCartId !== cartId) {
            setCartId(nextCartId);
            try {
              localStorage.setItem(CART_ID_KEY, nextCartId);
            } catch {}
          }
          setCart(nextCart);
          setDrawerOpen(true);
        } finally {
          setIsLoading(false);
        }
      },
      addByHandleAndSize: async (handle, size, quantity = 1) => {
        setIsLoading(true);
        try {
          const res = await fetch("/api/shopify/cart/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cartId, handle, size, quantity }),
          });
          const json = await res.json();
          const nextCart = normalizeCart(json?.data?.cartLinesAdd?.cart);
          const nextCartId = json?.cartId ?? cartId;
          if (nextCartId && nextCartId !== cartId) {
            setCartId(nextCartId);
            try {
              localStorage.setItem(CART_ID_KEY, nextCartId);
            } catch {}
          }
          setCart(nextCart);
          setDrawerOpen(true);
        } finally {
          setIsLoading(false);
        }
      },
      updateLineQty: async (lineId, quantity) => {
        if (!cartId) return;
        setIsLoading(true);
        try {
          const res = await fetch("/api/shopify/cart/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cartId, lineId, quantity }),
          });
          const json = await res.json();
          setCart(normalizeCart(json?.data?.cartLinesUpdate?.cart));
        } finally {
          setIsLoading(false);
        }
      },
      removeLine: async (lineId) => {
        if (!cartId) return;
        setIsLoading(true);
        try {
          const res = await fetch("/api/shopify/cart/remove", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cartId, lineId }),
          });
          const json = await res.json();
          setCart(normalizeCart(json?.data?.cartLinesRemove?.cart));
        } finally {
          setIsLoading(false);
        }
      },
    };
  }, [cartId, cart, isDrawerOpen, isLoading]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

