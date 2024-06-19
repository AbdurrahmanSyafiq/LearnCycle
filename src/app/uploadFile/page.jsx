// components/UploadMaterial.js
'use client'
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage, db } from "@/app/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

export default function UploadMaterial() {
  const [user] = useAuthState(auth);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !title) return;

    const storageRef = ref(storage, `materials/${user.uid}/${title}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading file: ", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, "materials"), {
          title,
          url: downloadURL,
          userId: user.uid,
          userEmail: user.email,
          timestamp: new Date(),
        });
        setFile(null);
        setTitle("");
        setUploadProgress(0);
        alert("File uploaded successfully!");
      }
    );
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">Upload Material</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-3 py-2 mb-4 bg-gray-700 text-white rounded-lg border border-gray-600"
        required
      />
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="w-full px-3 py-2 mb-4 bg-gray-700 text-white rounded-lg border border-gray-600"
        required
      />
      {uploadProgress > 0 && (
        <div className="mb-4">
          <div className="w-full bg-gray-600 rounded-lg h-2">
            <div
              className="bg-blue-600 h-2 rounded-lg"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-white text-sm mt-1">{Math.round(uploadProgress)}%</p>
        </div>
      )}
      <button
        onClick={handleUpload}
        className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300"
      >
        Upload
      </button>
    </div>
  );
}
