"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    ArrowLeft,
    Users,
    Clock,
    Calendar,
    Copy,
    Check,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface Interview {
    _id: string;
    title: string;
    company: string;
    description: string;
    role: string;
    difficulty: string;
    duration: number;
    responseCount: number;
    rounds: string[];
    videoRecording: boolean;
    aiFeedback: boolean;
    deadline?: string;
    createdAt: string;
    accessType: string;
}

export default function InterviewDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [interview, setInterview] = useState<Interview | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (id) {
            fetchInterview();
        }
    }, [id]);

    const fetchInterview = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/interview/${id}`);

            if (!response.ok) {
                throw new Error("Failed to fetch interview");
            }

            const data = await response.json();
            setInterview(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            console.error("Error fetching interview:", err);
        } finally {
            setLoading(false);
        }
    };

    const getInterviewLink = () => {
        return `${window.location.origin}/interview/preview/${id}`;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(getInterviewLink());
        setCopied(true);
        toast.success("Link copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    const getStatusBadge = () => {
        // Based on rounds and if there are responses
        if (interview?.responseCount && interview.responseCount > 0) {
            return { text: "Active", className: "bg-slate-900 text-white" };
        }
        return { text: "Draft", className: "bg-slate-500 text-white" };
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-slate-800 border-r-transparent"></div>
                    <p className="text-slate-600 mt-4">Loading interview details...</p>
                </div>
            </div>
        );
    }

    if (error || !interview) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error || "Interview not found"}</p>
                    <Link href="/dashboard">
                        <Button>Back to Dashboard</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const statusBadge = getStatusBadge();
    const interviewType = interview.rounds.includes("Technical")
        ? interview.rounds.includes("HR")
            ? "Mixed"
            : "Technical"
        : "Behavioral";

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-6 py-4">
                    <Link href="/dashboard">
                        <Button
                            variant="ghost"
                            className="text-slate-600 hover:text-slate-900 -ml-2"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Dashboard
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Interview Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Interview Header Card */}
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h1 className="text-2xl font-bold text-slate-900 mb-1">
                                        {interview.title}
                                    </h1>
                                    <p className="text-sm text-slate-600">{interview.company}</p>
                                </div>
                                <Badge className={`${statusBadge.className} rounded-full px-3`}>
                                    {statusBadge.text}
                                </Badge>
                            </div>

                            <p className="text-slate-700 mb-6">{interview.description}</p>

                            {/* Metadata */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Users className="w-4 h-4 text-slate-500" />
                                    <span className="text-slate-600">
                                        {interview.responseCount} responses
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Clock className="w-4 h-4 text-slate-500" />
                                    <span className="text-slate-600">
                                        ~{interview.duration} minutes
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="w-4 h-4 text-slate-500" />
                                    <span className="text-slate-600">
                                        Created {formatDate(interview.createdAt)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Responses Section */}
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <h2 className="text-lg font-semibold text-slate-900 mb-2">
                                Responses
                            </h2>
                            <p className="text-sm text-slate-600 mb-4">
                                View candidate responses and AI feedback
                            </p>

                            {interview.responseCount === 0 ? (
                                <div className="text-center py-12 text-slate-500">
                                    No responses yet
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {/* Placeholder for responses - will be implemented later */}
                                    <p className="text-sm text-slate-500">
                                        Response viewing feature coming soon
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Share & Settings */}
                    <div className="space-y-6">
                        {/* Share Interview Card */}
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <h3 className="font-semibold text-slate-900 mb-2">
                                Share Interview
                            </h3>
                            <p className="text-sm text-slate-600 mb-4">
                                Send this link to candidates
                            </p>

                            <div className="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    readOnly
                                    value={getInterviewLink()}
                                    className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-md bg-slate-50 text-slate-700"
                                />
                                <Button
                                    onClick={copyToClipboard}
                                    variant="outline"
                                    size="icon"
                                    className="shrink-0"
                                >
                                    {copied ? (
                                        <Check className="w-4 h-4 text-green-600" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </Button>
                            </div>

                            <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white">
                                Preview Interview
                            </Button>
                        </div>

                        {/* Settings Card */}
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <h3 className="font-semibold text-slate-900 mb-4">Settings</h3>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between py-2">
                                    <span className="text-sm text-slate-600">Type</span>
                                    <span className="text-sm font-medium text-slate-900">
                                        {interviewType}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between py-2">
                                    <span className="text-sm text-slate-600">Difficulty</span>
                                    <span className="text-sm font-medium text-slate-900">
                                        {interview.difficulty}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between py-2">
                                    <span className="text-sm text-slate-600">Video Recording</span>
                                    <span className="text-sm font-medium text-slate-900">
                                        {interview.videoRecording ? (
                                            <span className="flex items-center gap-1">
                                                <Check className="w-4 h-4 text-green-600" />
                                                Enabled
                                            </span>
                                        ) : (
                                            "Disabled"
                                        )}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between py-2">
                                    <span className="text-sm text-slate-600">AI Feedback</span>
                                    <span className="text-sm font-medium text-slate-900">
                                        {interview.aiFeedback ? (
                                            <span className="flex items-center gap-1">
                                                <Check className="w-4 h-4 text-green-600" />
                                                Enabled
                                            </span>
                                        ) : (
                                            "Disabled"
                                        )}
                                    </span>
                                </div>

                                {interview.deadline && (
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-sm text-slate-600">Deadline</span>
                                        <span className="text-sm font-medium text-slate-900">
                                            {formatDate(interview.deadline)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
