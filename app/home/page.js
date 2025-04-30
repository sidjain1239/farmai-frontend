'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Home = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-300 p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-6xl font-bold text-green-800 text-center mb-4">
          Welcome To FarmAI
        </h1>
        <h2 className="text-3xl font-semibold text-green-700 text-center mb-4">
          How Can We Help You
        </h2>
        <p className="text-xl text-green-600 text-center mb-12 max-w-3xl mx-auto">
          Leverage the power of AI to optimize your farming decisions and improve crop yields
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link href="/home/cr">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105">
                <h3 className="text-2xl font-semibold text-green-700 mb-4">
                  Crop Recommendation
                </h3>
                <p className="text-gray-600 mb-4">
                  Get AI-powered suggestions for the best crops to plant based on your soil conditions and climate.
                </p>
                <span className="text-green-600 font-medium">Learn more →</span>
              </div>
            </Link>
          </motion.div>
          
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/home/wu">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105">
                <h3 className="text-2xl font-semibold text-green-700 mb-4">
                  Water Usage Prediction
                </h3>
                <p className="text-gray-600 mb-4">
                  Optimize irrigation with precise water requirement predictions for your crops.
                </p>
                <span className="text-green-600 font-medium">Learn more →</span>
              </div>
            </Link>
          </motion.div>
          
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/home/fr">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105">
                <h3 className="text-2xl font-semibold text-green-700 mb-4">
                  Fertilizer Prediction
                </h3>
                <p className="text-gray-600 mb-4">
                  Get personalized fertilizer recommendations based on soil nutrients and crop needs.
                </p>
                <span className="text-green-600 font-medium">Learn more →</span>
              </div>
            </Link>
          </motion.div>
          
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/home/pfq">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105">
                <h3 className="text-2xl font-semibold text-green-700 mb-4">
                  Pesticide & Fertilizer Planning
                </h3>
                <p className="text-gray-600 mb-4">
                  Calculate optimal quantities of pesticides and fertilizers for maximum efficiency.
                </p>
                <span className="text-green-600 font-medium">Learn more →</span>
              </div>
            </Link>
          </motion.div>
          
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link href="/home/yp">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105">
                <h3 className="text-2xl font-semibold text-green-700 mb-4">
                  Yield Prediction
                </h3>
                <p className="text-gray-600 mb-4">
                  Forecast your crop yields using advanced machine learning algorithms.
                </p>
                <span className="text-green-600 font-medium">Learn more →</span>
              </div>
            </Link>
          </motion.div>
          
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="/home/ca">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105">
                <h3 className="text-2xl font-semibold text-green-700 mb-4">
                  Full Crop Analysis
                </h3>
                <p className="text-gray-600 mb-4">
                  Get comprehensive insights with our complete crop analysis system.
                </p>
                <span className="text-green-600 font-medium">Learn more →</span>
              </div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;