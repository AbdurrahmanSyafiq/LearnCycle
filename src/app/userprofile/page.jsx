'use client'
// pages/userprofile.js
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/app/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, setDoc } from "firebase/firestore";

export default function UserProfile() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [education, setEducation] = useState("");
  const [skill, setSkill] = useState("");

  useEffect(() => {
    if (user) {
      const storedEmail = sessionStorage.getItem("email");
      const storedPassword = sessionStorage.getItem("password");
      setEmail(storedEmail);
      setPassword(storedPassword);
    } else {
      router.push("/signup");
    }
  }, [user, router]);

  const handleSaveProfile = async (event) => {
    event.preventDefault();
    try {
      await setDoc(doc(db, "users", user.uid), {
        email,
        fullName,
        education,
        skill,
      });
      // Redirect ke halaman beranda atau halaman lain setelah profil disimpan
      router.push("/");
    } catch (error) {
      console.error("Error saving user profile: ", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">User Profile</h2>
        <form onSubmit={handleSaveProfile}>
          <div className="mb-4">
            <label className="block text-white mb-2">Email:</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Password:</label>
            <input
              type="password"
              value={password}
              disabled
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Full Name:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Education:</label>
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Skill:</label>
            <input
              type="text"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}
