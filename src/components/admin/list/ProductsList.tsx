"use client";

import ProductItemCard from "@/components/shared/card/ProductItemCard";
import { useState } from "react";

const sampleProducts = [
    {
        id: "1",
        name: "Crédito rápido",
        rate: 12.5,
        color: "#4F46E5", // Indigo
        minAmount: 1000,
        maxAmount: 50000,
        minTerm: 6,
        maxTerm: 60,
    },
    {
        id: "2",
        name: "Préstamo estudiantil",
        rate: 8.2,
        color: "#059669", // Emerald
        minAmount: 500,
        maxAmount: 20000,
        minTerm: 12,
        maxTerm: 48,
    },
    {
        id: "3",
        name: "Financiamiento de auto",
        rate: 10.0,
        color: "#DB2777", // Pink
        minAmount: 5000,
        maxAmount: 100000,
        minTerm: 24,
        maxTerm: 72,
    },
    {
        id: "4",
        name: "Crédito empresarial",
        rate: 14.75,
        color: "#F59E0B", // Amber
        minAmount: 10000,
        maxAmount: 500000,
        minTerm: 6,
        maxTerm: 120,
    },
    {
        id: "5",
        name: "Préstamo para remodelación",
        rate: 9.5,
        color: "#10B981", // Teal
        minAmount: 3000,
        maxAmount: 70000,
        minTerm: 12,
        maxTerm: 60,
    },
    {
        id: "6",
        name: "Línea de crédito personal",
        rate: 11.9,
        color: "#3B82F6", // Blue
        minAmount: 2000,
        maxAmount: 40000,
        minTerm: 3,
        maxTerm: 24,
    },
];

export default function ProductList() {
    const [search, setSearch] = useState("");

    const filteredProducts = sampleProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6">
            <input
                type="text"
                placeholder="Buscar producto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-md p-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <ProductItemCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
