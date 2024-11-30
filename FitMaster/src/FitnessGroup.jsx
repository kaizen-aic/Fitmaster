import React, { useState, useEffect } from 'react';

function FitnessGroups() {
    const [groups, setGroups] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        const response = await fetch("http://127.0.0.1:5000/api/groups");
        const data = await response.json();
        setGroups(data.groups);
    };

    const joinGroup = async (groupName) => {
        const response = await fetch("http://127.0.0.1:5000/api/join_group", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ groupName }),
        });

        if (response.ok) {
            setMessage(`You successfully joined the group: ${groupName}`);
        } else {
            const error = await response.json();
            setMessage(`Error: ${error.message}`);
        }

        setTimeout(() => setMessage(''), 3000); // Clear the message after 3 seconds
    };

    return (
        <div className="container">
            <h2>Available Fitness Groups</h2>
            {message && <div className="message">{message}</div>}
            <ul className="group-list">
                {groups.map((group, index) => (
                    <li key={index} className="group-item">
                        <span>{group.name}</span>
                        <button onClick={() => joinGroup(group.name)}>Join</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FitnessGroups;
