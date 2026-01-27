import { InterviewFormData } from "../page";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronLeft } from "lucide-react";

interface SettingsProps {
    formData: InterviewFormData;
    updateFormData: (data: Partial<InterviewFormData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function Settings({
    formData,
    updateFormData,
    onNext,
    onBack,
}: SettingsProps) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-slate-900">Settings</h2>
                <p className="text-sm text-slate-600 mt-1">Access & options</p>
            </div>

            <div className="space-y-6">
                {/* Access Control */}
                <div className="space-y-3">
                    <Label>Who can take this interview?</Label>
                    <RadioGroup
                        value={formData.access}
                        onValueChange={(value: "self" | "link" | "emails") =>
                            updateFormData({ access: value })
                        }
                        className="space-y-3"
                    >
                        <div
                            className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.access === "self"
                                    ? "border-slate-800 bg-slate-50"
                                    : "border-slate-200 bg-white hover:border-slate-300"
                                }`}
                            onClick={() => updateFormData({ access: "self" })}
                        >
                            <RadioGroupItem value="self" id="self" className="mt-0.5" />
                            <div className="flex-1">
                                <Label htmlFor="self" className="font-semibold cursor-pointer">
                                    Self only
                                </Label>
                                <p className="text-sm text-slate-600">
                                    Practice interview for yourself
                                </p>
                            </div>
                        </div>

                        <div
                            className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.access === "link"
                                    ? "border-slate-800 bg-slate-50"
                                    : "border-slate-200 bg-white hover:border-slate-300"
                                }`}
                            onClick={() => updateFormData({ access: "link" })}
                        >
                            <RadioGroupItem value="link" id="link" className="mt-0.5" />
                            <div className="flex-1">
                                <Label htmlFor="link" className="font-semibold cursor-pointer">
                                    Anyone with link
                                </Label>
                                <p className="text-sm text-slate-600">
                                    Share the link with candidates
                                </p>
                            </div>
                        </div>

                        <div
                            className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.access === "emails"
                                    ? "border-slate-800 bg-slate-50"
                                    : "border-slate-200 bg-white hover:border-slate-300"
                                }`}
                            onClick={() => updateFormData({ access: "emails" })}
                        >
                            <RadioGroupItem value="emails" id="emails" className="mt-0.5" />
                            <div className="flex-1">
                                <Label
                                    htmlFor="emails"
                                    className="font-semibold cursor-pointer"
                                >
                                    Specific emails
                                </Label>
                                <p className="text-sm text-slate-600">
                                    Restrict to specific email addresses
                                </p>
                            </div>
                        </div>
                    </RadioGroup>
                </div>

                {/* Video Recording */}
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-white">
                    <div>
                        <Label htmlFor="videoRecording" className="font-semibold">
                            Video Recording
                        </Label>
                        <p className="text-sm text-slate-600">
                            Record candidate video responses
                        </p>
                    </div>
                    <Switch
                        id="videoRecording"
                        checked={formData.videoRecording}
                        onCheckedChange={(checked) =>
                            updateFormData({ videoRecording: checked })
                        }
                    />
                </div>

                {/* AI Feedback */}
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-white">
                    <div>
                        <Label htmlFor="aiFeedback" className="font-semibold">
                            AI Feedback
                        </Label>
                        <p className="text-sm text-slate-600">
                            Provide AI-generated feedback on answers
                        </p>
                    </div>
                    <Switch
                        id="aiFeedback"
                        checked={formData.aiFeedback}
                        onCheckedChange={(checked) =>
                            updateFormData({ aiFeedback: checked })
                        }
                    />
                </div>

                {/* Deadline */}
                <div className="space-y-2">
                    <Label htmlFor="deadline">Deadline (Optional)</Label>
                    <Input
                        id="deadline"
                        type="date"
                        value={formData.deadline || ""}
                        onChange={(e) => updateFormData({ deadline: e.target.value })}
                        className="bg-white"
                        placeholder="dd/mm/yyyy"
                    />
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
