"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Building2, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import {format} from "date-fns";

interface TakenInterviewCardProps {
    id: string;
    title: string;
    company: string;
    role: string;
    createdAt: string;
    status: string;
    score?: number;
}

export function TakenInterviewCard({
    id,
    title,
    company,
    role,
    createdAt,
    status,
    score,
}: TakenInterviewCardProps) {
    const isCompleted = status === "Completed";

  return (

        <Card className="hover:shadow-md transition-shadow bg-white border-slate-200">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-semibold text-lg text-slate-900 line-clamp-1">
                            {title}
                        </h3>
                        <div className="flex items-center text-slate-500 text-sm mt-1">
                            <Building2 className="w-3 h-3 mr-1" />
                            {company}
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    {score !== undefined && isCompleted && (
                        <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-700">
                            Score: {score}%
                        </Badge>
                    )}
                    <Badge
                        variant="secondary"
                        className={
                            isCompleted
                                ? "bg-slate-900 text-white hover:bg-slate-800"
                                : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        }
                    >
                        {status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="pb-3">
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {role} Interview
                </p>
                <div className="flex items-center text-xs text-slate-400">
          <Calendar className="w-3 h-3 mr-1" />
          Taken on {new Date(createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
                </div>
            </CardContent>
            <CardFooter className="pt-0">
                <Link href={`/dashboard/interview/${id}/feedback`} className="w-full">
                    <Button
                        className="w-full bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200"
                        variant="outline"
                    >
                        {isCompleted ? "View Results" : "Continue Interview"}
                    </Button>
                </Link>
            </CardFooter>
    </Card >

  );
}
