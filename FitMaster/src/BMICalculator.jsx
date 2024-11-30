import React, { useState } from 'react';
import axios from 'axios';

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
        <div>
            <h2>BMI Calculator</h2>
            <div>
                <label>
                    Height (in.):
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder=""
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
        </div>
    );
};

export default BMICalculator;
