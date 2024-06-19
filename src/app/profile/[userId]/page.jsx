"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";

const UserID = () => {
  const router = usePathname();
  console.log(router);
  const parts = router.split("/");
  const userId = parts[2];
  console.log(userId);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      if (!userId) return;

      try {
        const materialsRef = collection(db, "materials");
        const q = query(materialsRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const materialsData = querySnapshot.docs.map((doc) => doc.data());
        setMaterials(materialsData);
      } catch (error) {
        console.error("Error fetching materials: ", error);
      }
    };

    fetchMaterials();
  }, [userId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="grid grid-cols-1 gap-4">
        {materials.map((material, index) => (
          <div key={index} className="bg-gray-200 p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{material.title}</h2>
            <a
              href={material.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500">
              View Material
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserID;
