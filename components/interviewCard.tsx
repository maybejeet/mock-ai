import { MoreVertical, Share2, Users } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface InterviewCardProps {
  id: string;
  title: string;
  company: string;
  description: string;
  status: string | "Active" | "Draft" | "Completed";
  responses: number;
  role: string;
}

export function InterviewCard({ id, title, company, description, status, responses, role }: InterviewCardProps) {
  // Helper to define badge styles based on status
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Active": return "bg-slate-900 text-white hover:bg-slate-800";
      case "Draft": return "bg-slate-500 text-white hover:bg-slate-400";
      case "Completed": return "bg-white border-slate-200 text-slate-900 hover:bg-slate-50";
      default: return "";
    }
  };

  return (
    <Card className="w-full max-w-md shadow-sm border-slate-200">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold text-slate-900">{title}</CardTitle>
          <p className="text-sm text-slate-700 font-medium">{`Role: ${role}`}</p>
          <p className="text-sm text-slate-500">{company}</p>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="text-slate-600 line-clamp-2 min-h-[40px]">
          {description}
        </CardDescription>

        <div className="flex gap-2 items-center">
          <Badge className={`rounded-full px-3 py-0.5 font-medium ${getStatusStyles(status)}`}>
            {status}
          </Badge>
          <Badge variant="outline" className="rounded-full px-3 py-0.5 flex gap-1.5 items-center font-normal text-slate-600 bg-slate-50/50">
            <Users className="h-3 w-3" />
            {responses} responses
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-2">
        <Link href={`/dashboard/interview/${id}`} className="flex-1">
          <Button variant="outline" className="w-full bg-slate-50/50 border-slate-200 text-slate-700 hover:bg-slate-100">
            View Details
          </Button>
        </Link>
        <Button variant="outline" size="icon" className="shrink-0 border-slate-200 text-slate-500">
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}