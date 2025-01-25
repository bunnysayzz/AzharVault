"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";

export default function PasswordPanel() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const authenticate = useAuthStore((state) => state.authenticate);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const isValid = authenticate(password);
      if (!isValid) {
        toast.error("Invalid password");
        setPassword("");
      }
      setIsLoading(false);
    }, 500);
  };

  if (isAuthenticated) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <div className="relative w-24 h-24 mb-2">
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Image
                    src="/batman-cricut.svg"
                    alt="Batman Logo"
                    width={96}
                    height={96}
                    className="w-24 h-24 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                  />
                </motion.div>
              </div>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-white mb-2"
            >
              Welcome to Azhar Vault
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 mb-2"
            >
              Please enter the password to continue
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm font-medium bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text italic"
            >
              Batman is watching you
            </motion.p>
          </div>
          <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onSubmit={handleSubmit} 
            className="space-y-6"
          >
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-lg bg-gray-700/50 text-white border border-gray-600 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 focus:outline-none 
                         transition-all duration-200 placeholder-gray-400"
                autoFocus
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                  />
                </svg>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                       text-white font-semibold transition-all duration-200 transform hover:scale-[1.02] 
                       active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100
                       focus:outline-none focus:ring-2 focus:ring-blue-500/40`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                  <span>Verifying...</span>
                </div>
              ) : (
                'Enter Vault'
              )}
            </button>
          </motion.form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 