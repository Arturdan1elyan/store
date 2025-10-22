"use client";

import { OrderContextType, Order, Product } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

const orderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const handleAddToCart = (product: Product) => {
    const exitingOrder = orders.find((item) => item.id === product.id);

    if (exitingOrder) {
      const newOrders = orders.map((order) =>
        order.id === product.id
          ? { ...order, quantity: order.quantity + 1 }
          : order
      );

      setOrders(newOrders);
    } else {
      setOrders([...orders, { ...product, quantity: 1 }]);
    }
  };

  const handleUpdate = (id: number, sum: number) => {
    const newQuantity = orders.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + sum } : item
    );

    newQuantity.filter((item) => item.quantity > 0);
    setOrders(newQuantity);
  };

  const handleDelete = (id: number) => {
    const updatedOrder = orders.filter((item) => item.id !== id);
    setOrders(updatedOrder);
  };

  return (
    <orderContext.Provider
      value={{
        orders,
        handleAddToCart,
        handleUpdate,
        handleDelete,
      }}
    >
      {children}
    </orderContext.Provider>
  );
}
export function useOrders(): OrderContextType {
  const context = useContext(orderContext);
  if (!context)
    throw new Error("useProducts must be used within a ProductProvider");
  return context;
}
