"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import noImg from "@/public/no-image.png";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export function Products() {
  const [list, setList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setList(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500 text-lg animate-pulse">
          Loading products...
        </div>
      </div>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 py-16 px-6">
     

      <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {list.map((p) => (
          <li
            key={p.id}
            className="group bg-white shadow-lg rounded-2xl p-5 flex flex-col items-center justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100"
          >
            <Link
              href={`/products/${p.id}`}
              className="w-full flex flex-col items-center"
            >
              <div className="relative w-full h-64">
                <Image
                  src={p.image || noImg}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-contain rounded-xl transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="mt-5 text-center">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-pink-600 transition-colors">
                  {p.title}
                </h3>
                <p className="text-xl font-bold text-pink-600">{p.price} $</p>
              </div>
            </Link>
            <button className="mt-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md hover:from-pink-600 hover:to-purple-600 transition-all duration-300  cursor-pointer">
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
