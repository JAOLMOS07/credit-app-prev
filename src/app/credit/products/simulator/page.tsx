'use client'

import LayoutBase from "@/components/shared/layout/LayoutBase";
import { Simulator } from "@/components/simulator/form/CreateSimulatorForm";
import { useSelectedProduct } from "@/stores/useSelectedProduct";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SimulatorPage() {
    const { selectedProduct } = useSelectedProduct();
    const router = useRouter();
    function back(){
        router.back()
    }
    useEffect(() => {
        if (!selectedProduct) {
            router.push("/credit/products");
        }
    }, [selectedProduct, router]);

    if (!selectedProduct) return null;

    return (
        <LayoutBase showBackButton={back} title="Simulador de crédito">
            <Simulator  product={selectedProduct} />
        </LayoutBase>
    );
}
