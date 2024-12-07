import React, { useState, useEffect } from "react";
import HomeButton from "./HomeButton.jsx";

function CommunityBoard() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const response = await fetch("http://127.0.0.1:5000/api/posts");
        const data = await response.json();
        setPosts(data.posts);
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();

        if (!newPost.trim()) {
            setMessage("Post content cannot be empty.");
            return;
        }

        const response = await fetch("http://127.0.0.1:5000/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: newPost }),
        });

        if (response.ok) {
            setMessage("Your post has been published!");
            setNewPost("");
            fetchPosts();
        } else {
            const error = await response.json();
            setMessage(`Error: ${error.message}`);
        }

        setTimeout(() => setMessage(""), 3000); // Clear the message after 3 seconds
    };

    return (
        <div className="container">
            <h2>Community Board</h2>
            {message && <div className="message">{message}</div>}

            <form onSubmit={handlePostSubmit} className="post-form">
                <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share your thoughts or updates..."
                ></textarea>
                <button type="submit">Post</button>
            </form>

            <ul className="post-list">
                {posts.map((post, index) => (
                    <li key={index} className="post-item">
                        {post.content}<strong> Date and Time:</strong> {post.date_created} 
                    </li>
                ))}
            </ul>
            <div style={{marginTop: '20px'}}>
                <HomeButton/>
            </div>
        </div>
    );
}

export default CommunityBoard;
