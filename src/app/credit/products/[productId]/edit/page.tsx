'use client'
import {CreateProductForm} from "@/components/admin/form/CreateProductForm";
import LayoutBase from "@/components/shared/layout/LayoutBase";
import {useRouter} from "next/navigation";
import {EditProductForm} from "@/components/admin/form/EditProductForm";


export default function editProductPage() {
    const router = useRouter();
    function back(){
        router.back()
    }
    return (

        <LayoutBase
            showBackButton={back}
            title="Editar nuevo producto"
        >
            <EditProductForm />
        </LayoutBase>
    )
}