import React, { useState, useEffect } from 'react';
import './TrainerFeedback.css';
import {useNavigate} from "react-router-dom";

const TrainerHomeButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/TrainerHome');
  };

  return (
    <button onClick={handleClick}>
      Go to Home Page
    </button>
  );
};

const TrainerFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({ userId: '', message: '' });

  useEffect(() => {
    // Fetch existing feedbacks from the API
    fetch('/api/feedback')
      .then((response) => response.json())
      .then((data) => setFeedbacks(data.feedbacks));
  }, []);

  const handleInputChange = (e) => {
    setNewFeedback({ ...newFeedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFeedback),
    })
      .then((response) => response.json())
      .then((data) => {
        setFeedbacks([...feedbacks, data.feedback]);
        setNewFeedback({ userId: '', message: '' });
      });
  };

  const handleDelete = (id) => {
    fetch(`/api/feedback/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then(() => setFeedbacks(feedbacks.filter((fb) => fb.id !== id)));
  };

  return (
    <div className="trainer-feedback-wrapper">
      <h2>Fitness Trainer Feedback</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userId"
          value={newFeedback.userId}
          onChange={handleInputChange}
          placeholder="User ID"
          required
        />
        <textarea
          name="message"
          value={newFeedback.message}
          onChange={handleInputChange}
          placeholder="Feedback message"
          required
        />
        <button type="submit">Submit Feedback</button>
      </form>
      <ul>
        {feedbacks.map((feedback) => (
          <li key={feedback.id}>
            <strong>User {feedback.userId}</strong>: {feedback.message}
            <button onClick={() => handleDelete(feedback.id)}>Delete</button>
          </li>
        ))}
      </ul>
        <div>
            <TrainerHomeButton/>
        </div>
    </div>
  );
};

export default TrainerFeedback;
