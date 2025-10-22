"use client";

import { useOrders } from "@/context/OrderContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function Cart() {
  const { orders, handleUpdate, handleDelete } = useOrders();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const totalQuantity = orders.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = orders.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!isOpen) return;
      if (
        wrapperRef.current &&
        event.target &&
        !wrapperRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={wrapperRef} className="relative z-50">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative p-2 rounded-full hover:bg-gray-200 transition"
        aria-label="Cart"
      >
        <img
          style={{ objectFit: "contain", cursor: "pointer" }}
          src="https://cdn-icons-png.flaticon.com/512/3081/3081986.png"
          alt="cart icon"
          width={36}
          height={36}
        />
        {totalQuantity > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow">
            {totalQuantity}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-96 bg-white border border-gray-200 rounded-xl shadow-xl p-5 animate-fade-in">
          <h3 className="text-xl font-bold text-gray-800 mb-4"> Your Cart</h3>

          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-gray-500 py-10">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
                alt="empty cart"
                width={64}
                height={64}
              />
              <p className="mt-3 text-sm">Your cart is currently empty.</p>
            </div>
          ) : (
            <div>
              <ul className="space-y-4 max-h-64 overflow-y-auto pr-1">
                {orders.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-4 border-b pb-3"
                  >
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                      <Image
                        style={{ objectFit: "contain" }}
                        src={item.image}
                        alt={item.title}
                        width={50}
                        height={50}
                        className="object-contain"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 line-clamp-2">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => handleUpdate(item.id, -1)}
                          disabled={item.quantity === 1}
                          className="w-7 h-7 bg-gray-200 hover:bg-gray-300 rounded text-sm font-bold disabled:opacity-50"
                        >
                          −
                        </button>
                        <span className="text-sm font-medium w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdate(item.id, 1)}
                          className="w-7 h-7 bg-gray-200 hover:bg-gray-300 rounded text-sm font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-white hover:bg-red-700 text-xs mt-1 bg-red-500 w-7 h-7 flex items-center justify-center cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t pt-4 mt-4 flex justify-between items-center">
                <p className="text-sm font-medium text-gray-600">Total:</p>
                <p className="text-lg font-bold text-blue-600">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
