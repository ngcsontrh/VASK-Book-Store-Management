"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Book } from "~/models/Book.model";

export interface CartItem {
  book: Book;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  selectedForCheckout: string[];

  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  setSelectedForCheckout: (bookIds: string[]) => void;
  clearSelectedForCheckout: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      selectedForCheckout: [],

      addToCart: (book, quantity = 1) => {
        const existing = get().cartItems.find((i) => i.book.id === book.id);
        if (existing) {
          set((state) => ({
            cartItems: state.cartItems.map((item) =>
              item.book.id === book.id
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            ),
          }));
        } else {
          set((state) => ({
            cartItems: [...state.cartItems, { book, quantity }],
          }));
        }
      },

      removeFromCart: (bookId) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.book.id !== bookId),
        }));
      },

      updateQuantity: (bookId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(bookId);
          return;
        }
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.book.id === bookId ? { ...item, quantity } : item,
          ),
        }));
      },

      clearCart: () => set({ cartItems: [] }),

      getCartTotal: () =>
        get().cartItems.reduce(
          (total, item) => total + item.book.price * item.quantity,
          0,
        ),

      getCartItemsCount: () => get().cartItems.length,

      setSelectedForCheckout: (bookIds) => {
        set({ selectedForCheckout: bookIds });
      },

      clearSelectedForCheckout: () => {
        set({ selectedForCheckout: [] });
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
