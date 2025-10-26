"use client";

import React from "react";
import { Cart } from "./Cart";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-indigo-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
              alt="Logo"
              width={36}
              height={36}
              className="drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-xl font-bold text-gray-800 tracking-wide group-hover:text-indigo-600 transition-colors">
              MyShop
            </span>
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link
              href="/products"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Link href="/login">
                <button
                  className="relative text-sm px-5 py-2.5 rounded-full font-medium text-indigo-600 
                    bg-white border border-indigo-100 
                    hover:border-indigo-300 hover:text-indigo-700
                    shadow-sm hover:shadow-md transition-all duration-300
                    active:scale-[0.98] cursor-pointer"
                >
                  Sign in
                </button>
              </Link>

              <Link href="/registration">
                <button
                  className="relative text-sm px-5 py-2.5 rounded-full font-medium text-white 
                    bg-gradient-to-r from-indigo-600 via-purple-500 to-cyan-500
                    shadow-md hover:shadow-lg hover:brightness-110 
                    transition-all duration-300
                    active:scale-[0.98] cursor-pointer"
                >
                  <span className="relative z-10">Sign up</span>
                  <div className="absolute inset-0 rounded-full bg-white/10 blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Link>
            </div>
            <div className="relative">
              <Cart />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
