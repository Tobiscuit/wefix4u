import { cn } from "@/lib/utils";
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "glass-dark";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700",
      glass: "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-2xl rounded-2xl border border-white/20 dark:border-white/10",
      "glass-dark": "bg-black/60 backdrop-blur-sm text-white rounded-lg border border-white/10",
    };

    return (
      <div
        ref={ref}
        className={cn(variants[variant], className)}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";
