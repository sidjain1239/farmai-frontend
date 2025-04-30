'use client'
import React from 'react'
import { useForm } from 'react-hook-form';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './page.module.css';
import OpenAI from 'openai';


const Cr = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    ;
    const onSubmit = (data) => {
        setIsLoading(true);
        console.log(data);
        axios.post('https://farmai-backend.onrender.com/croprecommendation', data)
            .then(response => {
                console.log(response.data);
                setResult(response.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

      
    
       
    
       
    

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Crop Recommendation</h1>
            <div className={styles.form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="N">Nitrogen (N) (example: 90)</label>
                        <input
                            className={styles.input}
                            type="number"
                            id="N"
                            {...register("N", { required: "Nitrogen value is required", valueAsNumber: true })}
                        />
                        {errors.N && <p className={styles.error}>{errors.N.message}</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="P">Phosphorus (P) (example: 42)</label>
                        <input
                            className={styles.input}
                            type="number"
                            id="P"
                            {...register("P", { required: "Phosphorus value is required", valueAsNumber: true })}
                        />
                        {errors.P && <p className={styles.error}>{errors.P.message}</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="K">Potassium (K) (example: 43)</label>
                        <input
                            className={styles.input}
                            type="number"
                            id="K"
                            {...register("K", { required: "Potassium value is required", valueAsNumber: true })}
                        />
                        {errors.K && <p className={styles.error}>{errors.K.message}</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="temperature">Temperature (°C) (example: 20.87)</label>
                        <input
                            className={styles.input}
                            type="number"
                            step="0.01"
                            id="temperature"
                            {...register("temperature", { required: "Temperature is required", valueAsNumber: true })}
                        />
                        {errors.temperature && <p className={styles.error}>{errors.temperature.message}</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="humidity">Humidity (%) (example: 82.00)</label>
                        <input
                            className={styles.input}
                            type="number"
                            step="0.01"
                            id="humidity"
                            {...register("humidity", { required: "Humidity is required", valueAsNumber: true })}
                        />
                        {errors.humidity && <p className={styles.error}>{errors.humidity.message}</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="ph">pH (example: 6.50)</label>
                        <input
                            className={styles.input}
                            type="number"
                            step="0.01"
                            id="ph"
                            {...register("ph", { required: "pH is required", valueAsNumber: true })}
                        />
                        {errors.ph && <p className={styles.error}>{errors.ph.message}</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="rainfall">Rainfall (mm) (example: 202.93)</label>
                        <input
                            className={styles.input}
                            type="number"
                            step="0.01"
                            id="rainfall"
                            {...register("rainfall", { required: "Rainfall is required", valueAsNumber: true })}
                        />
                        {errors.rainfall && <p className={styles.error}>{errors.rainfall.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className={styles.button}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className={styles.loader}>Loading...</div>
                        ) : (
                            'Get Recommendations'
                        )}
                    </button>
                </form>
            </div>

          
    
    {result && (
        <div className={styles.results}>
            <h2>Recommended Crops:</h2>
            {result.predictions.map((pred, index) => (
                <div key={index} className={styles.prediction}>
                    <h3>#{index + 1}: {pred.crop.charAt(0).toUpperCase() + pred.crop.slice(1)}</h3>
                    <p>Confidence: {pred.confidence.toFixed(2)}%</p>
                </div>
            ))}
            <button 
                onClick={() => setIsChatOpen(true)}
                className={styles.chatButton}
            >
                Ask AI Assistant
            </button>

          
        </div>
    )}
        </div>
    );
}

export default Cr;