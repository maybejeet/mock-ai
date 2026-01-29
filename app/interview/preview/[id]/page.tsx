"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from "@clerk/nextjs";
import {
  Clock,
  FileText,
  Video,
  Mic,
  CheckCircle2,
  AlertCircle,
  Upload,
  File,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface Interview {
  _id: string;
  title: string;
  company: string;
  description: string;
  role: string;
  difficulty: string;
  numQuestions: number; // Keeping for potential future use or if API still returns it
  duration: number;
  responseCount: number;
  rounds: string[];
}

export default function InterviewPreviewPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [loading, setLoading] = useState(true);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeUploading, setResumeUploading] = useState(false);

  // Permission states
  const [cameraActive, setCameraActive] = useState(false);
  const [micActive, setMicActive] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchInterview();
    }
  }, [params.id]);

  const fetchInterview = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/interview/${params.id}`);
      if (!response.ok) throw new Error("Failed to fetch interview");
      const data = await response.json();
      setInterview(data);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to load interview details");
    } finally {
      setLoading(false);
    }
  };

  const requestPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setCameraActive(true);
      setMicActive(true);
      setPermissionsGranted(true);

      // Cleanup stream immediately as we just checked permissions
      stream.getTracks().forEach((track) => track.stop());
      toast.success("Camera and microphone access granted");
    } catch (err) {
      console.error("Permission error:", err);
      toast.error("Please allow camera and microphone access to proceed");
      setPermissionsGranted(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf") {
        setResumeFile(file);
        try {
          setResumeUploading(true);
          const formData = new FormData();
          formData.append("resumeFile", file);
          const response = await fetch("/api/resume/parse", {
            method: "POST",
            body: formData,
          });
          if (!response.ok) {
            throw new Error("Failed to upload resume");
          }
          toast.success("Resume uploaded successfully");
        } catch (error) {
          console.error("Error uploading resume:", error);
          toast.error("Failed to upload resume");
        } finally {
          setResumeUploading(false);
        }
        toast.success("Resume uploaded successfully");
      } else {
        toast.error("Please upload a PDF file");
      }
    }
  };

  const handleStartInterview = async () => {
    if (!interview) return;
    const response = await fetch("/api/interview/session/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        interviewLink: window.location.href,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to create interview session");
    }
    // Here you would typically upload the resume first if needed
    // Then redirect to the actual interview session
    router.push(`/interview/take/${interview._id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-xl font-bold text-slate-900 mb-2">
          Interview Not Found
        </h1>
        <Link href="/dashboard">
          <Button>Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header Icon */}
        <div className="flex justify-center">
          <div className="bg-slate-900 p-4 rounded-xl shadow-lg">
            <Video className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">
            {interview.title}
          </h1>
          <p className="text-lg text-slate-600">
            {interview.company} • {interview.role}
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-slate-100/50 rounded-lg p-6 border border-slate-200">
          <p className="text-slate-700 mb-6">{interview.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2 text-sm text-slate-600 bg-white p-2 rounded border border-slate-200">
              {/*<Clock className="w-4 h-4" />*/}
              <span>Duration : </span>
              <span>~{interview.duration} min</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600 bg-white p-2 rounded border border-slate-200">
              <span>{"Type : "}</span>
              <span className="font-semibold px-2 border rounded text-xs border-slate-300">
                {interview.rounds.includes("HR") ? "Mixed" : "Tech"}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600 bg-white p-2 rounded border border-slate-200">
              <span>Difficulty : </span>
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium border
                                ${
                                  interview.difficulty === "Easy"
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : interview.difficulty === "Medium"
                                      ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                      : "bg-red-50 text-red-700 border-red-200"
                                }`}
              >
                {interview.difficulty}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Instructions */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Before you begin:
            </h2>
            <ul className="space-y-3">
              {[
                "Find a quiet place with good lighting",
                "Ensure your camera and microphone are working",
                "You'll have limited time per question",
                "You can re-record your answer before moving to the next question",
                "AI feedback will be provided after completion",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start space-x-3 text-slate-600"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Permissions Section */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Required Permissions:
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-lg border flex items-center space-x-4 transition-colors
                                ${cameraActive ? "bg-green-50 border-green-200" : "bg-white border-slate-200"}`}
              >
                <div
                  className={`p-2 rounded-full ${cameraActive ? "bg-green-100" : "bg-slate-100"}`}
                >
                  <Video
                    className={`w-5 h-5 ${cameraActive ? "text-green-600" : "text-slate-500"}`}
                  />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Camera</p>
                  <p className="text-xs text-slate-500">
                    {cameraActive ? "Access granted" : "Required"}
                  </p>
                </div>
                {cameraActive && (
                  <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto" />
                )}
              </div>

              <div
                className={`p-4 rounded-lg border flex items-center space-x-4 transition-colors
                                ${micActive ? "bg-green-50 border-green-200" : "bg-white border-slate-200"}`}
              >
                <div
                  className={`p-2 rounded-full ${micActive ? "bg-green-100" : "bg-slate-100"}`}
                >
                  <Mic
                    className={`w-5 h-5 ${micActive ? "text-green-600" : "text-slate-500"}`}
                  />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Microphone</p>
                  <p className="text-xs text-slate-500">
                    {micActive ? "Access granted" : "Required"}
                  </p>
                </div>
                {micActive && (
                  <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto" />
                )}
              </div>
            </div>
          </div>

          {/* Resume Upload Section */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Resume<span className="text-red-500">*</span>
            </h2>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 bg-white hover:bg-slate-50 transition-colors text-center">
              <input
                type="file"
                id="resume-upload"
                className="hidden"
                accept="application/pdf"
                onChange={handleResumeUpload}
              />
              <label
                htmlFor="resume-upload"
                className="cursor-pointer flex flex-col items-center justify-center"
              >
                {resumeUploading ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-2" />
                    <p className="font-medium text-slate-900">
                      Parsing Resume...
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Our AI is extracting your details
                    </p>
                  </div>
                ) : resumeFile ? (
                  <>
                    <File className="w-10 h-10 text-slate-700 mb-2" />
                    <p className="font-medium text-slate-900">
                      {resumeFile.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {(resumeFile.size / 1024 / 1024).toFixed(2)} MB • Click to
                      change
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-slate-400 mb-2" />
                    <p className="font-medium text-slate-900">
                      Upload your Resume (PDF)
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Click to browse files
                    </p>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Action Button */}
          <Button
            size="lg"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 text-lg"
            onClick={
              permissionsGranted ? handleStartInterview : requestPermissions
            }
            disabled={!resumeFile || resumeUploading}
          >
            {permissionsGranted ? (
              <>
                Start Interview
                <CheckCircle2 className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                Allow Camera & Microphone
                <Video className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>

          <p className="text-center text-xs text-slate-500 mt-4">
            By starting, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
