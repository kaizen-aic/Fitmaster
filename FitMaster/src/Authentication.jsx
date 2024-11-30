import { useState } from "react";

function Authentication() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(true);

    const handleAuthentication = async () => {
        const endpoint = isLoggingIn ? "/api/login" : "/api/signup";
        const payload = { email, password };
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (err) {
            alert(`Network error: ${err.message}`);
        }
    };

    return (
        <div className="authentication-container">
            <h3>{isLoggingIn ? "Log In" : "Sign Up"}</h3>
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
            <button onClick={handleAuthentication}>
                {isLoggingIn ? "Log In" : "Sign Up"}
            </button>
            <button onClick={() => setIsLoggingIn(!isLoggingIn)}>
                {isLoggingIn ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
            </button>
        </div>
    );
}

export default Authentication;
