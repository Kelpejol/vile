import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  variant?: "default" | "outline";
}

export function Button({
  children,
  size = "md",
  fullWidth = false,
  variant = "default",
  className = "",
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  const variantClasses = {
    default: "bg-blue-500 hover:bg-blue-600 text-white",
    outline:
      "bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
  };

  return (
    <button
      className={`font-semibold rounded-lg transition-colors ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
