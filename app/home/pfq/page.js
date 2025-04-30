'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import styles from './page.module.css';

// Constants matching the model's encoded values
const CROP_TYPES = [
    { value: "peas", label: "Peas" },
    { value: "sugarcane", label: "Sugarcane" },
    { value: "cotton", label: "Cotton" },
    { value: "wheat", label: "Wheat" },
    { value: "maize", label: "Maize" },
    { value: "rice", label: "Rice" },
    { value: "tomato", label: "Tomato" },
    { value: "onion", label: "Onion" },
    { value: "barley", label: "Barley" },
    { value: "potato", label: "Potato" }
];

const SEASONS = [
    { value: "zaid", label: "Zaid" },
    { value: "kharif", label: "Kharif" },
    { value: "rabi", label: "Rabi" }
];

const SOIL_TYPES = [
    { value: "clay", label: "Clay" },
    { value: "peaty", label: "Peaty" },
    { value: "sandy", label: "Sandy" },
    { value: "loamy", label: "Loamy" },
    { value: "silty", label: "Silty" }
];


const IRRIGATION_TYPES = [
    { value: "manual", label: "Manual" },
    { value: "flood", label: "Flood" },
    { value: "drip", label: "Drip" },
    { value: "rain-fed", label: "Rain-fed" },
    { value: "sprinkler", label: "Sprinkler" }
];

export default function PFQForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.post('https://farmai-backend.onrender.com/pfq', {
                Crop_Type: data.Crop_Type,
                Season: data.Season,
                Soil_Type: data.Soil_Type,
                Temperature: Number(data.Temperature),
                Humidity: Number(data.Humidity),
                Rainfall: Number(data.Rainfall),
                PH: Number(data.PH),
                "Yield(Tons)": Number(data["Yield(Tons)"]),
                Irrigation_Type: data.Irrigation_Type
            });
            setResult(response.data);
            console.log('Prediction Result:', response.data);
        } catch (error) {
            console.error('Error:', error);
            alert('Error getting prediction: ' + (error.response?.data?.detail || 'Unknown error'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Pesticide/Fertilizer Quality Prediction</h1>
            <div className={styles.form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.grid}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Crop Type</label>
                            <select
                                className={styles.input}
                                {...register('Crop_Type', { required: "Crop type is required" })}
                            >
                                <option value="">Select Crop</option>
                                {CROP_TYPES.map(crop => (
                                    <option key={crop.value} value={crop.value}>
                                        {crop.label}
                                    </option>
                                ))}
                            </select>
                            {errors.Crop_Type && <p className={styles.error}>{errors.Crop_Type.message}</p>}
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
                            {errors.Soil_Type && <p className={styles.error}>{errors.Soil_Type.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Temperature (°C)</label>
                            <input
                                type="number"
                                step="0.1"
                                className={styles.input}
                                placeholder="e.g., 29"
                                {...register('Temperature', { 
                                    required: "Temperature is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Temperature must be positive" }
                                })}
                            />
                            {errors.Temperature && <p className={styles.error}>{errors.Temperature.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Humidity (%)</label>
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="e.g., 78"
                                {...register('Humidity', { 
                                    required: "Humidity is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Humidity must be positive" },
                                    max: { value: 100, message: "Humidity cannot exceed 100%" }
                                })}
                            />
                            {errors.Humidity && <p className={styles.error}>{errors.Humidity.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Rainfall (mm)</label>
                            <input
                                type="number"
                                step="0.1"
                                className={styles.input}
                                placeholder="e.g., 120"
                                {...register('Rainfall', { 
                                    required: "Rainfall is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Rainfall must be positive" }
                                })}
                            />
                            {errors.Rainfall && <p className={styles.error}>{errors.Rainfall.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>pH Level</label>
                            <input
                                type="number"
                                step="0.1"
                                className={styles.input}
                                placeholder="e.g., 6.5"
                                {...register('PH', { 
                                    required: "pH is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "pH must be positive" },
                                    max: { value: 14, message: "pH cannot exceed 14" }
                                })}
                            />
                            {errors.PH && <p className={styles.error}>{errors.PH.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Yield (Tons)</label>
                            <input
                                type="number"
                                step="0.1"
                                className={styles.input}
                                placeholder="e.g., 5"
                                {...register('Yield(Tons)', { 
                                    required: "Yield is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Yield must be positive" }
                                })}
                            />
                            {errors['Yield(Tons)'] && <p className={styles.error}>{errors['Yield(Tons)'].message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Irrigation Type</label>
                            <select
                                className={styles.input}
                                {...register('Irrigation_Type', { required: "Irrigation type is required" })}
                            >
                                <option value="">Select Irrigation Type</option>
                                {IRRIGATION_TYPES.map(type => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                            {errors.Irrigation_Type && <p className={styles.error}>{errors.Irrigation_Type.message}</p>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={styles.button}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className={styles.loader}>Processing...</div>
                        ) : (
                            'Get Prediction'
                        )}
                    </button>
                </form>
            </div>

        

{result && (
    <div className={styles.results}>
        <div className={styles.resultSection}>
            <h2>Prediction Results:</h2>
            <div className={styles.prediction}>
                <div className={styles.predictionItem}>
                    <h3>Fertilizer Usage</h3>
                    <p>{Math.max(0, result.predicted_fertilizer_usage_tons).toFixed(4)} tons</p>
                </div>
                <div className={styles.predictionItem}>
                    <h3>Pesticide Usage</h3>
                    <p>{result.predicted_pesticide_usage_kg.toFixed(4)} kg</p>
                </div>
            </div>
        </div>
    </div>
)}
        </div>
    );
}