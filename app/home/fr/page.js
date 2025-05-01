'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import styles from './page.module.css';

// Constants from the model's dataset
const SOIL_TYPES = [
    { value: "acidic", label: "Acidic" },
    { value: "alkaline", label: "Alkaline" },
    { value: "loamy", label: "Loamy" },
    { value: "neutral", label: "Neutral" },
    { value: "peaty", label: "Peaty" }
];

const CROP_TYPES = [
    { value: "Adzuki Beans", label: "Adzuki Beans" },
    { value: "Black gram", label: "Black Gram" },
    { value: "Chickpea", label: "Chickpea" },
    { value: "Coconut", label: "Coconut" },
    { value: "Coffee", label: "Coffee" },
    { value: "Cotton", label: "Cotton" },
    { value: "Ground Nut", label: "Ground Nut" },
    { value: "Jute", label: "Jute" },
    { value: "Kidney Beans", label: "Kidney Beans" },
    { value: "Lentil", label: "Lentil" },
    { value: "Moth Beans", label: "Moth Beans" },
    { value: "Mung Bean", label: "Mung Bean" },
    { value: "Peas", label: "Peas" },
    { value: "Pigeon Peas", label: "Pigeon Peas" },
    { value: "Rubber", label: "Rubber" },
    { value: "Sugarcane", label: "Sugarcane" },
    { value: "Tea", label: "Tea" },
    { value: "Tobacco", label: "Tobacco" },
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "grapes", label: "Grapes" },
    { value: "maize", label: "Maize" },
    { value: "mango", label: "Mango" },
    { value: "millet", label: "Millet" },
    { value: "muskmelon", label: "Muskmelon" },
    { value: "orange", label: "Orange" },
    { value: "papaya", label: "Papaya" },
    { value: "pomegranate", label: "Pomegranate" },
    { value: "rice", label: "Rice" },
    { value: "watermelon", label: "Watermelon" },
    { value: "wheat", label: "Wheat" }
];

