"use client";
import ProductCard from "@/components/ProductCard";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchProducts, productFilterChanged, selectFilteredProducts } from "@/store/ProductSlice";
import React, { useEffect, useState } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectFilteredProducts);
  const status = useAppSelector(state => state.products.status);
  const error = useAppSelector(state => state.products.error);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  console.log(products);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    dispatch(productFilterChanged(e.target.value));
  }

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
      <input onChange={handleSearch} type="text" placeholder="Search" value={search}
        className="border border-gray- px-3 py-2 rounded-lg focus:outline-none focus:border-gray-500"
      />
      <section className="max-w-6xl m-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>
        <div className="grid grid-cols-5 gap-6 mb-5">
          {currentProducts.map((prod) => (
            <ProductCard key={prod.id} prod={prod} />
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
