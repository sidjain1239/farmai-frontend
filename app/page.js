'use client'
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Background Image */}
      <div className={styles.backgroundWrapper}>
        <Image 
          src="/background.jpeg" 
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
      
      {/* Content */}
      <div className={styles.contentContainer}>
        {/* Logo/Icon */}
        <div>
          <Image 
            src="/favicon.ico" 
            alt="FarmAI Logo" 
            width={80} 
            height={80}
            className={styles.logo}
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.headerSection}
        >
          <h1 className={styles.title}>Welcome to FarmAI</h1>
          <p className={styles.subtitle}>
            Your intelligent farming companion powered by artificial intelligence
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.grid}
        >
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Smart Predictions</h2>
            <p className={styles.cardContent}>
              Get accurate predictions for crop yields, water usage, and fertilizer requirements
            </p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>AI-Powered Recommendations</h2>
            <p className={styles.cardContent}>
              Receive personalized recommendations for crop selection and farming practices
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/home">
            <div className={styles.button}>
              Get Started
              <span style={{ marginLeft: '0.5rem' }}>→</span>
            </div>
          </Link>
        </motion.div>
        
        {/* Attribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={styles.attribution}
        >
          <p>
            Developed, Designed & Trained by <strong>Siddharth Jain</strong>
          </p>
        </motion.div>
      </div>
    </div>
  );
}