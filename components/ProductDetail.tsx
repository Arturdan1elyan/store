"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import noImg from "@/public/no-image.png";
import { Star } from "lucide-react";

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: string;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export function ProductDetail({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg animate-pulse">
        Loading product details...
      </div>
    );
  if (error)
    return (
      <p className="text-center text-red-500 font-semibold mt-20">{error}</p>
    );
  if (!product)
    return <p className="text-center text-gray-500 mt-20">Not found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 py-16 px-6 flex justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-4xl flex flex-col md:flex-row items-center gap-10 transition-all duration-500 hover:shadow-pink-200/70 hover:-translate-y-1">
        {/* Product Image */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <Image
              src={product.image || noImg}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-contain rounded-2xl transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-extrabold text-gray-800 leading-tight">
            {product.title}
          </h1>

          <div className="flex items-center gap-2 text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={20}
                className={
                  i < Math.round(product.rating?.rate)
                    ? "fill-yellow-400"
                    : "fill-gray-200"
                }
              />
            ))}
            <span className="text-gray-600 ml-1 text-sm">
              ({product.rating?.count} reviews)
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed text-base">
            {product.description}
          </p>

          <p className="text-2xl font-bold text-pink-600 mt-2">
            {product.price} $
          </p>

          <div className="mt-6 flex gap-4">
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold  cursor-pointer">
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
