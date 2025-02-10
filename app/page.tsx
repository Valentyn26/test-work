"use client";
import ProductCard from "@/components/ProductCard";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchProducts, Filter, filterProducts, selectFilteredProducts } from "@/store/ProductSlice";
import React, { useEffect, useState } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectFilteredProducts);
  const status = useAppSelector(state => state.products.status);
  const error = useAppSelector(state => state.products.error);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<Filter>({
    text: "",
    categories: [],
    price: {
      from: "",
      to: "",
    },
    rate: 0
  });
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(json => setCategories(json))
  }, []);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const newFilter = { ...filter, text: e.target.value };
    setFilter(newFilter);
    dispatch(filterProducts(newFilter));
  }

  function handleCategoryChange(category: string) {
    let updatedCategories;

    if (filter.categories.includes(category)) {
      updatedCategories = filter.categories.filter(c => c !== category);
    } else {
      updatedCategories = [...filter.categories, category];
    }

    const newFilter = { ...filter, categories: updatedCategories };
    setFilter(newFilter);
    dispatch(filterProducts(newFilter));
  }

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>, type: "from" | "to") {
    const newPriceFilter = { ...filter.price, [type]: e.target.value };
    const newFilter = { ...filter, price: newPriceFilter };

    setFilter(newFilter);
    dispatch(filterProducts(newFilter));
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
      <input onChange={handleSearch} type="text" placeholder="Search" value={filter.text}
        className="border border-gray- px-3 py-2 rounded-lg focus:outline-none focus:border-gray-500"
      />
      {categories.map(c =>
        <label key={c}>
          <input onChange={() => handleCategoryChange(c)} type="checkbox" checked={filter.categories.includes(c)} />
          {c}
        </label>
      )}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Price from"
          value={filter.price.from}
          onChange={(e) => handlePriceChange(e, "from")}
          className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-gray-500"
        />

        <input
          type="text"
          placeholder="Price to"
          value={filter.price.to}
          onChange={(e) => handlePriceChange(e, "to")}
          className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-gray-500"
        />
      </div>
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
