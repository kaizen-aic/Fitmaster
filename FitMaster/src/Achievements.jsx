// achievements.jsx

import React, { useState, useEffect } from 'react';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch achievements from API using fetch
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/achievements');
        if (!response.ok) {
          throw new Error('Failed to fetch achievements');
        }
        const data = await response.json();
        setAchievements(data.achievements);
      } catch (err) {
        setError('Error fetching achievements');
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  // Update achievement using fetch
  const handleAchieve = async (achievementId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/achievements/${achievementId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ achieved: true }),
      });

      if (!response.ok) {
        throw new Error('Failed to update achievement');
      }

      setAchievements((prevAchievements) =>
        prevAchievements.map((achievement) =>
          achievement.id === achievementId
            ? { ...achievement, achieved: true }
            : achievement
        )
      );
    } catch (err) {
      setError('Error updating achievement');
    }
  };

  if (loading) return <div>Loading achievements...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="achievements-container">
      <h1>Achievements</h1>
      <ul>
        {achievements.map((achievement) => (
          <li key={achievement.id} className={achievement.achieved ? 'achieved' : ''}>
            <h2>{achievement.name}</h2>
            <p>{achievement.milestone}</p>
            <button
              onClick={() => handleAchieve(achievement.id)}
              disabled={achievement.achieved}
            >
              {achievement.achieved ? 'Achieved!' : 'Achieve Now'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Achievements;
