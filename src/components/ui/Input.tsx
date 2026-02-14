import { cn } from "@/lib/utils";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "ghost";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200",
      ghost: "w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-none focus:ring-2 focus:ring-primary outline-none transition-all duration-200",
    };

    return (
      <input
        ref={ref}
        className={cn(variants[variant], className)}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
