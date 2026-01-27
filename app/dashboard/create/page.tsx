"use client";

import { useState } from "react";
import { StepIndicator, Step } from "@/components/ui/step-indicator";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import BasicInfo from "./steps/basic-info";
import Questions from "./steps/questions";
import Settings from "./steps/settings";
import Review from "./steps/review";

const steps: Step[] = [
    { number: 1, title: "Basic Info", description: "Interview details" },
    { number: 2, title: "Questions", description: "Configure questions" },
    { number: 3, title: "Settings", description: "Access & options" },
    { number: 4, title: "Review", description: "Confirm & create" },
];

export interface InterviewFormData {
    // Basic Info
    title: string;
    jobRole: string;
    company: string;
    description: string;

    // Questions
    interviewType: "Technical" | "Behavioral" | "Mixed";
    difficulty: "Easy" | "Medium" | "Hard";
    duration: number;

    // Settings
    access: "self" | "link" | "emails";
    specificEmails?: string;
    videoRecording: boolean;
    aiFeedback: boolean;
    deadline?: string;
}

export default function CreateInterviewPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<InterviewFormData>({
        title: "",
        jobRole: "",
        company: "",
        description: "",
        interviewType: "Mixed",
        difficulty: "Medium",
        duration: 15,
        access: "link",
        videoRecording: true,
        aiFeedback: true,
    });

    const updateFormData = (data: Partial<InterviewFormData>) => {
        setFormData((prev) => ({ ...prev, ...data }));
    };

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleCreateInterview = async () => {
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/interview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to create interview');
            }

            const createdInterview = await response.json();
            toast.success('Interview created successfully!');

            // Redirect to dashboard after a short delay
            setTimeout(() => {
                router.push('/dashboard');
            }, 1000);
        } catch (error) {
            console.error('Error creating interview:', error);
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Failed to create interview. Please try again.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Link href="/dashboard">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ChevronLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                Create Interview
                            </h1>
                            <p className="text-sm text-slate-600 mt-0.5">
                                Set up your AI-powered mock interview
                            </p>
                        </div>
                    </div>

                    {/* Step Indicator */}
                    <StepIndicator steps={steps} currentStep={currentStep} />
                </div>
            </div>

            {/* Step Content */}
            <div className="container mx-auto px-6 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
                        {currentStep === 1 && (
                            <BasicInfo
                                formData={formData}
                                updateFormData={updateFormData}
                                onNext={handleNext}
                            />
                        )}
                        {currentStep === 2 && (
                            <Questions
                                formData={formData}
                                updateFormData={updateFormData}
                                onNext={handleNext}
                                onBack={handleBack}
                            />
                        )}
                        {currentStep === 3 && (
                            <Settings
                                formData={formData}
                                updateFormData={updateFormData}
                                onNext={handleNext}
                                onBack={handleBack}
                            />
                        )}
                        {currentStep === 4 && (
                            <Review
                                formData={formData}
                                onBack={handleBack}
                                onCreate={handleCreateInterview}
                                isSubmitting={isSubmitting}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
