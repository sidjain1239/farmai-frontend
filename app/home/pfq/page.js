'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
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
    const [error, setError] = useState(null);

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError(null);
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
                Pesticide & Fertilizer Planning
            </motion.h1>
            
            <motion.p
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={styles.subtitle}
            >
                Calculate optimal quantities of pesticides and fertilizers for maximum efficiency
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
                    </div>

                    <div className={styles.sectionTitle}>Environmental Factors</div>
                    <div className={styles.grid}>
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
                    </div>

                    <div className={styles.sectionTitle}>Soil & Yield Information</div>
                    <div className={styles.grid}>
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
                            <label className={styles.label}>Expected Yield (Tons)</label>
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

                    <motion.button
                        type="submit"
                        className={styles.button}
                        disabled={isLoading}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isLoading ? (
                            <div className={styles.loader}>Calculating optimal quantities...</div>
                        ) : (
                            'Calculate Requirements'
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

{/* // Replace the results section with this code: */}

{result && (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
            margin: '2rem auto',
            padding: '1.5rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            maxWidth: '900px'
        }}
    >
        <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{ width: '100%' }}
        >
            <h2 style={{
                fontSize: '1.8rem',
                color: '#2c3e50',
                marginBottom: '1.5rem',
                textAlign: 'center',
                fontWeight: '600'
            }}>Recommended Quantities</h2>
            
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                justifyContent: 'center',
                marginBottom: '2rem'
            }}>
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    style={{
                        flex: '1 0 300px',
                        padding: '1.5rem',
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                        textAlign: 'center'
                    }}
                >
                    <h3 style={{ color: '#3498db', marginBottom: '1rem' }}>Fertilizer Required</h3>
                    <p style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        color: '#2ecc71',
                        margin: '0.5rem 0'
                    }}>{Math.max(0, result.predicted_fertilizer_usage_tons).toFixed(4)} tons</p>
                    <p style={{
                        fontSize: '0.9rem',
                        color: '#7f8c8d',
                        marginTop: '0.75rem'
                    }}>Apply in multiple small doses throughout the growing season</p>
                </motion.div>
                
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    style={{
                        flex: '1 0 300px',
                        padding: '1.5rem',
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                        textAlign: 'center'
                    }}
                >
                    <h3 style={{ color: '#e74c3c', marginBottom: '1rem' }}>Pesticide Required</h3>
                    <p style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        color: '#e67e22',
                        margin: '0.5rem 0'
                    }}>{result.predicted_pesticide_usage_kg.toFixed(4)} kg</p>
                    <p style={{
                        fontSize: '0.9rem',
                        color: '#7f8c8d',
                        marginTop: '0.75rem'
                    }}>Use appropriate safety measures when applying pesticides</p>
                </motion.div>
            </div>
            
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{
                    backgroundColor: '#ffffff',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    marginTop: '1.5rem'
                }}
            >
                <h3 style={{ 
                    color: '#2c3e50', 
                    marginBottom: '1rem',
                    borderBottom: '2px solid #f0f0f0',
                    paddingBottom: '0.5rem'
                }}>Best Practices</h3>
                <ul style={{ 
                    paddingLeft: '1.25rem',
                    color: '#555',
                    lineHeight: '1.6'
                }}>
                    <li>Apply fertilizer at cooler times of day to reduce nutrient loss</li>
                    <li>Consider split applications for more efficient nutrient uptake</li>
                    <li>Use targeted pesticide application to minimize environmental impact</li>
                    <li>Adjust based on soil test results and plant health monitoring</li>
                </ul>
            </motion.div>
        </motion.div>
    </motion.div>
)}
        </motion.div>
    );
}