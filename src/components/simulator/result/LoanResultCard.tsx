// components/simulator/LoanResultCard.tsx
import { FiArrowLeft } from "react-icons/fi";

interface LoanResultCardProps {
    amount: number;
    term: number;
    rate: number;
    monthlyPayment: number;
    totalCost: number;
    onBack: () => void;
    color: string;
}

export function LoanResultCard({
    amount,
    term,
    rate,
    monthlyPayment,
    totalCost,
    onBack,
    color,
}: LoanResultCardProps) {
    const interest = totalCost - amount;
    const capitalRatio = (amount / totalCost) * 100;
    const interestRatio = 100 - capitalRatio;

    const years = Math.floor(term / 12);
    const months = term % 12;

    return (
        <div className="relative bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 space-y-6 shadow-lg dark:shadow-md transition-colors">
            <button
                onClick={onBack}
                className="absolute top-4 left-4 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
                <FiArrowLeft className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
                <h3 className="text-lg font-medium text-slate-700 dark:text-slate-100">
                    Resultado de tu préstamo
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    {years > 0 && `${years} año${years > 1 ? "s" : ""}`}
                    {years > 0 && months > 0 && " y "}
                    {months > 0 && `${months} mes${months > 1 ? "es" : ""}`}
                </p>
                <p className="text-4xl font-bold" style={{ color: color }}>
                    ${monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
            </div>

            <div className="text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">Pago total</p>
                <p className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
                    ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>

                <div className="mt-4 h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div
                        className="h-full float-left"
                        style={{
                            width: `${capitalRatio}%`,
                            backgroundColor: color,
                            borderTopLeftRadius: "9999px",
                            borderBottomLeftRadius: "9999px",
                        }}
                    />
                    <div
                        className="h-full float-left"
                        style={{
                            width: `${interestRatio}%`,
                            backgroundColor: "#fb923c",
                            borderTopRightRadius: "9999px",
                            borderBottomRightRadius: "9999px",
                        }}
                    />
                </div>

                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
                    <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: color }} />
                        Capital total
                    </div>
                    <div>${amount.toLocaleString()}</div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-orange-400 rounded-full inline-block" />
                        Interés total
                    </div>
                    <div>${interest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
            </div>
        </div>
    );
}
