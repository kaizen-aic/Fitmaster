// import { useState } from "react";
//
// function Authentication() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [isLoggingIn, setIsLoggingIn] = useState(true);
//
//     const handleAuthentication = async () => {
//         const endpoint = isLoggingIn ? "/api/login" : "/api/signup";
//         const payload = { email, password };
//         try {
//             const response = await fetch(endpoint, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(payload),
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 alert(data.message);
//             } else {
//                 alert(`Error: ${data.message}`);
//             }
//         } catch (err) {
//             alert(`Network error: ${err.message}`);
//         }
//     };
//
//     return (
//         <div className="authentication-container">
//             <h3>{isLoggingIn ? "Log In" : "Sign Up"}</h3>
//             <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             <button onClick={handleAuthentication}>
//                 {isLoggingIn ? "Log In" : "Sign Up"}
//             </button>
//             <button onClick={() => setIsLoggingIn(!isLoggingIn)}>
//                 {isLoggingIn ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
//             </button>
//         </div>
//     );
// }
//

// export default Authentication;
import React, { useState } from 'react';
import axios from 'axios';

function Authentication() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isTrainer, setIsTrainer] = useState(false);
    const [message, setMessage] = useState("");

    const handleSignup = async () => {
        try {
            const response = await axios.post('/api/signup', {
                email: email,
                password: password,
                fitnessTrainer: isTrainer,
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/login', {
                email: email,
                password: password,
            });
            setMessage(response.data.message);
            if (response.data.redirect_url) {
                window.location.href = response.data.redirect_url;
            }
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Authentication Page</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <label>
                <input
                    type="checkbox"
                    checked={isTrainer}
                    onChange={(e) => setIsTrainer(e.target.checked)}
                />
                I am a Fitness Trainer
            </label>
            <button onClick={handleSignup}>Sign Up</button>
            <button onClick={handleLogin}>Log In</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Authentication;
