"use client";

import React from "react";
import { Cart } from "./Cart";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
              alt="Logo"
              width={32}
              height={32}
              className="drop-shadow-sm"
            />
            <span className="text-xl font-bold text-gray-800 tracking-wide">
              MyShop
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/products"
              className="text-gray-700 hover:text-blue-600 text-sm font-medium transition cursor-pointer"
            >
              Products
            </Link>
            <div className="text-gray-700 hover:text-blue-600 text-sm font-medium transition cursor-pointer">
              About
            </div>

            <Cart />
          </div>
        </div>
      </div>
    </header>
  );
}
