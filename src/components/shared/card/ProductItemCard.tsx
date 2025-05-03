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
};

export default function ProductItemCard({ product }: Props) {
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
        //await api.delete(product.id);
        notifySuccess("Producto eliminado exitosamente")
    };

    return (
        <div className="relative bg-white rounded-2xl shadow-md p-4 overflow-hidden">
            <div
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20"
                style={{ backgroundColor: product.color }}
            />
            <div className="relative z-10 space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">{product.name}</h3>
                <p className="text-sm text-slate-600">Tasa: {product.rate}% anual</p>
                <p className="text-sm text-slate-600">
                    Monto: ${product.minAmount} - ${product.maxAmount}
                </p>
                <p className="text-sm text-slate-600">
                    Plazo: {product.minTerm} a {product.maxTerm} meses
                </p>

                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-red-600 hover:text-red-800 transition"
                    >
                        <LuTrash size={18} />
                    </button>
                    <button
                        onClick={handleEdit}
                        className="text-blue-600 hover:text-blue-800 transition"
                    >
                        <LuPencil size={18} />
                    </button>
                    <button
                        onClick={handleSimulate}
                        className="text-green-600 hover:text-green-800 transition"
                    >
                        <FiShoppingCart size={18} />
                    </button>
                </div>
            </div>

            <DeleteConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
            />
        </div>
    );
}
