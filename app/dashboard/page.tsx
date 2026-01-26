import { InterviewCard } from '@/components/interviewCard'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import React from 'react'

const page = () => {
  const interviews = [
    {
      title: "Frontend Developer Interview",
      company: "TechCorp Inc.",
      description: "Technical interview for React/TypeScript positions focusing on component design and state management.",
      status: "Active",
      responses: 12,
      role: "swe"
    },
    {
      title: "Data Analyst Technical Round",
      company: "DataDriven Co.",
      description: "SQL, Python, and data visualization assessment.",
      status: "Completed",
      responses: 15,
      role: "data"
    }
  ];
  return (
    <>
      <div>
        {/*Navbar*/}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-dark flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-display font-semibold">
              InterviewAI
            </span>
          </div>
          <div className="flex items-end gap-4">
            <UserButton/>
          </div>
          </div>
      </nav>
      
        <div className='h-20 bg-slate-600'></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
              {interviews.map((item, index) => (
                <InterviewCard key={index} {...item} />
              ))}
            </div>

        
        
    </div>
    </>
  )
}

export default page