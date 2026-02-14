import { cn } from "@/lib/utils";
import React from "react";
import { Check, PenTool, Search, Package } from "lucide-react";

export type RepairStatus = "received" | "diagnosed" | "in-progress" | "ready" | "picked-up";

interface RepairStatusStepperProps {
  status: RepairStatus;
  className?: string;
}

const steps = [
  { id: "received", label: "Received", icon: Package },
  { id: "diagnosed", label: "Diagnosed", icon: Search },
  { id: "in-progress", label: "Fixing", icon: PenTool },
  { id: "ready", label: "Ready", icon: Check },
];

export const RepairStatusStepper: React.FC<RepairStatusStepperProps> = ({ status, className }) => {
  const currentStepIndex = steps.findIndex((step) => step.id === status);
  // Handle 'picked-up' as 'ready' + 1 for visual purposes
  const effectiveIndex = status === 'picked-up' ? steps.length : currentStepIndex === -1 ? 0 : currentStepIndex;

  return (
    <div className={cn("w-full py-6", className)}>
      <div className="relative flex items-center justify-between w-full h-20">
        {/* Progress Bar Background */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full -z-10" />

        {/* Progress Bar Fill */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-green-500 rounded-full -z-10 transition-all duration-500 ease-in-out"
          style={{ width: `${Math.min((effectiveIndex / (steps.length - 1)) * 100, 100)}%` }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < effectiveIndex;
          const isCurrent = index === effectiveIndex;
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative flex flex-col items-center justify-center w-10">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-300 z-10 bg-white dark:bg-gray-800",
                  isCompleted ? "border-green-500 text-green-500 scale-110" :
                  isCurrent ? "border-blue-500 text-blue-500 scale-125 shadow-lg shadow-blue-500/30" :
                  "border-gray-300 dark:border-gray-600 text-gray-300 dark:text-gray-600"
                )}
              >
                <Icon size={18} strokeWidth={isCurrent ? 3 : 2} />
              </div>
              <span
                className={cn(
                  "absolute top-12 text-xs md:text-sm font-medium transition-colors duration-300 whitespace-nowrap",
                  isCompleted ? "text-green-600 dark:text-green-400" :
                  isCurrent ? "text-blue-600 dark:text-blue-400 font-bold" :
                  "text-gray-400 dark:text-gray-500"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
