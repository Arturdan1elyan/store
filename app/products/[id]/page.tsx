import { ProductDetail } from "@/components/ProductDetail";
import { ProductPageParams, Product } from "@/types";
import React from "react";

export default async function ProductPage({ params }: ProductPageParams) {
  const { id } = await params;

  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error(`Failed to fetch product with id ${id}`);

  const product: Product = await res.json();
  if (!product) return <p>Product not found</p>;

  return (
    <div className="container mx-auto w-[60%]">
      <ProductDetail product={product} />
    </div>
  );
}
