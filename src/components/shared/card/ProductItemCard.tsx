import { useState } from "react";
import { LuPencil, LuTrash } from "react-icons/lu";
import { FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useSelectedProduct } from "@/stores/useSelectedProduct";
import { Product } from "@/models/Product";
import {DeleteConfirmModal} from "@/components/admin/modal/DeleteConfirmModal";
import api from "@/lib/api";
import {notifySuccess} from "@/utils/notify";
type Props = {
    product: Product;
    refresh: () => void;
};

export default function ProductItemCard({ product,refresh }: Props) {
    const router = useRouter();
    const { setSelectedProduct } = useSelectedProduct();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSimulate = () => {
        setSelectedProduct(product);
        router.push("products/simulator");
    };

    const handleEdit = () => {
        setSelectedProduct(product);
        router.push(`products/${product.id}/edit`);
    };

    const handleDelete = async () => {
        await api.delete(`/products/${product.id}`);
        notifySuccess("Producto eliminado exitosamente")
        refresh()

    };

    return (
        <div
            className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-md dark:shadow-lg p-4 overflow-hidden transition-colors h-full flex flex-col justify-between">
            <div
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 dark:opacity-10"
                style={{backgroundColor: product.color}}
            />

            <div className="relative z-10 space-y-2">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                    {product.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Tasa: {product.rate}% anual
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Monto: ${product.min_amount.toLocaleString()} - ${product.max_amount.toLocaleString()}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Plazo: {product.min_term} a {product.max_term} meses
                </p>
            </div>

            <div className="relative z-10 mt-4 flex justify-around gap-2">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-red-600 hover:text-red-800 dark:hover:text-red-500 transition"
                >
                    <LuTrash size={18}/>
                </button>
                <button
                    onClick={handleEdit}
                    className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 transition"
                >
                    <LuPencil size={18}/>
                </button>
                <button
                    onClick={handleSimulate}
                    className="text-green-600 hover:text-green-800 dark:hover:text-green-400 transition"
                >
                    <FiShoppingCart size={18}/>
                </button>
            </div>

            <DeleteConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
            />
        </div>

    );
}
