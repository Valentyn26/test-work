"use client";
import { Product } from "@/store/ProductSlice";
import { use, useEffect, useState } from "react";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (id) {
            fetch(`https://fakestoreapi.com/products/${id}`)
                .then((res) => res.json())
                .then((data) => setProduct(data));
        }
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full w-[400px] rounded-lg shadow-lg"
                />
                <div className="md:w-1/2">
                    <h1 className="text-2xl font-bold">{product.title}</h1>
                    <p className="text-lg text-gray-600 mt-2">{product.category}</p>
                    <p className="text-xl font-semibold mt-4">${product.price}</p>
                    <p className="mt-4 text-gray-700">{product.description}</p>
                    <div className="mt-4">
                        <span className="text-yellow-500">Rating: {product.rating.rate}</span>
                        <span className="text-gray-500 ml-2">({product.rating.count})</span>
                    </div>
                </div>
            </div>
        </div>
    )
}