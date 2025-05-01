'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import styles from './page.module.css';

const CROP_TYPES = [
    { value: "rice", label: "Rice" },
    { value: "wheat", label: "Wheat" },
    { value: "maize", label: "Maize" },
    { value: "potato", label: "Potato" },
    { value: "tomato", label: "Tomato" },
    { value: "onion", label: "Onion" },
    { value: "peas", label: "Peas" },
    { value: "sugarcane", label: "Sugarcane" },
    { value: "cotton", label: "Cotton" },
    { value: "barley", label: "Barley" }
];

export default function CropYieldForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await axios.post('https://farmai-backend.onrender.com/cropyield', {
                crop_type: data.crop_type,
                temperature: Number(data.temperature),
                rainfall: Number(data.rainfall),
                humidity: Number(data.humidity),
                soil_ph: Number(data.soil_ph),
                area: Number(data.area)
            });
            // Store the area in the result object
            setResult({
                ...response.data,
                area: data.area
            });
        } catch (error) {
            console.error('Error:', error);
            setError(error.response?.data?.detail || 'Error getting prediction. Please check your inputs.');
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
                Crop Yield Prediction
            </motion.h1>
            
            <motion.p
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={styles.subtitle}
            >
                Forecast your crop yields using advanced machine learning algorithms
            </motion.p>
            
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={styles.form}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.sectionTitle}>Crop Selection</div>
                    <div className={styles.grid}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Crop Type</label>
                            <select
                                className={styles.input}
                                {...register('crop_type', { required: "Crop type is required" })}
                            >
                                <option value="">Select Crop</option>
                                {CROP_TYPES.map(crop => (
                                    <option key={crop.value} value={crop.value}>
                                        {crop.label}
                                    </option>
                                ))}
                            </select>
                            {errors.crop_type && <p className={styles.error}>{errors.crop_type.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Area (ha)</label>
                            <input
                                type="number"
                                step="0.01"
                                className={styles.input}
                                placeholder="e.g., 2.5"
                                {...register('area', { 
                                    required: "Area is required",
                                    valueAsNumber: true,
                                    min: { value: 0.1, message: "Area must be at least 0.1 hectare" }
                                })}
                            />
                            {errors.area && <p className={styles.error}>{errors.area.message}</p>}
                            <p className={styles.note}>Enter the size of your farming area in hectares</p>
                        </div>
                    </div>

                    <div className={styles.sectionTitle}>Environmental Factors</div>
                    <div className={styles.grid}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Temperature (°C)</label>
                            <input
                                type="number"
                                step="0.1"
                                className={styles.input}
                                placeholder="e.g., 25"
                                {...register('temperature', { 
                                    required: "Temperature is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Temperature must be positive" },
                                    max: { value: 80, message: "Temperature must not exceed 80°C" }
                                })}
                            />
                            {errors.temperature && <p className={styles.error}>{errors.temperature.message}</p>}
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Rainfall (mm)</label>
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="e.g., 1200"
                                {...register('rainfall', { 
                                    required: "Rainfall is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Rainfall must be non-negative" }
                                })}
                            />
                            {errors.rainfall && <p className={styles.error}>{errors.rainfall.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Humidity (%)</label>
                            <input
                                type="number"
                                step="0.1"
                                className={styles.input}
                                placeholder="e.g., 65"
                                {...register('humidity', { 
                                    required: "Humidity is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Humidity must be non-negative" },
                                    max: { value: 100, message: "Humidity cannot exceed 100%" }
                                })}
                            />
                            {errors.humidity && <p className={styles.error}>{errors.humidity.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Soil pH</label>
                            <input
                                type="number"
                                step="0.1"
                                className={styles.input}
                                placeholder="e.g., 6.5"
                                {...register('soil_ph', { 
                                    required: "Soil pH is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "pH must be non-negative" },
                                    max: { value: 14, message: "pH cannot exceed 14" }
                                })}
                            />
                            {errors.soil_ph && <p className={styles.error}>{errors.soil_ph.message}</p>}
                        </div>
                    </div>

                    <motion.button
                        type="submit"
                        className={styles.button}
                        disabled={isLoading}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isLoading ? (
                            <div className={styles.loader}>Calculating yield estimates...</div>
                        ) : (
                            'Predict Yield'
                        )}
                    </motion.button>
                </form>
            </motion.div>

            {error && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={styles.errorMessage}
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
                    className={styles.results}
                >
                    <motion.div 
                        className={styles.resultSection}
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <h2 className={styles.resultsTitle}>Yield Forecast</h2>
                        
                        <motion.div 
                            className={styles.predictionItem}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <h3>Estimated Crop Yield</h3>
                            <p className={styles.highlight}>
                                {result.predicted_crop_yield 
                                    ? `${Number(result.predicted_crop_yield).toFixed(2)} tons/hectare`
                                    : 'Calculation error'}
                            </p>
                            <p className={styles.totalYield}>
                                Total expected yield: <span>{result.predicted_crop_yield 
                                    ? <strong>{(Number(result.predicted_crop_yield) * Number(result.area)).toFixed(2)} tons</strong>
                                    : 'Calculation error'}</span>
                            </p>
                            <p className={styles.note}>Based on {result.area} hectares of farmland</p>
                        </motion.div>
                        
                        <motion.div 
                            className={styles.recommendations}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <h3>Yield Optimization Tips</h3>
                            <ul>
                                <li>Monitor and maintain optimal soil moisture throughout the growing season</li>
                                <li>Ensure balanced nutrition through soil testing and targeted fertilization</li>
                                <li>Implement pest and disease monitoring to catch issues early</li>
                                <li>Consider crop rotation to improve soil health and reduce pest pressure</li>
                                <li>Time planting and harvesting based on weather forecasts for optimal conditions</li>
                            </ul>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </motion.div>
    );
}