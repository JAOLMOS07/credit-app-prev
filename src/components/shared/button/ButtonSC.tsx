"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

type ButtonProps = {
    children: ReactNode;
    variant?: "filled" | "gradient" | "outlined" | "text";
    icon?: ReactNode;
    iconPosition?: "left" | "right";
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    className?: string;
    onClick?: () => void;
    href?: string;
};

export default function Button({
                                   children,
                                   variant = "filled",
                                   icon,
                                   iconPosition = "left",
                                   type = "button",
                                   disabled = false,
                                   loading = false,
                                   fullWidth = false,
                                   className = "",
                                   onClick,
                                   href,
                               }: ButtonProps) {
    const router = useRouter();

    const baseStyles =
        "inline-flex items-center justify-center rounded-md py-2 px-4 text-sm transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50";

        const variants: Record<string, string> = {
            filled: `
              bg-indigo-400 text-white border border-transparent shadow-md
              hover:shadow-lg hover:bg-indigo-500 active:bg-indigo-600
              dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:active:bg-indigo-400
            `,
            gradient: `
              bg-gradient-to-tr from-indigo-400 to-indigo-300 text-white border border-transparent shadow-md
              hover:shadow-lg hover:from-indigo-500 hover:to-indigo-400
              dark:from-indigo-600 dark:to-indigo-500 dark:hover:from-indigo-500 dark:hover:to-indigo-400
            `,
            outlined: `
              border border-indigo-300 text-indigo-600 shadow-sm
              hover:shadow-lg hover:text-white hover:bg-indigo-400 hover:border-indigo-400
              dark:border-indigo-500 dark:text-indigo-300 dark:hover:bg-indigo-600 dark:hover:border-indigo-400 dark:hover:text-white
            `,
            text: `
              border border-transparent text-indigo-600 hover:bg-indigo-100
              dark:text-indigo-300 dark:hover:bg-indigo-800
            `,
          };

    const iconMargin =
        icon && iconPosition === "left"
            ? "mr-1.5"
            : icon && iconPosition === "right"
                ? "ml-1.5"
                : "";

    const widthClass = fullWidth ? "w-full" : "";

    const handleClick = () => {
        if (href) {
            router.push(href);
        } else if (onClick) {
            onClick();
        }
    };

    return (
        <button
            type={type}
            onClick={handleClick}
            disabled={disabled || loading}
            className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
        >
            {loading ? (
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
            ) : (
                <>
                    {icon && iconPosition === "left" && (
                        <span className={iconMargin}>{icon}</span>
                    )}
                    {children}
                    {icon && iconPosition === "right" && (
                        <span className={iconMargin}>{icon}</span>
                    )}
                </>
            )}
        </button>
    );
}
