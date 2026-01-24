"use client";
import React from 'react'
import { SignIn } from '@clerk/nextjs';
const page = () => {
  return (
    <SignIn/>
  )
}

export default page

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useSignIn } from "@clerk/nextjs";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";

// import AuthLayout from "@/components/auth/AuthLayout";
// import GoogleButton from "@/components/auth/GoogleButton";
// import Divider from "@/components/auth/Divider";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { signInSchema, type SignInFormData } from "@/schemas/authValidation"
// import { useToast } from "@/hooks/use-toast";
// import { Eye, EyeOff, Loader2 } from "lucide-react";

// const SignIn = () => {
//   const { signIn, isLoaded, setActive } = useSignIn();
//   const router = useRouter();
//   const { toast } = useToast();
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignInFormData>({
//     resolver: zodResolver(signInSchema),
//   });

//   const onSubmit = async (data: SignInFormData) => {
//     if (!isLoaded) return;

//     setIsLoading(true);
//     try {
//       const result = await signIn.create({
//         identifier: data.email,
//         password: data.password,
//       });

//       if (result.status === "complete") {
//         await setActive({ session: result.createdSessionId });
//         router.push("/dashboard");
//       }
//     } catch (error: any) {
//       console.error("Sign in error:", error);
//       toast({
//         title: "Sign in failed",
//         description: error.errors?.[0]?.message || "Invalid email or password.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const inputVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: (i: number) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.1, duration: 0.3 },
//     }),
//   };

//   return (
//     <AuthLayout
//       title="Welcome"
//       subtitle="Sign in to continue your interview sessions"
//     >
//       <GoogleButton mode="sign-in" /> 
//       <Divider />

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//         <motion.div
//           custom={0}
//           initial="hidden"
//           animate="visible"
//           variants={inputVariants}
//           className="space-y-2"
//         >
//           <Label htmlFor="email" className="text-sm font-medium">
//             Email
//           </Label>
//           <Input
//             id="email"
//             type="email"
//             placeholder="john@university.edu"
//             {...register("email")}
//             className="h-12 bg-secondary/50 border-border focus:border-primary transition-colors"
//           />
//           {errors.email && (
//             <p className="text-sm text-destructive">
//               {errors.email.message}
//             </p>
//           )}
//         </motion.div>

//         <motion.div
//           custom={1}
//           initial="hidden"
//           animate="visible"
//           variants={inputVariants}
//           className="space-y-2"
//         >
//           <div className="flex items-center justify-between">
//             <Label htmlFor="password" className="text-sm font-medium">
//               Password
//             </Label>
//             <Link
//               href="/forgot-password"
//               className="text-sm text-muted-foreground hover:text-foreground transition-colors"
//             >
//               Forgot password?
//             </Link>
//           </div>
//           <div className="relative">
//             <Input
//               id="password"
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//               {...register("password")}
//               className="h-12 bg-secondary/50 border-border focus:border-primary transition-colors pr-12"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//             >
//               {showPassword ? (
//                 <EyeOff className="w-5 h-5" />
//               ) : (
//                 <Eye className="w-5 h-5" />
//               )}
//             </button>
//           </div>
//           {errors.password && (
//             <p className="text-sm text-destructive">
//               {errors.password.message}
//             </p>
//           )}
//         </motion.div>

//         <motion.div
//           custom={2}
//           initial="hidden"
//           animate="visible"
//           variants={inputVariants}
//         >
//           <Button
//             type="submit"
//             className="w-full h-12 text-base font-medium mt-2"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <>
//                 <Loader2 className="w-5 h-5 mr-2 animate-spin" />
//                 Signing in...
//               </>
//             ) : (
//               "Sign in"
//             )}
//           </Button>
//         </motion.div>
//       </form>

//       <p className="mt-6 text-center text-sm text-muted-foreground">
//         Don&apos;t have an account?{" "}
//         <Link
//           href="/sign-up"
//           className="font-medium text-foreground hover:underline transition-all"
//         >
//           Sign up
//         </Link>
//       </p>
//     </AuthLayout>
//   );
// };

// export default SignIn;
