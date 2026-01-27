"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Users, BarChart3 } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

const Index = () => {
  const {user} = useUser();
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
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
          {user ? (
            <UserButton/>
          ): (
          <div className="flex items-end gap-4">
            <Link href="/sign-in">
              <Button variant="ghost" className="font-medium">
                Sign in
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="font-medium">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          )}
          
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-medium text-muted-foreground mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Mock Interviews
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6"
          >
            Practice Interviews.
            <br />
            <span className="text-muted-foreground">
              Land Your Dream Job.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Get personalized mock interviews with real-time AI feedback.
            Perfect for students and professionals preparing for their next
            big opportunity.
          </motion.p>
          
          {user ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="h-14 px-8 text-base font-medium w-full sm:w-auto"
                >
                  See Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/dashboard/create">
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 text-base font-medium"
              >
                Create Interview
                </Button>
              </Link>
            </motion.div>
          ): (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/sign-up">
              <Button
                size="lg"
                className="h-14 px-8 text-base font-medium w-full sm:w-auto"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 text-base font-medium"
            >
              Watch Demo
            </Button>
          </motion.div>
          )}
          
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-display font-bold mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-muted-foreground">
              Comprehensive tools designed to help you ace any interview
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: "AI Interviewer",
                description:
                  "Practice with an intelligent AI that adapts to your responses and skill level.",
              },
              {
                icon: BarChart3,
                title: "Detailed Feedback",
                description:
                  "Get instant analysis on your answers, body language, and communication skills.",
              },
              {
                icon: Users,
                title: "Industry-Specific",
                description:
                  "Tailored questions for tech, finance, healthcare, and more industries.",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-background border border-border hover:shadow-elegant transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl gradient-dark flex items-center justify-center mb-5">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-12 rounded-3xl gradient-dark text-primary-foreground"
          >
            <h2 className="text-3xl font-display font-bold mb-4">
              Ready to ace your next interview?
            </h2>
            <p className="text-primary-foreground/70 mb-8">
              Join thousands of students and professionals who&apos;ve
              improved their interview skills.
            </p>
            <Link href="/sign-up">
              <Button
                size="lg"
                className="h-14 px-8 text-base font-medium bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                Get Started for Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-dark flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold">
              InterviewAI
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 InterviewAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
