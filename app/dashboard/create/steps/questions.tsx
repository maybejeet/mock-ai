import { InterviewFormData } from "../page";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ChevronLeft } from "lucide-react";

interface QuestionsProps {
    formData: InterviewFormData;
    updateFormData: (data: Partial<InterviewFormData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function Questions({
    formData,
    updateFormData,
    onNext,
    onBack,
}: QuestionsProps) {
    const interviewTypes = ["Technical", "Behavioral", "Mixed"] as const;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-slate-900">Questions</h2>
                <p className="text-sm text-slate-600 mt-1">Configure questions</p>
            </div>

            <div className="space-y-6">
                {/* Interview Type */}
                <div className="space-y-3">
                    <Label>Interview Type</Label>
                    <div className="grid grid-cols-3 gap-4">
                        {interviewTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => updateFormData({ interviewType: type })}
                                className={`p-4 rounded-lg border-2 transition-all text-center font-medium ${formData.interviewType === type
                                    ? "border-slate-800 bg-slate-50"
                                    : "border-slate-200 bg-white hover:border-slate-300"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Difficulty */}
                <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select
                        value={formData.difficulty}
                        onValueChange={(value: "Easy" | "Medium" | "Hard") =>
                            updateFormData({ difficulty: value })
                        }
                    >
                        <SelectTrigger id="difficulty" className="bg-white">
                            <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Easy">Easy</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Duration */}
                <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Select
                        value={formData.duration.toString()}
                        onValueChange={(value) =>
                            updateFormData({ duration: parseInt(value) })
                        }
                    >
                        <SelectTrigger id="duration" className="bg-white">
                            <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="45">45 minutes</SelectItem>
                            <SelectItem value="60">60 minutes</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex justify-between pt-4">
                <Button
                    onClick={onBack}
                    variant="outline"
                    className="border-slate-200"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back
                </Button>
                <Button
                    onClick={onNext}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-8"
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
