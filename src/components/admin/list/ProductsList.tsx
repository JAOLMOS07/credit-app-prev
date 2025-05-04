"use client";

import ProductItemCard from "@/components/shared/card/ProductItemCard";
import {useEffect, useState} from "react";
import api from "@/lib/api";
import {Product} from "@/models/Product";
import Loader from "@/components/loader/loader";
import {MdInbox} from "react-icons/md";


export default function ProductList() {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState<Product[]>();
    const [loading,setLoading] = useState(false);
    const getProducts = async () => {
        setLoading(true);
        try {
            const data = await api.get('products');
            if (data) {
                setProducts(data.data);
            }
        } catch (e) {
            console.error("Error al obtener productos", e);
        }finally {
            setLoading(false);
        }
    };

    function refresh() {
        getProducts();
    }
    useEffect(() => {
        getProducts();
    }, []);

    const filteredProducts = products?.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    ) ?? [];

    return (
        <div className="p-2 space-y-6">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Buscar producto..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-md p-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {filteredProducts.length === 0 ? (
                            <div
                                className="col-span-full flex flex-col items-center justify-center py-10 text-slate-400 dark:text-slate-500">
                                <MdInbox className="text-6xl mb-2"/>
                                <p className="text-lg">No hay productos</p>
                            </div>
                        ) : (
                            filteredProducts.map((product) => (
                                <ProductItemCard key={product.id} product={product} refresh={refresh}/>
                            ))
                        )}
                    </div>

                </>
            )}
        </div>
    );

}
