import { InterviewFormData } from "../page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BasicInfoProps {
    formData: InterviewFormData;
    updateFormData: (data: Partial<InterviewFormData>) => void;
    onNext: () => void;
}

export default function BasicInfo({
    formData,
    updateFormData,
    onNext,
}: BasicInfoProps) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-slate-900">Basic Info</h2>
                <p className="text-sm text-slate-600 mt-1">Interview details</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Interview Title</Label>
                    <Input
                        id="title"
                        placeholder="e.g., Frontend Developer Interview"
                        value={formData.title}
                        onChange={(e) => updateFormData({ title: e.target.value })}
                        className="bg-white"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="jobRole">Job Role</Label>
                    <Input
                        id="jobRole"
                        placeholder="e.g., Senior Frontend Developer"
                        value={formData.jobRole}
                        onChange={(e) => updateFormData({ jobRole: e.target.value })}
                        className="bg-white"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                        id="company"
                        placeholder="e.g., TechCorp Inc."
                        value={formData.company}
                        onChange={(e) => updateFormData({ company: e.target.value })}
                        className="bg-white"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Describe what this interview will assess..."
                        value={formData.description}
                        onChange={(e) => updateFormData({ description: e.target.value })}
                        className="bg-white min-h-[100px]"
                    />
                </div>
            </div>

            <div className="flex justify-end pt-4">
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
