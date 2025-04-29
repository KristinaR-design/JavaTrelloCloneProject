import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Login.css';

const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isRegistering, setIsRegistering] = useState(false); // Статус регистрации
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!userName || !password) {
            setError("Username and password are required");
            return;
        }

        try {
            const response = await fetch(
                `https://67ebb2deaa794fb3222b4541.mockapi.io/login/v1/login?name=${userName}&password=${password}`
            );
            const data = await response.json();

            if (!response.ok) {
                setError("Login failed");
                return;
            }

            if (data.length === 0) {
                setError("Invalid username or password");
                return;
            }

            if (data.length > 0) {
                // localStorage.setItem("user", JSON.stringify(data[0]));
                localStorage.setItem("user_id", data[0].id);
                navigate("/main");
            } else {
                setError("Invalid username or password");
            }
        } catch (error) {
            setError("Login failed");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (!userName || !password) {
            setError("Username and password are required");
            return;
        }

        try {
            const response = await fetch(
                `https://67ebb2deaa794fb3222b4541.mockapi.io/login/v1/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: userName,
                        password: password,
                    }),
                }
            );

            if (response.ok) {
                setIsRegistering(false);

            } else {
                setError("Registration failed");
            }
        } catch (error) {
            setError("Registration failed");
        }
    };

    return (
        <div className="login-container">
            <h2>{isRegistering ? "Register" : "Login"}</h2>
            <form onSubmit={isRegistering ? handleRegister : handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">{isRegistering ? "Register" : "Login"}</button>
            </form>

            {error && <p className="error">{error}</p>}

            {/* Кнопка для переключения между логином и регистрацией */}
            <p>
                {isRegistering ? (
                    <span>
                        Already have an account? <a className="reg__b" onClick={() => setIsRegistering(false)}>Login</a>
                    </span>
                ) : (
                    <span>
                        Don't have an account? <a className="reg__b" onClick={() => setIsRegistering(true)} >Register</a>
                    </span>
                )}
            </p>
        </div>
    );
};

export default Login;