export default function FertilizerForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await axios.post('https://farmai-backend.onrender.com/fertilizer', {
                ...data,
                Temperature: Number(data.Temperature),
                Humidity: Number(data.Humidity),
                Moisture: Number(data.Moisture),
                Nitrogen: Number(data.Nitrogen),
                Phosphorous: Number(data.Phosphorous),
                Potassium: Number(data.Potassium),
                Rainfall: Number(data.Rainfall),
                PH: Number(data.PH),
                Carbon: Number(data.Carbon)
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error:', error.response?.data);
            setError(error.response?.data?.detail || 'An error occurred while processing your request');
        } finally {
            setIsLoading(false);
        }
    };

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
                Fertilizer Recommendation
            </motion.h1>
            <motion.p 
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={styles.subtitle}
            >
                Get personalized fertilizer recommendations based on soil nutrients and crop needs
            </motion.p>
            
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={styles.form}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.sectionTitle}>Crop and Soil Information</div>
                    <div className={styles.grid}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Soil Type</label>
                            <select 
                                className={styles.input}
                                {...register('Soil', { required: "Soil type is required" })}
                            >
                                <option value="">Select Soil Type</option>
                                {SOIL_TYPES.map(soil => (
                                    <option key={soil.value} value={soil.value}>
                                        {soil.label}
                                    </option>
                                ))}
                            </select>
                            {errors.Soil && <p className={styles.error}>{errors.Soil.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Crop Type</label>
                            <select 
                                className={styles.input}
                                {...register('Crop', { required: "Crop type is required" })}
                            >
                                <option value="">Select Crop Type</option>
                                {CROP_TYPES.map(crop => (
                                    <option key={crop.value} value={crop.value}>
                                        {crop.label}
                                    </option>
                                ))}
                            </select>
                            {errors.Crop && <p className={styles.error}>{errors.Crop.message}</p>}
                        </div>
                    </div>

                    <div className={styles.sectionTitle}>Environmental Conditions</div>
                    <div className={styles.grid}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Temperature (°C)</label>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="e.g., 25.5"
                                className={styles.input}
                                {...register('Temperature', { 
                                    required: "Temperature is required",
                                    valueAsNumber: true,
                                    min: { value: -20, message: "Temperature cannot be less than -20°C" },
                                    max: { value: 60, message: "Temperature cannot exceed 60°C" }
                                })}
                            />
                            {errors.Temperature && <p className={styles.error}>{errors.Temperature.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Humidity (%)</label>
                            <input
                                type="number"
                                placeholder="e.g., 65"
                                className={styles.input}
                                {...register('Humidity', { 
                                    required: "Humidity is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Humidity cannot be negative" },
                                    max: { value: 100, message: "Humidity cannot exceed 100%" }
                                })}
                            />
                            {errors.Humidity && <p className={styles.error}>{errors.Humidity.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Rainfall (mm)</label>
                            <input
                                type="number"
                                placeholder="e.g., 150.5"
                                className={styles.input}
                                {...register('Rainfall', { 
                                    required: "Rainfall is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Rainfall cannot be negative" }
                                })}
                            />
                            {errors.Rainfall && <p className={styles.error}>{errors.Rainfall.message}</p>}
                        </div>
                    </div>

                    <div className={styles.sectionTitle}>Soil Composition</div>
                    <div className={styles.grid}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Moisture</label>
                            <input
                                type="number"
                                placeholder="e.g., 40"
                                className={styles.input}
                                {...register('Moisture', { 
                                    required: "Moisture is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Moisture cannot be negative" },
                                    max: { value: 100, message: "Moisture cannot exceed 100" }
                                })}
                            />
                            {errors.Moisture && <p className={styles.error}>{errors.Moisture.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>pH Level</label>
                            <input
                                type="number"
                                step="0.1"
                                placeholder="e.g., 6.5"
                                className={styles.input}
                                {...register('PH', { 
                                    required: "pH is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "pH cannot be negative" },
                                    max: { value: 14, message: "pH cannot exceed 14" }
                                })}
                            />
                            {errors.PH && <p className={styles.error}>{errors.PH.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Carbon</label>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="e.g., 0.5"
                                className={styles.input}
                                {...register('Carbon', { 
                                    required: "Carbon content is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Carbon cannot be negative" }
                                })}
                            />
                            {errors.Carbon && <p className={styles.error}>{errors.Carbon.message}</p>}
                        </div>
                    </div>

                    <div className={styles.sectionTitle}>NPK Values</div>
                    <div className={styles.grid}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Nitrogen (N)</label>
                            <input
                                type="number"
                                placeholder="e.g., 40"
                                className={styles.input}
                                {...register('Nitrogen', { 
                                    required: "Nitrogen is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Nitrogen cannot be negative" }
                                })}
                            />
                            {errors.Nitrogen && <p className={styles.error}>{errors.Nitrogen.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Phosphorous (P)</label>
                            <input
                                type="number"
                                placeholder="e.g., 45"
                                className={styles.input}
                                {...register('Phosphorous', { 
                                    required: "Phosphorous is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Phosphorous cannot be negative" }
                                })}
                            />
                            {errors.Phosphorous && <p className={styles.error}>{errors.Phosphorous.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Potassium (K)</label>
                            <input
                                type="number"
                                placeholder="e.g., 50"
                                className={styles.input}
                                {...register('Potassium', { 
                                    required: "Potassium is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Potassium cannot be negative" }
                                })}
                            />
                            {errors.Potassium && <p className={styles.error}>{errors.Potassium.message}</p>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={styles.button}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className={styles.loader}>Analyzing soil data...</div>
                        ) : (
                            'Get Fertilizer Recommendation'
                        )}
                    </button>
                </form>
            </motion.div>

            {error && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={styles.errorCard || styles.error}
                >
                    <h3>Error</h3>
                    <p>{error}</p>
                </motion.div>
            )}

            {result && !error && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={styles.results || styles.resultsContainer}
                >
                    <h2 className={styles.resultsTitle || ''}>Recommended Fertilizer</h2>
                    <div className={styles.resultCard || styles.prediction}>
                        <h3 className={styles.cardTitle || ''}>
                            {result.predicted_fertilizer}
                        </h3>
                        {result.remark && (
                            <p className={styles.cardContent || ''}>
                                {result.remark}
                            </p>
                        )}
                        <p className={styles.note || ''}>
                            Apply the recommended fertilizer according to the manufacturer's instructions 
                            and adjust based on soil testing results.
                        </p>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}