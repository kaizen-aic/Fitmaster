import React, { useState, useEffect } from "react";
import HomeButton from "./HomeButton.jsx";

function HealthData() {
    const [healthRecords, setHealthRecords] = useState([]);
    const [formData, setFormData] = useState({
        weight: "",
        heartRate: "",
        fitnessGoal: "",
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchHealthData();
    }, []);

    const fetchHealthData = async () => {
        const response = await fetch("http://127.0.0.1:5000/api/health");
        const data = await response.json();
        setHealthRecords(data.records);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://127.0.0.1:5000/api/health", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            setMessage("Health data submitted successfully!");
            setFormData({ weight: "", heartRate: "", fitnessGoal: "" });
            fetchHealthData();
        } else {
            const error = await response.json();
            setMessage(`Error: ${error.message}`);
        }

        setTimeout(() => setMessage(""), 3000);
    };

    return (
        <div className="container">
            <h2>Health Data Input</h2>
            {message && <div className="message">{message}</div>}

            <form onSubmit={handleFormSubmit} className="health-form">
                <div>
                    <label>Weight (kg):</label>
                    <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Heart Rate (bpm):</label>
                    <input
                        type="number"
                        name="heartRate"
                        value={formData.heartRate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Fitness Goal:</label>
                    <input
                        type="text"
                        name="fitnessGoal"
                        value={formData.fitnessGoal}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>

            <h3>Health Records</h3>
            <ul className="health-records">
                {healthRecords.map((record, index) => (
                    <li key={index}>
                        <strong>Weight:</strong> {record.weight} kg, <strong>Heart Rate:</strong>{" "}
                        {record.heart_rate} bpm, <strong>Goal:</strong> {record.fitness_goal}
                    </li>
                ))}
            </ul>
            <div style={{marginTop: '20px'}}>
                <HomeButton/>
            </div>
        </div>
    );
}

export default HealthData;
