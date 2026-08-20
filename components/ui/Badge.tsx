import React from "react";
import Link from "next/link";

interface BadgeProps {
  label: string;
  href?: string;
  variant?: "primary" | "secondary" | "accent" | "outline" | "danger";
  size?: "sm" | "md";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  href,
  variant = "primary",
  size = "sm",
  className = "",
}) => {
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100",
    accent: "bg-amber-500 text-white hover:bg-amber-600",
    outline: "border border-slate-300 text-slate-700 hover:bg-slate-50",
    danger: "bg-rose-600 text-white hover:bg-rose-700",
  }[variant];

  const sizeStyles = {
    sm: "text-xs px-2.5 py-0.5 font-semibold uppercase tracking-wider",
    md: "text-sm px-3 py-1 font-semibold",
  }[size];

  const baseClasses = `inline-flex items-center justify-center rounded-sm transition-colors duration-200 ${variantStyles} ${sizeStyles} ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {label}
      </Link>
    );
  }

  return <span className={baseClasses}>{label}</span>;
};
