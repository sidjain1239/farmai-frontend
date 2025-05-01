'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import styles from './page.module.css';

// Constants from your dataset
const SOIL_TYPES = [
    { value: "loamy", label: "Loamy" },
];

const SEASONS = [
    { value: "kharif", label: "Kharif" },
    { value: "rabi", label: "Rabi" },
    // { value: "zaid", label: "Zaid" }
];

export default function AgriAnalyticsForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [results, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post('https://farmai-backend.onrender.com/agri-analytics', {
                N: Number(data.N),
                P: Number(data.P),
                K: Number(data.K),
                temperature: Number(data.temperature),
                rainfall: Number(data.rainfall),
                humidity: Number(data.humidity),
                ph: Number(data.ph),
                Soil_Type: data.Soil_Type,
                Season: data.Season,
                "Area(ha)": Number(data["Area(ha)"]),
                Moisture: Number(data.Moisture),
                Carbon: Number(data.Carbon)
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error:', error);
            setError(error.response?.data?.detail || 'Error getting analytics. Please check your inputs.');
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
                Agricultural Analytics
            </motion.h1>
            
            <motion.p
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={styles.subtitle}
            >
                Get comprehensive farming recommendations with a single analysis
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
                            <label className={styles.label}>Nitrogen (N)</label>
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="e.g., 90"
                                {...register('N', { 
                                    required: "Nitrogen is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Cannot be negative" }
                                })}
                            />
                            {errors.N && <p className={styles.error}>{errors.N.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Phosphorous (P)</label>
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="e.g., 42"
                                {...register('P', { 
                                    required: "Phosphorous is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Cannot be negative" }
                                })}
                            />
                            {errors.P && <p className={styles.error}>{errors.P.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Potassium (K)</label>
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="e.g., 43"
                                {...register('K', { 
                                    required: "Potassium is required",
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
                            <label className={styles.label}>Temperature (°C)</label>
                            <input
                                type="number"
                                step="0.1"
                                className={styles.input}
                                placeholder="e.g., 28"
                                {...register('temperature', { 
                                    required: "Temperature is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Cannot be negative" }
                                })}
                            />
                            {errors.temperature && <p className={styles.error}>{errors.temperature.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Rainfall (mm)</label>
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="e.g., 800"
                                {...register('rainfall', { 
                                    required: "Rainfall is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Cannot be negative" }
                                })}
                            />
                            {errors.rainfall && <p className={styles.error}>{errors.rainfall.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Humidity (%)</label>
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="e.g., 85"
                                {...register('humidity', { 
                                    required: "Humidity is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Cannot be negative" },
                                    max: { value: 100, message: "Cannot exceed 100%" }
                                })}
                            />
                            {errors.humidity && <p className={styles.error}>{errors.humidity.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>pH Level</label>
                            <input
                                type="number"
                                step="0.1"
                                className={styles.input}
                                placeholder="e.g., 6.5"
                                {...register('ph', { 
                                    required: "pH is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Cannot be negative" },
                                    max: { value: 14, message: "Cannot exceed 14" }
                                })}
                            />
                            {errors.ph && <p className={styles.error}>{errors.ph.message}</p>}
                        </div>
                    </div>

                    <div className={styles.sectionTitle}>Farm Information</div>
                    <div className={styles.grid}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Soil Type</label>
                            <select
                                className={styles.input}
                                {...register('Soil_Type', { required: "Soil type is required" })}
                            >
                                <option value="">Select Soil Type</option>
                                {SOIL_TYPES.map(soil => (
                                    <option key={soil.value} value={soil.value}>
                                        {soil.label}
                                    </option>
                                ))}
                            </select>
                            <p className={styles.note}>Currently, the model only accepts loamy soil.</p>
                            {errors.Soil_Type && <p className={styles.error}>{errors.Soil_Type.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Season</label>
                            <select
                                className={styles.input}
                                {...register('Season', { required: "Season is required" })}
                            >
                                <option value="">Select Season</option>
                                {SEASONS.map(season => (
                                    <option key={season.value} value={season.value}>
                                        {season.label}
                                    </option>
                                ))}
                            </select>
                            {errors.Season && <p className={styles.error}>{errors.Season.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Area (hectares)</label>
                            <input
                                type="number"
                                step="0.01"
                                className={styles.input}
                                placeholder="e.g., 200"
                                {...register('Area(ha)', { 
                                    required: "Area is required",
                                    valueAsNumber: true,
                                    min: { value: 0.1, message: "Area must be at least 0.1 hectare" }
                                })}
                            />
                            {errors['Area(ha)'] && <p className={styles.error}>{errors['Area(ha)'].message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Moisture (%)</label>
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="e.g., 28"
                                {...register('Moisture', { 
                                    required: "Moisture is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Cannot be negative" },
                                    max: { value: 100, message: "Cannot exceed 100%" }
                                })}
                            />
                            {errors.Moisture && <p className={styles.error}>{errors.Moisture.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Carbon Content</label>
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="e.g., 33"
                                {...register('Carbon', { 
                                    required: "Carbon content is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Cannot be negative" }
                                })}
                            />
                            {errors.Carbon && <p className={styles.error}>{errors.Carbon.message}</p>}
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
                            <div className={styles.loader}>Analyzing data...</div>
                        ) : (
                            'Get Complete Analysis'
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

            {results && !error && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={styles.resultsContainer}
                >
                    <h2 className={styles.resultsTitle}>Agricultural Analytics Results</h2>
                    
                    <div className={styles.resultsGrid}>
                        {/* Crop Recommendation */}
                        {results.crop_recommendation && (
                            <motion.div 
                                className={styles.resultCard}
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                whileHover={{ scale: 1.03 }}
                            >
                                <h3 className={styles.cardTitle}>Crop Recommendation</h3>
                                <div className={styles.cardContent}>
                                    <p className={styles.highlight}>{results.crop_recommendation.crop || 'Data not available'}</p>
                                    <p>Confidence: {results.crop_recommendation.confidence?.toFixed(2) || 'N/A'}%</p>
                                </div>
                            </motion.div>
                        )}
                        
                        {/* Irrigation Type */}
                        {results.irrigation_type && (
                            <motion.div 
                                className={styles.resultCard}
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                whileHover={{ scale: 1.03 }}
                            >
                                <h3 className={styles.cardTitle}>Irrigation System</h3>
                                <div className={styles.cardContent}>
                                    <p className={styles.highlight}>{results.irrigation_type.predicted_irrigation_type || 'Data not available'}</p>
                                    <p>Confidence: {results.irrigation_type.confidence?.toFixed(2) || 'N/A'}%</p>
                                </div>
                            </motion.div>
                        )}
                        
                        {/* Water Usage */}
                        <motion.div 
                            className={styles.resultCard}
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            whileHover={{ scale: 1.03 }}
                        >
                            <h3 className={styles.cardTitle}>Water Usage</h3>
                            <div className={styles.cardContent}>
                                <p className={styles.highlight}>
                                    {results.water_usage?.predicted_water_usage 
                                        ? `${results.water_usage.predicted_water_usage.toFixed(2)} liters`
                                        : 'Data not available'}
                                </p>
                                <p>Estimated water requirement for your farm</p>
                            </div>
                        </motion.div>
                        
                        {/* Fertilizer Recommendation */}
                        <motion.div 
                            className={styles.resultCard}
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                            whileHover={{ scale: 1.03 }}
                        >
                            <h3 className={styles.cardTitle}>Fertilizer Recommendation</h3>
                            <div className={styles.cardContent}>
                                <p className={styles.highlight}>
                                    {results.fertilizer_recommendation?.predicted_fertilizer || 'Data not available'}
                                </p>
                                <p>{results.fertilizer_recommendation?.remark || ''}</p>
                            </div>
                        </motion.div>
                        
                        {/* Crop Yield */}
                        {results.crop_yield && (
                            <motion.div 
                                className={styles.resultCard}
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.5 }}
                                whileHover={{ scale: 1.03 }}
                            >
                                <h3 className={styles.cardTitle}>Expected Yield</h3>
                                <div className={styles.cardContent}>
                                    <p className={styles.highlight}>
                                        {results.crop_yield.predicted_crop_yield
                                            ? `${results.crop_yield.predicted_crop_yield.toFixed(2)} tons`
                                            : 'Data not available'}
                                    </p>
                                    <p>Estimated total yield for your farm</p>
                                </div>
                            </motion.div>
                        )}
                        
                        {/* Fertilizer & Pesticide Quantity */}
                        {results.fertilizer_pesticide_quantity && !results.fertilizer_pesticide_quantity.error && (
                            <motion.div 
                                className={styles.resultCard}
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.6 }}
                                whileHover={{ scale: 1.03 }}
                            >
                                <h3 className={styles.cardTitle}>Required Quantities</h3>
                                <div className={styles.cardContent}>
                                    <p>
                                        <span className={styles.label}>Fertilizer:</span> 
                                        <span className={styles.highlight}>
                                            {results.fertilizer_pesticide_quantity.predicted_fertilizer_usage_tons?.toFixed(2) || 'N/A'} tons
                                        </span>
                                    </p>
                                    <p>
                                        <span className={styles.label}>Pesticide:</span> 
                                        <span className={styles.highlight}>
                                            {results.fertilizer_pesticide_quantity.predicted_pesticide_usage_kg?.toFixed(2) || 'N/A'} kg
                                        </span>
                                    </p>
                                    {results.fertilizer_pesticide_quantity.note && (
                                        <p className={styles.note}>{results.fertilizer_pesticide_quantity.note}</p>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </div>
                    
                    {/* Farming Tips */}
                    <motion.div 
                        className={styles.recommendations}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        <h3>Farming Best Practices</h3>
                        <ul>
                            <li>Follow recommended crop rotation practices to maintain soil health</li>
                            <li>Use soil tests to monitor and adjust nutrient levels periodically</li>
                            <li>Implement integrated pest management to minimize pesticide use</li>
                            <li>Consider water conservation techniques like rainwater harvesting</li>
                            <li>Time fertilizer applications according to crop growth stages for maximum efficiency</li>
                        </ul>
                    </motion.div>
                    
                    {/* Error Display */}
                    {results.error && (
                        <motion.div 
                            className={styles.errorCard}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <h3>Error</h3>
                            <p>{results.error}</p>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </motion.div>
    );
}