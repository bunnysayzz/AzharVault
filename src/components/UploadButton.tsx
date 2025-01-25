"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useStore } from "@/store/useStore";
import { useState } from "react";
import toast from "react-hot-toast";

interface CloudinaryUploadResponse {
  info: {
    public_id: string;
    secure_url: string;
  };
  event: "success";
}

export default function UploadButton() {
  const [isUploading, setIsUploading] = useState(false);
  const incrementRefreshTrigger = useStore((state) => state.incrementRefreshTrigger);

  const handleUpload = async (result: CloudinaryUploadResponse) => {
    if (!result?.info) return;

    try {
      const response = await fetch("/api/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          public_id: result.info.public_id,
          secure_url: result.info.secure_url,
        }),
      });

      if (response.ok) {
        incrementRefreshTrigger();
        toast.success("Image uploaded successfully!");
      }
    } catch (error) {
      console.error("Error saving image:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <CldUploadWidget
      uploadPreset="ml_default"
      onSuccess={(result) => {
        handleUpload(result as CloudinaryUploadResponse);
      }}
      onClose={() => setIsUploading(false)}
    >
      {({ open }) => (
        <button
          onClick={() => {
            setIsUploading(true);
            open();
          }}
          className={`bg-white/10 hover:bg-white/20 transition-colors duration-200 
            text-white font-semibold py-2 px-4 rounded-full
            ${isUploading ? 'opacity-70' : ''}`}
          disabled={isUploading}
        >
          Upload Image
        </button>
      )}
    </CldUploadWidget>
  );
} 