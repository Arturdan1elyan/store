"use client";

import Image from "next/image";
import Link from "next/link";
import { useProducts } from "@/context/ProductContext";
import { useMemo, useState } from "react";
import { useOrders } from "@/context/OrderContext";

export function Products() {
  const { products, loading, error } = useProducts();
  const { handleAddToCart } = useOrders();
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const currentProducts = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  }, [page, products]);

  const pagesArr = Array.from({ length: totalPages }, (_, i) => i + 1);
  const prev = () => setPage((p) => Math.max(p - 1, 1));
  const next = () => setPage((p) => Math.min(p + 1, totalPages));

  if (loading)
    return (
      <p className="text-center text-gray-500 text-lg mt-20">Loading...</p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 font-medium mt-20">
        Error: {error}
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {currentProducts.map((product) => (
            <li
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <Link href={`/products/${product.id}`} className="group">
                <div className="relative w-full h-64 bg-gray-100 rounded-t-2xl overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 min-h-[3rem]">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Price: <span className="font-bold">${product.price}</span>
                  </p>
                  {product.rating && (
                    <p className="text-sm text-yellow-600">
                      ⭐ {product.rating.rate}{" "}
                      <span className="text-gray-500">
                        ({product.rating.count})
                      </span>
                    </p>
                  )}
                </div>
              </Link>
              <div className="mt-auto px-4 pb-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-medium transition-colors duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </li>
          ))}
        </ul>

        {pagesArr.length > 1 && (
          <div className="mt-10 flex justify-center items-center gap-2">
            <button
              onClick={prev}
              disabled={page === 1}
              className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &lt;
            </button>
            {pagesArr.map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  page === p
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={next}
              disabled={page === totalPages}
              className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
