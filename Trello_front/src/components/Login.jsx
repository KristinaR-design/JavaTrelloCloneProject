import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Login.css';
import axios from 'axios';
axios.defaults.withCredentials = true
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

            const formData = new FormData();
            formData.append('username', userName);
            formData.append('password', password);


            const response = await axios.post(
                'http://localhost:8080/api/auth/login', // Ваш Spring Boot endpoint
                {
                    login: userName, // Spring Security ожидает 'username' вместо 'name'
                    password: password
                },
                {
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  withCredentials: true
                }
              );

            console.log(response.data)
            if (response.status != 200) {
                setError("Login failed");
                return;
            }
            else{
                localStorage.setItem("user_id", response.data);
                navigate("/main");
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
            const response = await axios.post(
                'http://localhost:8080/api/auth/register', // Ваш Spring Boot endpoint
                {
                    login: userName, // Spring Security ожидает 'username' вместо 'name'
                    password: password
                },
                {
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }
              );
            
            console.log(response.status)

            if (response.status == 200) {
                setIsRegistering(false);

            } else {
                setError("Registration failed..");
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
