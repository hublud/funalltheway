import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  className = "",
  children,
  ...props
}) => {
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm",
    secondary: "bg-blue-50 text-blue-700 hover:bg-blue-100 active:bg-blue-200 border border-blue-200",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100",
    ghost: "text-slate-700 hover:bg-slate-100 active:bg-slate-200",
  }[variant];

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs font-medium",
    md: "px-5 py-2.5 text-sm font-semibold",
    lg: "px-6 py-3.5 text-base font-bold",
  }[size];

  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-md transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles} ${sizeStyles} ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {children}
    </button>
  );
};
