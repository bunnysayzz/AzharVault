"use client";

import { CldImage } from "next-cloudinary";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import { useAuthStore } from "@/store/useAuthStore";
import ImagePopup from "./ImagePopup";

interface Image {
  public_id: string;
  secure_url: string;
}

export default function ImageGallery({ images: initialImages }: { images: Image[] }) {
  const [images, setImages] = useState(initialImages);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const refreshTrigger = useStore((state) => state.refreshTrigger);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    const refreshImages = async () => {
      const response = await fetch('/api/images');
      const newImages = await response.json();
      setImages(newImages);
    };

    if (refreshTrigger > 0) {
      refreshImages();
    }
  }, [refreshTrigger]);

  if (!isAuthenticated) return null;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {images.map((image, i) => (
          <motion.div
            key={image.public_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative w-full h-auto cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <CldImage
              src={image.public_id}
              width={400}
              height={300}
              alt="Gallery Image"
              className="rounded-lg hover:scale-105 transition-transform duration-300 w-full h-auto object-contain"
              priority={i < 10}
            />
          </motion.div>
        ))}
      </div>

      <ImagePopup 
        image={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </>
  );
} 