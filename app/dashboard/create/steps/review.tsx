import { InterviewFormData } from "../page";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";

interface ReviewProps {
    formData: InterviewFormData;
    onBack: () => void;
    onCreate: () => void;
    isSubmitting?: boolean;
}

export default function Review({ formData, onBack, onCreate, isSubmitting }: ReviewProps) {
    const summaryItems = [
        { label: "Title", value: formData.title || "Not set" },
        { label: "Job Role", value: formData.jobRole || "Not set" },
        { label: "Company", value: formData.company || "Not set" },
        { label: "Type", value: formData.interviewType },
        { label: "Difficulty", value: formData.difficulty },
        { label: "Duration", value: `${formData.duration} min` },
        {
            label: "Access",
            value:
                formData.access === "self"
                    ? "Self Only"
                    : formData.access === "link"
                        ? "Anyone With Link"
                        : "Specific Emails",
        },
        {
            label: "Video Recording",
            value: formData.videoRecording ? "Enabled" : "Disabled",
        },
        { label: "AI Feedback", value: formData.aiFeedback ? "Enabled" : "Disabled" },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-slate-900">Review</h2>
                <p className="text-sm text-slate-600 mt-1">Confirm & create</p>
            </div>

            <div className="border border-slate-200 rounded-lg bg-white p-6">
                <h3 className="font-semibold text-slate-900 mb-4">
                    Interview Summary
                </h3>
                <div className="space-y-3">
                    {summaryItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
                        >
                            <span className="text-sm text-slate-600">{item.label}:</span>
                            <span className="text-sm font-medium text-slate-900 text-right">
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-between pt-4">
                <Button
                    onClick={onBack}
                    variant="outline"
                    className="border-slate-200"
                    disabled={isSubmitting}
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back
                </Button>
                <Button
                    onClick={onCreate}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-8"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Creating...
                        </>
                    ) : (
                        "Create Interview"
                    )}
                </Button>
            </div>
        </div>
    );
}
