import {CreateProductForm} from "@/components/admin/form/CreateProductForm";
import LayoutBase from "@/components/shared/layout/LayoutBase";
import ProductList from "@/components/admin/list/ProductsList";
import Button from "@/components/shared/button/ButtonSC";
import {BiPlus} from "react-icons/bi";



export default function productsPage() {

    return (

        <LayoutBase
            title="Productos"
            actionButton={<Button href="products/create" icon={<BiPlus />} variant="outlined">
                Crear producto
            </Button>}
        >
            <ProductList />
        </LayoutBase>
    )
}