
// pages/index.js
"use client";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/firebase";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import { doc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

async function fetchDataFromFirestore() {
  const querySnapshot = await getDocs(collection(db, "users"));
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
    console.log(data);
  });
  return data;
}


export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [userSession, setUserSession] = useState(null);

  const [users, setUsers] = useState([]);


  useEffect(() => {
    setIsClient(true);
    setUserSession(sessionStorage.getItem("user"));
  }, []);

  useEffect(() => {
    if (isClient && !user && !userSession) {
      router.push("/signup");
    }
  }, [isClient, user, userSession, router]);


  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetchDataFromFirestore();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <main className="w-full min-h-screen">
      {user ? <Navbar username={user.email} /> : <Navbar username="" />}
      <div className="flex flex-wrap justify-center gap-4 mt-36">
        {users.map((userData) => (
          <Card key={userData.id} name={userData.fullName} skill={userData.skill} userId={userData.id} />
        ))}
      </div>

    </main>
  );
}
