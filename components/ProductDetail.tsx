"use client";

import { useOrders } from "@/context/OrderContext";
import { Product } from "@/types/index";
import Image from "next/image";

export function ProductDetail({ product }: { product: Product }) {
  const { handleAddToCart } = useOrders();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 transition-all duration-300">
        <div className="relative bg-gray-50 p-6 flex items-center justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="p-8 space-y-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
              {product.title}
            </h1>
            <p className="text-gray-600 text-sm mt-2">{product.category}</p>

            <div className="mt-4">
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                Description
              </p>
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                {product.description}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl text-center">
                <p className="text-xs text-gray-500 uppercase mb-1">Price</p>
                <p className="text-xl font-semibold text-blue-700">
                  ${product.price}
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-xl text-center">
                <p className="text-xs text-gray-500 uppercase mb-1">Rating</p>
                <p className="text-lg font-medium text-yellow-600">
                  ⭐ {product.rating?.rate}
                </p>
                <p className="text-xs text-gray-500">
                  {product.rating?.count} reviews
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleAddToCart(product)}
            className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 rounded-xl font-semibold text-lg shadow-md transition-all duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
