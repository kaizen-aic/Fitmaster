import React, { useState, useEffect } from 'react';
import './Leaderboard.css';
import Home from './Home';
import HomeButton from "./HomeButton.jsx";

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({ name: '', weightLost: '', goalsCompleted: '' });

  const fetchEntries = async () => {
    const response = await fetch('http://127.0.0.1:5000/api/leaderboard');
    const data = await response.json();
    setEntries(data.leaderboard);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:5000/api/leaderboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      setFormData({ name: '', weightLost: '', goalsCompleted: '' });
      fetchEntries();
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://127.0.0.1:5000/api/leaderboard/${id}`, { method: 'DELETE' });
    if (response.ok) fetchEntries();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>Fitness Leaderboard</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="weightLost"
          placeholder="Weight Lost (kg)"
          value={formData.weightLost}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="goalsCompleted"
          placeholder="Goals Completed"
          value={formData.goalsCompleted}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Entry</button>
      </form>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            <h3>{entry.name}</h3>
            <p>Weight Lost: {entry.weightLost} kg</p>
            <p>Goals Completed: {entry.goalsCompleted}</p>
            <button onClick={() => handleDelete(entry.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <HomeButton />
      </div>
    </div>
  );
};

export default Leaderboard;
