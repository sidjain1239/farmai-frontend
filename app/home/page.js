'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './home.module.css';

const Home = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className={styles.container}>
      {/* Background Image */}
      <div className={styles.backgroundWrapper}>
        <Image 
          src="/bg2.jpg"
          alt="Farm Background"
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center'
          }}
          quality={100}
          priority
        />
        <div className={styles.overlay}></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={styles.contentWrapper}
      >
        <div className={styles.header}>
          <h1 className={styles.title}>
            Welcome To FarmAI
          </h1>
          <h2 className={styles.subtitle}>
            How Can We Help You
          </h2>
          <p className={styles.description}>
            Leverage the power of AI to optimize your farming decisions and improve crop yields
          </p>
        </div>
        
        <div className={styles.grid}>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link href="/home/cr">
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>
                  Crop Recommendation
                </h3>
                <p className={styles.cardContent}>
                  Get AI-powered suggestions for the best crops to plant based on your soil conditions and climate.
                </p>
                <span className={styles.learnMore}>Learn more →</span>
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
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>
                  Water Usage Prediction
                </h3>
                <p className={styles.cardContent}>
                  Optimize irrigation with precise water requirement predictions for your crops.
                </p>
                <span className={styles.learnMore}>Learn more →</span>
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
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>
                  Fertilizer Prediction
                </h3>
                <p className={styles.cardContent}>
                  Get personalized fertilizer recommendations based on soil nutrients and crop needs.
                </p>
                <span className={styles.learnMore}>Learn more →</span>
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
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>
                  Pesticide & Fertilizer Planning
                </h3>
                <p className={styles.cardContent}>
                  Calculate optimal quantities of pesticides and fertilizers for maximum efficiency.
                </p>
                <span className={styles.learnMore}>Learn more →</span>
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
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>
                  Yield Prediction
                </h3>
                <p className={styles.cardContent}>
                  Forecast your crop yields using advanced machine learning algorithms.
                </p>
                <span className={styles.learnMore}>Learn more →</span>
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
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>
                  Full Crop Analysis
                </h3>
                <p className={styles.cardContent}>
                  Get comprehensive insights with our complete crop analysis system.
                </p>
                <span className={styles.learnMore}>Learn more →</span>
              </div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;