import React, { useState } from 'react';
import axios from 'axios';
import HomeButton from "./HomeButton.jsx";
import "./BMICalculator.css"

axios.defaults.baseURL = 'http://127.0.0.1:5000';

const BMICalculator = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [error, setError] = useState(null);

    const calculateBMI = async () => {
        setError(null); // Clear any previous errors
        setBmi(null);   // Clear previous result
        try {
            const response = await axios.post('/api/calculate-bmi', {
                height: parseFloat(height),
                weight: parseFloat(weight),
            });
            setBmi(response.data.bmi);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <div className="container">
            <h2 className="title">BMI Calculator</h2>
            <div>
                <label>
                    <label htmlFor="height">Height (in):</label>
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder=""
                        className="input-field"
                    />
                </label>
            </div>
            <div>
                <label>
                    Weight (lb.):
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder=""
                        className="input-field"
                    />
                </label>
            </div>
            <button onClick={calculateBMI}>Calculate BMI</button>
            <div>
                <label>
                    Calculated BMI:
                    <input
                        type="text"
                        value={bmi}
                        readOnly
                        placeholder="BMI will be displayed here"
                    />
                </label>
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div style={{ marginTop: '20px'}}>
                <HomeButton />
            </div>
        </div>


    );
};

export default BMICalculator;
