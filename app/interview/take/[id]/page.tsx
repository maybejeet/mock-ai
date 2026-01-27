"use client";
import { useUser } from "@clerk/nextjs";


export default function page() {
  const { user } = useUser();

  return (
    <h1 className="text-4xl font-bold  flex justify-center items-center h-screen"> HELLO {user?.fullName}.<br></br> Lets start your interview</h1>
  )
}