'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
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
    { value: "Sugarcane", label: "Sugarcane" },  // Note: Capital 'S'
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

    const onSubmit = async (data) => {
        setIsLoading(true);
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
            alert('Failed to get recommendation: ' + (error.response?.data?.detail || 'Unknown error'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Fertilizer Recommendation</h1>
            <div className={styles.form}>
                <form onSubmit={handleSubmit(onSubmit)}>
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

                        {/* Numeric inputs remain the same */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Temperature (°C)</label>
                            <input
                                type="number"
                                step="0.01"
                                className={styles.input}
                                {...register('Temperature', { required: true, valueAsNumber: true })}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Humidity (%)</label>
                            <input
                                type="number"
                                className={styles.input}
                                {...register('Humidity', { required: true, valueAsNumber: true })}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Moisture</label>
                            <input
                                type="number"
                                className={styles.input}
                                {...register('Moisture', { required: true, valueAsNumber: true })}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Nitrogen</label>
                            <input
                                type="number"
                                className={styles.input}
                                {...register('Nitrogen', { required: true, valueAsNumber: true })}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Phosphorous</label>
                            <input
                                type="number"
                                className={styles.input}
                                {...register('Phosphorous', { required: true, valueAsNumber: true })}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Potassium</label>
                            <input
                                type="number"
                                className={styles.input}
                                {...register('Potassium', { required: true, valueAsNumber: true })}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Rainfall (mm)</label>
                            <input
                                type="number"
                                className={styles.input}
                                {...register('Rainfall', { required: true, valueAsNumber: true })}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>pH Level</label>
                            <input
                                type="number"
                                step="0.1"
                                className={styles.input}
                                {...register('PH', { required: true, valueAsNumber: true })}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Carbon</label>
                            <input
                                type="number"
                                className={styles.input}
                                {...register('Carbon', { required: true, valueAsNumber: true })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={styles.button}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Get Recommendation'}
                    </button>
                </form>
            </div>

            {result && (
                <div className={styles.results}>
                    <h2>Recommended Fertilizer:</h2>
                    <div className={styles.prediction}>
                        <h3>{result.predicted_fertilizer}</h3>
                        {result.remark && <p>{result.remark}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}