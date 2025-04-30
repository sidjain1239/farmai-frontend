'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import styles from './page.module.css';

// Constants from your dataset
const SOIL_TYPES = [
    { value: "loamy", label: "Loamy" },
    { value: "sandy", label: "Sandy" },
    { value: "clayey", label: "Clayey" },
    { value: "red", label: "Red" }
];

const SEASONS = [
    { value: "kharif", label: "Kharif" },
    { value: "rabi", label: "Rabi" },
    { value: "zaid", label: "Zaid" }
];

export default function AgriAnalyticsForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [results, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
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
            alert('Error getting analytics: ' + (error.response?.data?.detail || 'Unknown error'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Agricultural Analytics</h1>
            <p className={styles.subtitle}>Get comprehensive farming recommendations with a single analysis</p>
            
            <div className={styles.form}>
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

                    <button
                        type="submit"
                        className={styles.button}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className={styles.loader}>Analyzing...</div>
                        ) : (
                            'Get Complete Analysis'
                        )}
                    </button>
                </form>
            </div>

            {results && (
    <div className={styles.resultsContainer}>
        <h2 className={styles.resultsTitle}>Agricultural Analytics Results</h2>
        
        {/* Crop Recommendation */}
        {results.crop_recommendation && (
            <div className={styles.resultCard}>
                <h3 className={styles.cardTitle}>Crop Recommendation</h3>
                <div className={styles.cardContent}>
                    <p className={styles.highlight}>{results.crop_recommendation.crop || 'Data not available'}</p>
                    <p>Confidence: {results.crop_recommendation.confidence?.toFixed(2) || 'N/A'}%</p>
                </div>
            </div>
        )}
        
        {/* Irrigation Type */}
        {results.irrigation_type && (
            <div className={styles.resultCard}>
                <h3 className={styles.cardTitle}>Irrigation System</h3>
                <div className={styles.cardContent}>
                    <p className={styles.highlight}>{results.irrigation_type.predicted_irrigation_type || 'Data not available'}</p>
                    <p>Confidence: {results.irrigation_type.confidence?.toFixed(2) || 'N/A'}%</p>
                </div>
            </div>
        )}
        
        {/* Water Usage */}
        <div className={styles.resultCard}>
            <h3 className={styles.cardTitle}>Water Usage</h3>
            <div className={styles.cardContent}>
                <p className={styles.highlight}>
                    {results.water_usage?.predicted_water_usage 
                        ? `${results.water_usage.predicted_water_usage.toFixed(2)} liters`
                        : 'Data not available'}
                </p>
                <p>Estimated water requirement for your farm</p>
            </div>
        </div>
        
        {/* Fertilizer Recommendation */}
        <div className={styles.resultCard}>
            <h3 className={styles.cardTitle}>Fertilizer Recommendation</h3>
            <div className={styles.cardContent}>
                <p className={styles.highlight}>
                    {results.fertilizer_recommendation?.predicted_fertilizer || 'Data not available'}
                </p>
                <p>{results.fertilizer_recommendation?.remark || ''}</p>
            </div>
        </div>
        
        {/* Crop Yield */}
        {results.crop_yield && (
            <div className={styles.resultCard}>
                <h3 className={styles.cardTitle}>Expected Yield</h3>
                <div className={styles.cardContent}>
                    <p className={styles.highlight}>
                        {results.crop_yield.predicted_crop_yield
                            ? `${results.crop_yield.predicted_crop_yield.toFixed(2)} tons`
                            : 'Data not available'}
                    </p>
                    <p>Estimated total yield for your farm</p>
                </div>
            </div>
        )}
        
        {/* Fertilizer & Pesticide Quantity */}
        {results.fertilizer_pesticide_quantity && !results.fertilizer_pesticide_quantity.error && (
            <div className={styles.resultCard}>
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
            </div>
        )}
        
        {/* Error Display */}
        {results.error && (
            <div className={styles.errorCard}>
                <h3>Error</h3>
                <p>{results.error}</p>
            </div>
        )}
    </div>
)}
        </div>
    );
}
