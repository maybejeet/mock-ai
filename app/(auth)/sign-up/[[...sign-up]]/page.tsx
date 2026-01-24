"use client";
"use client";
import React from 'react'
import { SignUp } from '@clerk/nextjs';
const page = () => {
  return (
    <SignUp/>
  )
}

export default page

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useSignUp } from "@clerk/nextjs";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";

// import AuthLayout from "@/components/auth/AuthLayout";
// import GoogleButton from "@/components/auth/GoogleButton";
// import Divider from "@/components/auth/Divider";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { signUpSchema, type SignUpFormData } from "@/schemas/authValidation";
// import { useToast } from "@/hooks/use-toast";
// import { Eye, EyeOff, Loader2 } from "lucide-react";

// const SignUp = () => {
//   const { signUp, isLoaded } = useSignUp();
//   const router = useRouter();
//   const { toast } = useToast();
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm<SignUpFormData>({
//     resolver: zodResolver(signUpSchema),
//   });

//   const selectedRole = watch("role");

//   const onSubmit = async (data: SignUpFormData) => {
//     if (!isLoaded) return;

//     setIsLoading(true);
//     try {
//       await signUp.create({
//         emailAddress: data.email,
//         password: data.password,
//         firstName: data.name.split(" ")[0],
//         lastName: data.name.split(" ").slice(1).join(" ") || undefined,
//         // unsafeMetadata: {
//         //   role: data.role,
//         //   college: data.college,
//         // },
//       });

//       await signUp.prepareEmailAddressVerification({
//         strategy: "email_code",
//       });

//       toast({
//         title: "Check your email",
//         description:
//           "We've sent you a verification code to complete sign up.",
//       });

//       router.push("/verify-email");
//     } catch (error: any) {
//       console.error("Sign up error:", error);
//       toast({
//         title: "Sign up failed",
//         description:
//           error.errors?.[0]?.message ||
//           "Something went wrong. Please try again.",
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
//       title="Create your account"
//       subtitle="Start your journey to interview success"
//     >
//       <GoogleButton mode="sign-up" />
//       <Divider />

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//         <motion.div
//           custom={0}
//           initial="hidden"
//           animate="visible"
//           variants={inputVariants}
//           className="space-y-2"
//         >
//           <Label htmlFor="name" className="text-sm font-medium">
//             Full Name
//           </Label>
//           <Input
//             id="name"
//             placeholder="John Doe"
//             {...register("name")}
//             className="h-12 bg-secondary/50 border-border focus:border-primary transition-colors"
//           />
//           {errors.name && (
//             <p className="text-sm text-destructive">
//               {errors.name.message}
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
//           custom={2}
//           initial="hidden"
//           animate="visible"
//           variants={inputVariants}
//           className="space-y-2"
//         >
//           <Label htmlFor="password" className="text-sm font-medium">
//             Password
//           </Label>
//           <div className="relative">
//             <Input
//               id="password"
//               type={showPassword ? "text" : "password"}
//               placeholder="Create a strong password"
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
//           custom={4}
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
//                 Creating account...
//               </>
//             ) : (
//               "Create account"
//             )}
//           </Button>
//         </motion.div> 
//       </form>

//       <p className="mt-6 text-center text-sm text-muted-foreground">
//         Already have an account?{" "}
//         <Link
//           href="/sign-in"
//           className="font-medium text-foreground hover:underline transition-all"
//         >
//           Sign in
//         </Link>
//       </p>
//     </AuthLayout>
//   );
// };

// export default SignUp;
