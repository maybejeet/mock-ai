import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
    number: number;
    title: string;
    description: string;
}

interface StepIndicatorProps {
    steps: Step[];
    currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                    const isCompleted = currentStep > step.number;
                    const isCurrent = currentStep === step.number;
                    const isUpcoming = currentStep < step.number;

                    return (
                        <div key={step.number} className="flex items-center flex-1">
                            {/* Step circle and content */}
                            <div className="flex flex-col items-center">
                                {/* Circle with number or checkmark */}
                                <div
                                    className={cn(
                                        "w-16 h-16 rounded-lg flex items-center justify-center font-semibold text-lg transition-all",
                                        isCompleted && "bg-slate-800 text-white",
                                        isCurrent && "bg-slate-800 text-white",
                                        isUpcoming && "bg-slate-200 text-slate-500"
                                    )}
                                >
                                    {isCompleted ? (
                                        <Check className="w-6 h-6" />
                                    ) : (
                                        step.number
                                    )}
                                </div>

                                {/* Step title and description */}
                                <div className="mt-3 text-center">
                                    <div
                                        className={cn(
                                            "text-sm font-semibold",
                                            (isCompleted || isCurrent) && "text-slate-900",
                                            isUpcoming && "text-slate-500"
                                        )}
                                    >
                                        {step.title}
                                    </div>
                                    <div className="text-xs text-slate-500 mt-0.5">
                                        {step.description}
                                    </div>
                                </div>
                            </div>

                            {/* Connecting line */}
                            {index < steps.length - 1 && (
                                <div className="flex-1 h-0.5 mx-4 mb-12">
                                    <div
                                        className={cn(
                                            "h-full transition-all",
                                            currentStep > step.number
                                                ? "bg-slate-800"
                                                : "bg-slate-200"
                                        )}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
