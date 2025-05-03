"use client";

import {useEffect, useState} from "react";
import Input from "@/components/shared/Input/InputSC";
import Button from "@/components/shared/button/ButtonSC";
import {useParams} from "next/navigation";
import api from "@/lib/api";
import {Product} from "@/models/Product";
import {notifySuccess} from "@/utils/notify";

export function EditProductForm() {
    const [form, setForm] = useState<Product>({
        id: "",
        name: "",
        rate: 0,
        minAmount: 0,
        maxAmount: 1,
        minTerm: 0,
        maxTerm: 1,
        color: "#3b82f6",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const { productId } = useParams();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };
    useEffect(() => {
        const fetchProduct = async () => {
            //const response = await api.get(`/products/${productId}`);
            //const product = response.data;

            const product ={
                    id: "4",
                    name: "Crédito empresarial",
                    rate: 14.75,
                    color: "#F59E0B",
                    minAmount: 10000,
                    maxAmount: 500000,
                    minTerm: 6,
                    maxTerm: 120,
                }
            setForm(product);
        };

        fetchProduct();
    }, [productId]);
    const validate = () => {
        const newErrors: Record<string, string> = {};
        const {
            name,
            rate,
            minAmount,
            maxAmount,
            minTerm,
            maxTerm,
        } = form;

        if (!name) newErrors.name = "El nombre es obligatorio";
        if (!rate || Number(rate) <= 0) newErrors.rate = "Tasa inválida";
        if (!minAmount || !maxAmount) {
            newErrors.minAmount = "Requerido";
            newErrors.maxAmount = "Requerido";
        } else if (Number(minAmount) >= Number(maxAmount)) {
            newErrors.minAmount = "El mínimo debe ser menor que el máximo";
        }

        if (!minTerm || !maxTerm) {
            newErrors.minTerm = "Requerido";
            newErrors.maxTerm = "Requerido";
        } else if (Number(minTerm) >= Number(maxTerm)) {
            newErrors.minTerm = "El plazo mínimo debe ser menor que el máximo";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            notifySuccess("Producto editado exitosamente")
        }
    };

    return (
        <form
        onSubmit={handleSubmit}
        className="relative overflow-hidden bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 space-y-4 p-6 rounded-xl shadow-md dark:shadow-lg transition-colors"
        >
        {/* Círculos decorativos */}
        <div
            className="absolute -top-10 -left-10 w-40 h-40 rounded-full opacity-20 dark:opacity-10"
            style={{ backgroundColor: form.color }}
        />
        <div
            className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-20 dark:opacity-10"
            style={{ backgroundColor: form.color }}
        />

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
                    name="minAmount"
                    type="number"
                    placeholder="Ej: 1000"
                    value={form.minAmount}
                    onChange={handleChange}
                    error={errors.minAmount}
                />
                <Input
                    label="Monto máximo"
                    name="maxAmount"
                    type="number"
                    placeholder="Ej: 50000"
                    value={form.maxAmount}
                    onChange={handleChange}
                    error={errors.maxAmount}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                    label="Plazo mínimo (meses)"
                    name="minTerm"
                    type="number"
                    placeholder="Ej: 6"
                    value={form.minTerm}
                    onChange={handleChange}
                    error={errors.minTerm}
                />
                <Input
                    label="Plazo máximo (meses)"
                    name="maxTerm"
                    type="number"
                    placeholder="Ej: 60"
                    value={form.maxTerm}
                    onChange={handleChange}
                    error={errors.maxTerm}
                />
            </div>

            <div className="flex items-center gap-4">
                <label className="text-sm text-slate-700">Color del producto</label>

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

            <Button type="submit">Guardar producto</Button>
        </form>
    );
}
