"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase"; // Sesuaikan path ke konfigurasi firebase Anda

const UserProfile = () => {
  const pathname = usePathname(); // Mendapatkan path URL saat ini
  const [userId, setUserId] = useState(null);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    // Mengekstrak userId dari pathname
    const segments = pathname.split('/');
    const extractedUserId = segments[2];
    setUserId(extractedUserId);
  }, [pathname]);

  useEffect(() => {
    const fetchMaterials = async () => {
      if (!userId) return;

      try {
        const materialsRef = ref(storage, `materials/${userId}/`);
        const materialsSnapshot = await listAll(materialsRef);
        const materialsData = await Promise.all(
          materialsSnapshot.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return {
              title: itemRef.name,
              url,
            };
          })
        );
        setMaterials(materialsData);
      } catch (error) {
        console.error("Error fetching materials: ", error);
      }
    };

    fetchMaterials();
  }, [userId]);

  if (!userId) {
    return <div>Loading...</div>;
  }

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

export default UserProfile;
