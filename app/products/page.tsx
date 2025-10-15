// import { Products } from "@/components/Products";

// export default function ProductsPage() {
//   return (
//     <div className=" flex flex-col items-center justify-center ">
//       <h1>Products page</h1>
//       <Products />
//     </div>
//   );
// }

import { Products } from "@/components/Products";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 py-16 px-6">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight mb-4">
          Products
        </h1>
   
      </header>

      <div className="flex justify-center">
        <Products />
      </div>
    </main>
  );
}
