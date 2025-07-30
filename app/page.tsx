import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = await auth();
  
  if (userId) {
    // User is signed in, redirect to friends
    redirect("/friends");
  }
  
  // User is not signed in, redirect to sign-in
  redirect("/sign-in");
} 