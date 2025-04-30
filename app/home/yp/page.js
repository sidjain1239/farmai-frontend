'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
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

   
// First, update the onSubmit function to properly log and handle the response


const onSubmit = async (data) => {
    setIsLoading(true);
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
        alert('Error getting prediction: ' + (error.response?.data?.detail || 'Unknown error'));
    } finally {
        setIsLoading(false);
    }
};

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Crop Yield Prediction</h1>
            <div className={styles.form}>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                            'Predict Yield'
                        )}
                    </button>
                </form>
            </div>

            {/* // Then, update the result display section */}
            {result && (
    <div className={styles.results}>
        <div className={styles.resultSection}>
            <h2>Predicted Yield:</h2>
            <div className={styles.prediction}>
                <h3>
                    {result.predicted_crop_yield 
                        ? `${Number(result.predicted_crop_yield).toFixed(2)} tons/hectare`
                        : 'Calculation error'}
                </h3>
                <p className={styles.resultDetails}>
                    Total yield: {result.predicted_crop_yield 
                        ? (Number(result.predicted_crop_yield) * Number(result.area)).toFixed(2)
                        : 'Calculation error'} tons
                </p>
            </div>
        </div>
    </div>
)}
        </div>
    );
}




// Update the result display section
