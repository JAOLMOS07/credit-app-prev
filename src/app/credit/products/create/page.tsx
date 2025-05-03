'use client'
import {CreateProductForm} from "@/components/admin/form/CreateProductForm";
import LayoutBase from "@/components/shared/layout/LayoutBase";
import {useRouter} from "next/navigation";


export default function createProductPage() {
    const router = useRouter();
    function back(){
        router.back()
    }
    return (

        <LayoutBase
            showBackButton={back}
            title="Crear nuevo producto"
        >
            <CreateProductForm />
        </LayoutBase>
    )
}