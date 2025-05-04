"use client";

import {useEffect, useState} from "react";
import Input from "@/components/shared/Input/InputSC";
import Button from "@/components/shared/button/ButtonSC";
import {useParams, useRouter} from "next/navigation";
import api from "@/lib/api";
import {Product} from "@/models/Product";
import {notifyError, notifySuccess} from "@/utils/notify";
import {validateProduct} from "@/utils/validatePorducts";
import Loader from "@/components/loader/loader";
import ProductItemCard from "@/components/shared/card/ProductItemCard";

export function EditProductForm() {
    const [form, setForm] = useState<Product>({
        id: "",
        name: "",
        rate: 0,
        min_amount: 0,
        max_amount: 1,
        min_term: 0,
        max_term: 1,
        color: "#3b82f6",
    });
    const router = useRouter();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading,setLoading] = useState(false);

    const { productId } = useParams();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);

            try {
                const response = await api.get(`/products/${productId}`);
                const productResponse = response.data;

                const product ={
                    id: productResponse.id,
                    name: productResponse.name,
                    rate: productResponse.rate,
                    min_amount: productResponse.min_amount,
                    max_amount: productResponse.max_amount,
                    min_term: productResponse.min_term,
                    max_term: productResponse.max_term,
                    color: productResponse.color,
                }
                setForm(product);
            }catch (e) {

            }finally {
                setLoading(false);

            }
        };

        fetchProduct();
    }, [productId]);
    const validate = () => {
        const newErrors: Record<string, string> = {};
        const {
            name,
            rate,
            min_amount,
            max_amount,
            min_term,
            max_term,
        } = form;

        if (!name) newErrors.name = "El nombre es obligatorio";
        if (!rate || Number(rate) <= 0) newErrors.rate = "Tasa inválida";
        if (!min_amount || !max_amount) {
            newErrors.min_amount = "Requerido";
            newErrors.max_amount = "Requerido";
        } else if (Number(min_amount) >= Number(max_amount)) {
            newErrors.min_amount = "El mínimo debe ser menor que el máximo";
        }

        if (!min_term || !max_term) {
            newErrors.min_term = "Requerido";
            newErrors.max_term = "Requerido";
        } else if (Number(min_term) >= Number(max_term)) {
            newErrors.min_term = "El plazo mínimo debe ser menor que el máximo";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validate()) {
            setLoading(true);
            try {
                await api.put(`/products/${productId}`, {
                    name: form.name,
                    rate: Number(form.rate),
                    color: form.color,
                    min_amount: Number(form.min_amount),
                    max_amount: Number(form.max_amount),
                    min_term: Number(form.min_term),
                    max_term: Number(form.max_term),
                })
                router.back()
                notifySuccess("Producto editado exitosamente")
            }catch (e) {
                notifyError("No se pudo editar el producto")
            }finally {
                setLoading(false)
            }

        }
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="relative overflow-hidden bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 space-y-4 p-6 rounded-xl shadow-md dark:shadow-lg transition-colors"
                >

                    <div
                        className="absolute -top-10 -left-10 w-40 h-40 rounded-full opacity-20 dark:opacity-10"
                        style={{ backgroundColor: form.color }}
                    />
                    <div
                        className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-20 dark:opacity-10"
                        style={{ backgroundColor: form.color }}
                    />

                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                label="Nombre del producto"
                                name="name"
                                placeholder="Ej: Crédito rápido"
                                value={form.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <Input
                                label="Tasa de interés anual (%)"
                                name="rate"
                                type="number"
                                placeholder="Ej: 12.5"
                                value={form.rate}
                                onChange={handleChange}
                                error={errors.rate}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                label="Monto mínimo"
                                name="min_amount"
                                type="number"
                                placeholder="Ej: 1000"
                                value={form.min_amount}
                                onChange={handleChange}
                                error={errors.min_amount}
                            />
                            <Input
                                label="Monto máximo"
                                name="max_amount"
                                type="number"
                                placeholder="Ej: 50000"
                                value={form.max_amount}
                                onChange={handleChange}
                                error={errors.max_amount}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                label="Plazo mínimo (meses)"
                                name="min_term"
                                type="number"
                                placeholder="Ej: 6"
                                value={form.min_term}
                                onChange={handleChange}
                                error={errors.min_term}
                            />
                            <Input
                                label="Plazo máximo (meses)"
                                name="max_term"
                                type="number"
                                placeholder="Ej: 60"
                                value={form.max_term}
                                onChange={handleChange}
                                error={errors.max_term}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="text-sm text-slate-600 dark:text-slate-300">Color del producto</label>

                            <div className="relative">
                                <div
                                    className="w-10 h-10 rounded-full ring-2 ring-slate-300 shadow cursor-pointer transition-all hover:ring-slate-500"
                                    style={{backgroundColor: form.color}}
                                ></div>

                                <input
                                    type="color"
                                    name="color"
                                    value={form.color}
                                    onChange={handleChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>

                        <Button type="submit">{loading ? (
                            <Loader />
                        ) : (
                            "Guardar"
                        )}</Button>
                    </>


                </form>   )}</>
    );
}
