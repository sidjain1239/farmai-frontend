'use client'
import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
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

const IRRIGATION_TYPES = [
    { value: "drip", label: "Drip" },
    { value: "flood", label: "Flood" },
    { value: "sprinkler", label: "Sprinkler" },
    { value: "manual", label: "Manual" },
    { value: "rain-fed", label: "Rain-fed" }
];

const IrrigationWater = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [irrigationResult, setIrrigationResult] = useState(null);
    const [waterResult, setWaterResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
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
            const irrigationResponse = await axios.post('http://127.0.0.1:8000/cropitype', irrigationData);
            setIrrigationResult(irrigationResponse.data);

            // Then get water usage with the predicted irrigation type - using the correct field name
            const waterData = {
                Soil_Type: data.Soil_Type,
                "Rainfall (mm)": Number(data["Rainfall (mm)"]),
                "Temperature (°C)": Number(data["Temperature (°C)"]),
                "Area(ha)": Number(data["Area(ha)"]),
                Crop: data.Crop,
                Season: data.Season,
                // Make sure this field name matches exactly what the backend expects
                Irrigation_Type: irrigationResponse.data.predicted_irrigation_type
            };
            
            console.log("Sending water usage data:", waterData);
            const waterResponse = await axios.post('https://farmai-backend.onrender.com/waterusage', waterData);
            setWaterResult(waterResponse.data);
        } catch (error) {
            console.error('Error details:', error.response?.data);
            alert('Error getting predictions: ' + (error.response?.data?.detail || 'Unknown error'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Irrigation & Water Usage Analysis</h1>
            <div className={styles.form}>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                    valueAsNumber: true
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
                            'Get Analysis'
                        )}
                    </button>
                </form>
            </div>

            {(irrigationResult || waterResult) && (
                <div className={styles.results}>
                    {irrigationResult && (
                        <div className={styles.resultSection}>
                            <h2>Recommended Irrigation Type:</h2>
                            <div className={styles.prediction}>
                                <h3>{irrigationResult.predicted_irrigation_type.toUpperCase()}</h3>
                                <p>Confidence: {irrigationResult.confidence.toFixed(2)}%</p>
                            </div>
                        </div>
                    )}
                    
                    {waterResult && (
                        <div className={styles.resultSection}>
                            <h2>Predicted Water Usage:</h2>
                            <div className={styles.prediction}>
                                <h3>{waterResult.predicted_water_usage.toFixed(2)} liters</h3>
                                <p>For {waterResult.area_hectares} hectares of land</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default IrrigationWater;