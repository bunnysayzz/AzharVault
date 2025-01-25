"use client";

import { motion } from "framer-motion";
import UploadButton from "./UploadButton";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-gray-900/50 backdrop-blur-md z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0 flex items-center space-x-2"
          >
            <Image
              src="/batman-cricut.svg"
              alt="Batman Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                Azhar
              </span>
              <span className="text-2xl font-light text-gray-200">Vault</span>
            </div>
          </motion.div>
          <div className="flex items-center">
            <UploadButton />
          </div>
        </div>
      </div>
    </nav>
  );
} 