"use client";
import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

type ButtonSize = "small" | "medium" | "large" | "fullWidth" | "custom";
/* NOTES: only fill variant available right now */
// type ButtonVariant = "fill" | "outline" | "ghost" | "custom";
type ButtonVariant = "fill" | "custom";
type ButtonColor =
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | "custom";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: ButtonVariant;
    size: ButtonSize;
    color: ButtonColor;
    loadingText?: string;
}

type ButtonClass = {
    size: Record<Exclude<ButtonSize, "custom">, string>;
    variant: Record<
        Exclude<ButtonVariant, "custom">,
        Record<
            Exclude<ButtonColor, "custom">,
            { default: string; disabled: string }
        >
    >;
};

const btnClass: ButtonClass = {
    size: {
        small: "text-xs h-8 px-4 w-fit rounded-lg font-semibold leading-normal",
        medium: "text-sm h-10 px-4 w-fit rounded-lg font-semibold leading-normal",
        large: "text-base h-14 px-4 w-fit rounded-lg font-semibold leading-normal",
        fullWidth:
            "text-base h-10 px-4 w-full rounded-lg font-semibold leading-normal",
    },
    variant: {
        fill: {
            primary: {
                default: "text-white-0 bg-blue-500",
                disabled: "text-white-0 bg-blue-200",
            },
            secondary: {
                default: "text-white-0 bg-neon-carrot-500",
                disabled: "text-white-0 bg-neon-carrot-200",
            },
            success: {
                default: "text-white-0 bg-green-500",
                disabled: "text-white-0 bg-green-200",
            },
            error: {
                default: "text-white-0 bg-red-500",
                disabled: "text-white-0 bg-red-200",
            },
            info: {
                default: "text-white-0 bg-blue-500",
                disabled: "text-white-0 bg-blue-200",
            },
            warning: {
                default: "text-white-0 bg-yellow-500",
                disabled: "text-white-0 bg-yellow-200",
            },
        },
    },
};

export default function Button({
    children,
    size,
    variant,
    color,
    className,
    disabled,
    onClick,
    type,
    loadingText = "Loading...",
}: ButtonProps) {
    const { pending } = useFormStatus();
    if (pending) {
        disabled = true;
    }

    let btnSizeClass: HTMLButtonElement["className"] = "";
    let btnVariantClass: ButtonHTMLAttributes<HTMLButtonElement>["className"] =
        "";

    if (size !== "custom") {
        btnSizeClass = btnClass.size[size];
    }

    if (variant !== "custom" && color !== "custom") {
        if (disabled) {
            btnVariantClass = btnClass.variant[variant][color].disabled;
        } else {
            btnVariantClass = btnClass.variant[variant][color].default;
        }
    }

    return (
        <button
            type={type}
            className={`${className} ${btnSizeClass} ${btnVariantClass} `}
            onClick={onClick}
            disabled={disabled || pending}
        >
            {pending ? loadingText : children}
        </button>
    );
}
