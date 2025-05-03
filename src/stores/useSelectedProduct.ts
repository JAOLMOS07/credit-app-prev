import { create } from "zustand";
import {Product} from "@/models/Product";
type Store = {
    selectedProduct: Product | null;
    setSelectedProduct: (product: Product) => void;
    clearProduct: () => void;
};

export const useSelectedProduct = create<Store>((set) => ({
    selectedProduct: null,
    setSelectedProduct: (product) => set({ selectedProduct: product }),
    clearProduct: () => set({ selectedProduct: null }),
}));
