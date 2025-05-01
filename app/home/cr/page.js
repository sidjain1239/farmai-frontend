'use client'
import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import styles from './page.module.css';

const Cr = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const onSubmit = (data) => {
        setIsLoading(true);
        axios.post('https://farmai-backend.onrender.com/croprecommendation', data)
            .then(response => {
                console.log(response.data);
                setResult(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={styles.container}
        >
            <motion.h1 
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={styles.title}
            >
                Crop Recommendation
            </motion.h1>
            <motion.p
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={styles.subtitle}
            >
                Get AI-powered suggestions for the best crops to plant based on soil conditions and climate
            </motion.p>
            
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={styles.form}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.sectionTitle}>Soil Nutrients</div>
                    <div className={styles.grid}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="N">Nitrogen (N)</label>
                            <input
                                className={styles.input}
                                type="number"
                                id="N"
                                placeholder="e.g., 90"
                                {...register("N", { 
                                    required: "Nitrogen value is required", 
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Cannot be negative" }
                                })}
                            />
                            {errors.N && <p className={styles.error}>{errors.N.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="P">Phosphorus (P)</label>
                            <input
                                className={styles.input}
                                type="number"
                                id="P"
                                placeholder="e.g., 42"
                                {...register("P", { 
                                    required: "Phosphorus value is required", 
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Cannot be negative" }
                                })}
                            />
                            {errors.P && <p className={styles.error}>{errors.P.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="K">Potassium (K)</label>
                            <input
                                className={styles.input}
                                type="number"
                                id="K"
                                placeholder="e.g., 43"
                                {...register("K", { 
                                    required: "Potassium value is required", 
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Cannot be negative" }
                                })}
                            />
                            {errors.K && <p className={styles.error}>{errors.K.message}</p>}
                        </div>
                    </div>

                    <div className={styles.sectionTitle}>Environmental Factors</div>
                    <div className={styles.grid}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="temperature">Temperature (°C)</label>
                            <input
                                className={styles.input}
                                type="number"
                                step="0.01"
                                id="temperature"
                                placeholder="e.g., 20.87"
                                {...register("temperature", { 
                                    required: "Temperature is required", 
                                    valueAsNumber: true 
                                })}
                            />
                            {errors.temperature && <p className={styles.error}>{errors.temperature.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="humidity">Humidity (%)</label>
                            <input
                                className={styles.input}
                                type="number"
                                step="0.01"
                                id="humidity"
                                placeholder="e.g., 82.00"
                                {...register("humidity", { 
                                    required: "Humidity is required", 
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Cannot be negative" },
                                    max: { value: 100, message: "Cannot exceed 100%" }
                                })}
                            />
                            {errors.humidity && <p className={styles.error}>{errors.humidity.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="ph">pH Level</label>
                            <input
                                className={styles.input}
                                type="number"
                                step="0.01"
                                id="ph"
                                placeholder="e.g., 6.50"
                                {...register("ph", { 
                                    required: "pH is required", 
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Cannot be negative" },
                                    max: { value: 14, message: "Cannot exceed 14" }
                                })}
                            />
                            {errors.ph && <p className={styles.error}>{errors.ph.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="rainfall">Rainfall (mm)</label>
                            <input
                                className={styles.input}
                                type="number"
                                step="0.01"
                                id="rainfall"
                                placeholder="e.g., 202.93"
                                {...register("rainfall", { 
                                    required: "Rainfall is required", 
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Cannot be negative" }
                                })}
                            />
                            {errors.rainfall && <p className={styles.error}>{errors.rainfall.message}</p>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={styles.button}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className={styles.loader}>Analyzing...</div>
                        ) : (
                            'Get Crop Recommendations'
                        )}
                    </button>
                </form>
            </motion.div>

            {result && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={styles.resultsContainer}
                >
                    <h2 className={styles.resultsTitle}>Recommended Crops</h2>
                    
                    {result.predictions.map((pred, index) => (
                        <motion.div 
                            key={index} 
                            className={styles.resultCard}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <h3 className={styles.cardTitle}>
                                #{index + 1}: {pred.crop.charAt(0).toUpperCase() + pred.crop.slice(1)}
                            </h3>
                            <div className={styles.cardContent}>
                                <span className={styles.highlight}>{pred.confidence.toFixed(2)}%</span>
                                <p>Confidence score</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
}

export default Cr;