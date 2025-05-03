import { ReactNode } from "react";
import { FiArrowLeft } from "react-icons/fi";

type LayoutBaseProps = {
    title: string;
    children: ReactNode;
    actionButton?: ReactNode;
    showBackButton?: () => void;
};

export default function LayoutBase({ title, children, actionButton, showBackButton }: LayoutBaseProps) {
    return (
        <section className="min-h-screen bg-slate-50 dark:bg-slate-900 text-indigo-800 dark:text-indigo-100 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    {showBackButton && (
                        <button
                            onClick={showBackButton}
                            className="p-2 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-700 transition"
                            aria-label="Volver"
                        >
                            <FiArrowLeft className="w-5 h-5" />
                        </button>
                    )}
                    <h1 className="text-2xl font-semibold">{title}</h1>
                    {actionButton && <div>{actionButton}</div>}
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 transition-colors">
                    {children}
                </div>
            </div>
        </section>
    );
}
