import { ReactNode } from "react";

type InputProps = {
    label?: string;
    name?: string;
    type?: string;
    placeholder?: string;
    value?: string|number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: ReactNode;
    iconPosition?: "left" | "right";
    error?: string;
    min?: number;
    max?: number;
    step?: number;
    className?: string;
};
export default function Input({
    label,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    icon,
    min,
    max,
    step,
    iconPosition = "right",
    error,
    className = "",
  }: InputProps) {
    const baseInputStyles =
      "w-full bg-white dark:bg-slate-800 text-sm rounded-md px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow";
  
    const placeholderColor = "placeholder:text-slate-400 dark:placeholder:text-slate-500";
    const textColor = "text-slate-700 dark:text-slate-100";
  
    const borderStyles = error
      ? "border border-red-300 focus:border-red-500 hover:border-red-400 dark:border-red-500 dark:focus:border-red-400"
      : "border border-slate-300 focus:border-blue-500 hover:border-blue-400 dark:border-slate-600 dark:focus:border-blue-400";
  
    const iconPadding =
      icon && iconPosition === "left"
        ? "pl-10"
        : icon && iconPosition === "right"
        ? "pr-10"
        : "";
  
    return (
      <div className="w-full max-w-sm min-w-[200px]">
        {label && (
          <label className="block mb-2 text-sm text-slate-600 dark:text-slate-300">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === "left" && (
            <div className="absolute left-3 top-2.5 text-slate-500 dark:text-slate-400">
              {icon}
            </div>
          )}
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={onChange}
            className={`${baseInputStyles} ${placeholderColor} ${textColor} ${borderStyles} ${iconPadding} ${className}`}
          />
          {icon && iconPosition === "right" && (
            <div className="absolute right-3 top-2.5 text-slate-500 dark:text-slate-400">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-2 text-xs text-red-600 dark:text-red-400 flex items-start gap-1">
            {error}
          </p>
        )}
      </div>
    );
  }
  