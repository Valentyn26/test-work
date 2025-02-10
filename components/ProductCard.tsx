import { Product } from "@/store/ProductSlice";

export default function ProductCard({ prod }: { prod: Product }) {
    return (
        <article
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
    )
}