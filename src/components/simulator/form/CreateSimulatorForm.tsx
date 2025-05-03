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
    const [amount, setAmount] = useState(product.minAmount);
    const [term, setTerm] = useState(product.minTerm);
    const [showResult, setShowResult] = useState(false);
    const [error, setError] = useState("");

    const handleSimulate = () => {
        if (amount < product.minAmount || amount > product.maxAmount) {
            setError("El monto ingresado está fuera del rango permitido.");
            return;
        }

        if (term < product.minTerm || term > product.maxTerm) {
            setError("El plazo ingresado está fuera del rango permitido.");
            return;
        }

        setError("");
        setShowResult(true);
    };

    const { monthlyPayment, totalCost } = calculateLoan({
        amount,
        term,
        rate: product.rate,
    });

    return (
<div className="relative bg-white dark:bg-slate-900 rounded-xl p-6 space-y-6 overflow-hidden transition-colors">
    <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 dark:opacity-10"
        style={{ backgroundColor: product.color }}
    />

    <div className="space-y-1">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{product.name}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">Tasa de interés: {product.rate}%</p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
            Monto permitido: ${product.minAmount.toLocaleString()} - ${product.maxAmount.toLocaleString()}
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
            Plazo permitido: {product.minTerm} - {product.maxTerm} meses
        </p>
    </div>

    {!showResult ? (
        <>
            <div className="relative bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 space-y-6 shadow-lg dark:shadow-md">
                <div>
                    <label className="block mb-1 text-sm font-medium text-slate-800 dark:text-slate-200">Monto</label>
                    <input
                        type="number"
                        min={product.minAmount}
                        max={product.maxAmount}
                        step={1000}
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-2 mt-2">
                        <div
                            className="h-2 rounded-full transition-all duration-300"
                            style={{
                                width: `${
                                    ((Math.min(amount, product.maxAmount) - product.minAmount) / (product.maxAmount - product.minAmount)) * 100
                                }%`,
                                backgroundColor:
                                    amount < product.minAmount || amount > product.maxAmount
                                        ? "#fb923c"
                                        : product.color,
                            }}
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-slate-800 dark:text-slate-200">Plazo (meses)</label>
                    <input
                        type="number"
                        min={product.minTerm}
                        max={product.maxTerm}
                        value={term}
                        onChange={(e) => setTerm(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-2 mt-2">
                        <div
                            className="h-2 rounded-full transition-all duration-300"
                            style={{
                                width: `${
                                    ((Math.min(term, product.maxTerm) - product.minTerm) / (product.maxTerm - product.minTerm)) * 100
                                }%`,
                                backgroundColor:
                                    term < product.minTerm || term > product.maxTerm
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
            amount={amount}
            term={term}
            rate={product.rate}
            monthlyPayment={monthlyPayment}
            totalCost={totalCost}
            onBack={() => setShowResult(false)}
            color={product.color}
        />
    )}
</div>

    );
}
