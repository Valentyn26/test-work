"use client";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchProducts, selectFilteredProducts } from "@/store/ProductSlice";
import { useEffect, useState } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectFilteredProducts);
  const status = useAppSelector(state => state.products.status);
  const error = useAppSelector(state => state.products.error);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  console.log(products);

  let pageCount = Math.ceil(products.length / 10);
  let pagesArr: number[] = [];
  for (let i = 0; i < pageCount; i++) {
    pagesArr.push(i + 1);
  }

  const startIndex = (currentPage - 1) * 10;
  const endIndex = currentPage * 10;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <main className="p-6">
      <section className="max-w-6xl m-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>
        <div className="grid grid-cols-5 gap-6 mb-5">
          {currentProducts.map((prod, index) => (
            <article
              key={prod.id}
              className="bg-white shadow-md rounded-xl overflow-hidden p-4 flex flex-col items-center"
            >
              <div className="w-[179.2px] aspect-square relative rounded-xl overflow-hidden">
                <img className="absolute w-full h-full object-cover" src={prod.image} alt={prod.title} />
              </div>
              <section className="mt-4 text-center">
                <h2 className="text-lg font-semibold">{prod.title}</h2>
                <p className="text-gray-500">{prod.category}</p>
                <p className="text-lg font-bold mt-2">${prod.price}</p>
              </section>
            </article>
          ))}
        </div>
        <div className="flex justify-center gap-x-3">
          {pagesArr.map(page =>
            <button onClick={() => setCurrentPage(page)} key={page} type="button"
              className={`px-4 py-2 rounded ${currentPage === page ? "bg-blue-400 text-white" : "bg-white text-blue-500"
                }`}
            >
              {page}
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
