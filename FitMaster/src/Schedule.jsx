import React, { useState, useEffect } from 'react';
import './Schedule.css';

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', time: '' });

  const fetchSchedule = async () => {
    const response = await fetch('http://127.0.0.1:5000/api/schedule');
    const data = await response.json();
    setSchedule(data.schedules);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:5000/api/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      setFormData({ title: '', description: '', time: '' });
      fetchSchedule();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  return (
    <div>
      <h2>Schedule</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Schedule</button>
      </form>
      <ul>
        {schedule.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>{item.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schedule;
