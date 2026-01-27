"use client";

import { InterviewCard } from '@/components/interviewCard'
import { TakenInterviewCard } from '@/components/takenInterviewCard'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserButton } from '@clerk/nextjs'
import { Plus, Sparkles } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface Interview {
  _id: string;
  title: string;
  company: string;
  description: string;
  difficulty: string;
  responseCount: number;
  role: string;
  rounds: string[];
}

interface TakenInterview {
  _id: string;
  templateId: {
    title: string;
    company: string;
    role: string;
  };
  createdAt: string;
  status: string;
  score?: number;
}

const Page = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [takenInterviews, setTakenInterviews] = useState<TakenInterview[]>([]);
  const [loading, setLoading] = useState(true);
  const [takenLoading, setTakenLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/interview');

      if (!response.ok) {
        throw new Error('Failed to fetch interviews');
      }

      const data = await response.json();
      setInterviews(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching interviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTakenInterviews = async () => {
    try {
      setTakenLoading(true);
      const response = await fetch('/api/interview/taken');

      if (!response.ok) {
        throw new Error('Failed to fetch taken interviews');
      }

      const data = await response.json();
      setTakenInterviews(data);
    } catch (err) {
      console.error('Error fetching taken interviews:', err);
    } finally {
      setTakenLoading(false);
    }
  };

  const getStatusFromRounds = (rounds: string[]) => {
    return "Active";
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl gradient-dark flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-display font-semibold">
                InterviewAI
              </span>
            </div>
            <div className="flex items-center gap-4">
              <UserButton />
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="pt-16">
          <div className="container mx-auto px-6 py-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-600 mt-1">Manage your interviews and track responses</p>
              </div>
              <Link href="/dashboard/create">
                <Button className="bg-slate-800 hover:bg-slate-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Interview
                </Button>
              </Link>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                {error}
              </div>
            )}

            {/* Tabs */}
            <Tabs defaultValue="my-interviews" className="w-full" onValueChange={(value) => {
              if (value === "interviews-taken" && takenInterviews.length === 0) {
                fetchTakenInterviews();
              }
            }}>
              <TabsList className="mb-6 bg-slate-200">
                <TabsTrigger value="my-interviews">My Interviews</TabsTrigger>
                <TabsTrigger value="interviews-taken">Interviews I've Taken</TabsTrigger>
              </TabsList>

              <TabsContent value="my-interviews">
                {loading ? (
                  <div className="text-center py-16">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-slate-800 border-r-transparent"></div>
                    <p className="text-slate-600 mt-4">Loading interviews...</p>
                  </div>
                ) : interviews.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-slate-500 mb-4">No interviews created yet</p>
                    <Link href="/dashboard/create">
                      <Button className="bg-slate-800 hover:bg-slate-700 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Your First Interview
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {interviews.map((interview) => (
                      <InterviewCard
                        key={interview._id}
                        id={interview._id}
                        title={interview.title}
                        company={interview.company}
                        description={interview.description}
                        status={getStatusFromRounds(interview.rounds)}
                        responses={interview.responseCount}
                        role={interview.role}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="interviews-taken">
                {takenLoading ? (
                  <div className="text-center py-16">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-slate-800 border-r-transparent"></div>
                    <p className="text-slate-600 mt-4">Loading your interviews...</p>
                  </div>
                ) : takenInterviews.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-slate-500">No interviews taken yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {takenInterviews.map((session) => (
                      <TakenInterviewCard
                        key={session._id}
                        id={session._id}
                        title={session.templateId?.title || "Untitled Interview"}
                        company={session.templateId?.company || "Unknown Company"}
                        role={session.templateId?.role || "Unknown Role"}
                        createdAt={session.createdAt}
                        status={session.status}
                        score={session.score}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page