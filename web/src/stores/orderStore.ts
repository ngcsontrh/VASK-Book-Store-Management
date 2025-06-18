"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order } from "~/models/Order.model";

export interface OrderState {
  orders: Order[];
  selectedOrderId: string | null;

  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrder: (orderId: string, updatedOrder: Partial<Order>) => void;
  removeOrder: (orderId: string) => void;
  setSelectedOrderId: (orderId: string | null) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      selectedOrderId: null,

      setOrders: (orders) => set({ orders }),
      addOrder: (order) =>
        set((state) => ({ orders: [...state.orders, order] })),
      updateOrder: (orderId, updatedOrder) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, ...updatedOrder } : order,
          ),
        })),
      removeOrder: (orderId) =>
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== orderId),
        })),
      setSelectedOrderId: (orderId) => set({ selectedOrderId: orderId }),
    }),
    {
      name: "order-storage",
      partialize: (state) => ({
        orders: state.orders,
        selectedOrderId: state.selectedOrderId,
      }),
    },
  ),
);
