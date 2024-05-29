"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    setIsClient(true);
    setUserSession(sessionStorage.getItem("user"));
  }, []);

  useEffect(() => {
    if (isClient && !user && !userSession) {
      router.push("/signup");
    }
  }, [isClient, user, userSession, router]);

  return (
    <main className="w-full min-h-screen">
      <Navbar></Navbar>
    </main>
  );
}
