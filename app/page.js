'use client'
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-green-300 p-4">
 
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h1 className="text-5xl font-bold text-green-800 mb-4">Welcome to FarmAI</h1>
        <p className="text-xl text-green-700 max-w-2xl mx-auto">
          Your intelligent farming companion powered by artificial intelligence
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mb-8"
      >
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold text-green-700 mb-2">Smart Predictions</h2>
          <p className="text-gray-600">Get accurate predictions for crop yields, water usage, and fertilizer requirements</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold text-green-700 mb-2">AI-Powered Recommendations</h2>
          <p className="text-gray-600">Receive personalized recommendations for crop selection and farming practices</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center"
      >
        <Link href="/home">
          <div className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Get Started
            <span className="ml-2">→</span>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}