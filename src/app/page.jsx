"use client";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [userSession, setUserSession] = useState(null);
  

  console.log(user);
  useEffect(() => {
    setIsClient(true);
    setUserSession(sessionStorage.getItem("user"));
  }, []);

  useEffect(() => {
    if (isClient && !user && !userSession) {
      router.push("/signup");
    }
    console.log(user);
  }, [isClient, user, userSession, router]);

  return (
    <main className="w-full min-h-screen">
    {user ? (
        <Navbar username={user.email} />
        ) : (
          <Navbar username="" />
        )}
      
    </main>
  );
}
