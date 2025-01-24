"use client";

import { CldImage } from "next-cloudinary";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ImagePopupProps {
  image: {
    public_id: string;
    secure_url: string;
  } | null;
  onClose: () => void;
}

export default function ImagePopup({ image, onClose }: ImagePopupProps) {
  const [isLoading, setIsLoading] = useState(true);

  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-7xl max-h-[90vh] overflow-hidden"
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-gray-200 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin" 
                     style={{ borderTopColor: 'transparent', animationDuration: '1s' }}></div>
              </div>
            </div>
          )}
          <CldImage
            src={image.public_id}
            width={1920}
            height={1080}
            alt="Enlarged Image"
            className={`w-auto h-auto max-h-[90vh] object-contain rounded-lg transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            priority
            onLoadingComplete={() => setIsLoading(false)}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 