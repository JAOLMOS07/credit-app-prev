'use client'

import { useState } from "react";
import Button from "@/components/shared/button/ButtonSC";
import { Product } from "@/models/Product";
import { calculateLoan } from "@/utils/loanUtils";
import { FiAlertCircle, FiArrowLeft } from "react-icons/fi";
import {LoanResultCard} from "@/components/simulator/result/LoanResultCard";

type SimulatorProps = {
    product: Product;
};

export function Simulator({ product }: SimulatorProps) {
    const [showResult, setShowResult] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        amount: product.min_amount,
        term: product.min_term,

    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    const handleSimulate = () => {
        if (form.amount < product.min_amount || form.amount > product.max_amount) {
            setError("El monto ingresado está fuera del rango permitido.");
            return;
        }

        if (form.term < product.min_term || form.term > product.max_term) {
            setError("El plazo ingresado está fuera del rango permitido.");
            return;
        }

        setError("");
        setShowResult(true);
    };

    const { monthlyPayment, totalCost } = calculateLoan({
        amount:form.amount,
        term:form.term,
        rate: product.rate,
    });

    return (
        <div className="relative bg-white dark:bg-slate-900 rounded-xl p-3 md:p-6 space-y-6 overflow-hidden transition-colors">
            <div
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 dark:opacity-10"
                style={{backgroundColor: product.color}}
            />
            <div
                className="absolute -bottom-10 -left-8 w-32 h-32 rounded-full opacity-20 dark:opacity-10"
                style={{backgroundColor: product.color}}
            />

            <div className="space-y-1">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{product.name}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">Tasa de interés: {product.rate}%</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Monto permitido: ${product.min_amount.toLocaleString()} - ${product.max_amount.toLocaleString()}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Plazo permitido: {product.min_term} - {product.max_term} meses
                </p>
            </div>
            <div className="w-full max-w-2xl mx-auto">
                {!showResult ? (
                    <>
                        <div
                            className="relative bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 space-y-6 shadow-lg dark:shadow-md">
                            <div>
                                <label
                                    className="block mb-1 text-sm font-medium text-slate-800 dark:text-slate-200">Monto</label>
                                <input
                                    type="number"
                                    min={product.min_amount}
                                    max={product.max_amount}
                                    step={1000}
                                    value={form.amount}
                                    name={'amount'}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-2 mt-2">
                                    <div
                                        className="h-2 rounded-full transition-all duration-300"
                                        style={{
                                            width: `${
                                                ((Math.min(form.amount, product.max_amount) - product.min_amount) / (product.max_amount - product.min_amount)) * 100
                                            }%`,
                                            backgroundColor:
                                                form.amount < product.min_amount ||form.amount > product.max_amount
                                                    ? "#fb923c"
                                                    : product.color,
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium text-slate-800 dark:text-slate-200">Plazo
                                    (meses)</label>
                                <input
                                    type="number"
                                    min={product.min_term}
                                    max={product.max_term}
                                    value={form.term}
                                    name={'term'}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-2 mt-2">
                                    <div
                                        className="h-2 rounded-full transition-all duration-300"
                                        style={{
                                            width: `${
                                                ((Math.min(form.term, product.max_term) - product.min_term) / (product.max_term - product.min_term)) * 100
                                            }%`,
                                            backgroundColor:
                                                form.term < product.min_term || form.term > product.max_term
                                                    ? "#fb923c"
                                                    : product.color,
                                        }}
                                    />
                                </div>
                            </div>

                            <Button variant="outlined" onClick={handleSimulate} fullWidth>
                                Simular
                            </Button>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-red-600 text-sm mt-2 dark:text-red-400">
                                <FiAlertCircle className="w-4 h-4"/>
                                {error}
                            </div>
                        )}
                    </>
                ) : (
                    <LoanResultCard
                        amount={form.amount}
                        term={form.term}
                        rate={product.rate}
                        monthlyPayment={monthlyPayment}
                        totalCost={totalCost}
                        onBack={() => setShowResult(false)}
                        color={product.color}
                    />
                )}
            </div>
        </div>
    );
}
