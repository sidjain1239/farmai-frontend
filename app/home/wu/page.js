'use client'
import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import styles from './page.module.css';

// Constants from the dataset
const CROP_TYPES = [
    { value: "rice", label: "Rice" },
    { value: "wheat", label: "Wheat" },
    { value: "maize", label: "Maize" },
    { value: "sugarcane", label: "Sugarcane" },
    { value: "cotton", label: "Cotton" },
    { value: "groundnut", label: "Groundnut" },
    { value: "potato", label: "Potato" },
    { value: "tomato", label: "Tomato" },
    { value: "onion", label: "Onion" },
    { value: "mango", label: "Mango" }
];

const SEASONS = [
    { value: "kharif", label: "Kharif" },
    { value: "rabi", label: "Rabi" },
    { value: "summer", label: "Summer" }
];

const SOIL_TYPES = [
    { value: "clayey", label: "Clayey" },
    { value: "sandy", label: "Sandy" },
    { value: "loamy", label: "Loamy" },
    { value: "black", label: "Black" },
    { value: "red", label: "Red" }
];

const IrrigationWater = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [irrigationResult, setIrrigationResult] = useState(null);
    const [waterResult, setWaterResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError(null);
        try {
            // First get irrigation type
            const irrigationData = {
                Crop: data.Crop,
                Season: data.Season,
                Soil_Type: data.Soil_Type,
                "Rainfall (mm)": Number(data["Rainfall (mm)"]),
                "Temperature (°C)": Number(data["Temperature (°C)"])
            };
            
            console.log("Sending irrigation data:", irrigationData);
            const irrigationResponse = await axios.post('https://farmai-backend.onrender.com/cropitype', irrigationData);
            setIrrigationResult(irrigationResponse.data);

            // Then get water usage with the predicted irrigation type - using the correct field name
            const waterData = {
                Soil_Type: data.Soil_Type,
                "Rainfall (mm)": Number(data["Rainfall (mm)"]),
                "Temperature (°C)": Number(data["Temperature (°C)"]),
                "Area(ha)": Number(data["Area(ha)"]),
                Crop: data.Crop,
                Season: data.Season,
                Irrigation_Type: irrigationResponse.data.predicted_irrigation_type
            };
            
            console.log("Sending water usage data:", waterData);
            const waterResponse = await axios.post('https://farmai-backend.onrender.com/waterusage', waterData);
            setWaterResult(waterResponse.data);
        } catch (error) {
            console.error('Error details:', error.response?.data);
            setError(error.response?.data?.detail || 'Error getting predictions. Please check your inputs.');
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
                Water Usage Prediction
            </motion.h1>
            
            <motion.p
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={styles.subtitle}
            >
                Optimize irrigation with precise water requirement predictions for your crops
            </motion.p>
            
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={styles.form}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.sectionTitle}>Crop & Growing Conditions</div>
                    <div className={styles.grid}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Crop Type</label>
                            <select
                                className={styles.input}
                                {...register("Crop", { required: "Crop type is required" })}
                            >
                                <option value="">Select Crop</option>
                                {CROP_TYPES.map(crop => (
                                    <option key={crop.value} value={crop.value}>
                                        {crop.label}
                                    </option>
                                ))}
                            </select>
                            {errors.Crop && <p className={styles.error}>{errors.Crop.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Season</label>
                            <select
                                className={styles.input}
                                {...register("Season", { required: "Season is required" })}
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
                            <label className={styles.label}>Soil Type</label>
                            <select
                                className={styles.input}
                                {...register("Soil_Type", { required: "Soil type is required" })}
                            >
                                <option value="">Select Soil Type</option>
                                {SOIL_TYPES.map(soil => (
                                    <option key={soil.value} value={soil.value}>
                                        {soil.label}
                                    </option>
                                ))}
                            </select>
                            {errors.Soil_Type && <p className={styles.error}>{errors.Soil_Type.message}</p>}
                        </div>
                    </div>

                    <div className={styles.sectionTitle}>Environmental & Field Information</div>
                    <div className={styles.grid}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Rainfall (mm)</label>
                            <input
                                className={styles.input}
                                type="number"
                                step="0.01"
                                placeholder="e.g., 200"
                                {...register("Rainfall (mm)", { 
                                    required: "Rainfall is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Rainfall cannot be negative" }
                                })}
                            />
                            {errors["Rainfall (mm)"] && <p className={styles.error}>{errors["Rainfall (mm)"].message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Temperature (°C)</label>
                            <input
                                className={styles.input}
                                type="number"
                                step="0.01"
                                placeholder="e.g., 25"
                                {...register("Temperature (°C)", { 
                                    required: "Temperature is required",
                                    valueAsNumber: true,
                                    min: { value: -20, message: "Temperature seems too low" },
                                    max: { value: 60, message: "Temperature seems too high" }
                                })}
                            />
                            {errors["Temperature (°C)"] && <p className={styles.error}>{errors["Temperature (°C)"].message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Area (hectares)</label>
                            <input
                                className={styles.input}
                                type="number"
                                step="0.01"
                                placeholder="e.g., 2.5"
                                {...register("Area(ha)", { 
                                    required: "Area is required",
                                    valueAsNumber: true,
                                    min: { value: 0.1, message: "Area must be greater than 0.1" }
                                })}
                            />
                            {errors["Area(ha)"] && <p className={styles.error}>{errors["Area(ha)"].message}</p>}
                            <p className={styles.note}>Enter the total land area for cultivation</p>
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
                            <div className={styles.loader}>Analyzing water requirements...</div>
                        ) : (
                            'Calculate Water Usage'
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

            {(irrigationResult || waterResult) && !error && (
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
                        <h2 className={styles.resultsTitle}>Water Resource Analysis</h2>
                        
                        {irrigationResult && (
                            <motion.div 
                                className={styles.predictionItem}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h3>Recommended Irrigation Type</h3>
                                <p className={styles.highlight}>
                                    {irrigationResult.predicted_irrigation_type.toUpperCase()}
                                </p>
                                <p>Confidence: {irrigationResult.confidence.toFixed(2)}%</p>
                            </motion.div>
                        )}
                        
                        {waterResult && (
                            <motion.div 
                                className={styles.predictionItem}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h3>Estimated Water Requirement</h3>
                                <p className={styles.highlight}>
                                    {waterResult.predicted_water_usage.toFixed(2)} liters
                                </p>
                                <p>For {waterResult.area_hectares} hectares of land</p>
                                <p className={styles.efficiency}>
                                    {(waterResult.predicted_water_usage / waterResult.area_hectares / 1000).toFixed(2)} m³ per hectare
                                </p>
                            </motion.div>
                        )}
                        
                        <motion.div 
                            className={styles.recommendations}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <h3>Water Conservation Tips</h3>
                            <ul>
                                <li>Water early in the morning or evening to reduce evaporation</li>
                                <li>Use mulch around plants to retain soil moisture</li>
                                <li>Consider installing soil moisture sensors for precision irrigation</li>
                                <li>Maintain irrigation equipment to prevent leaks and inefficiencies</li>
                                <li>Collect rainwater when possible to supplement irrigation needs</li>
                            </ul>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </motion.div>
    );
}

export default IrrigationWater;