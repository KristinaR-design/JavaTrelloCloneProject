import React, { createContext, useState, useContext, useEffect } from "react";
import "../css/Theme.css";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMod, setIsDarkMod] = useState(() => {
        const savedTheme = localStorage.getItem("Theme");
        return savedTheme ? JSON.parse(savedTheme) : true;
    });

    const toggleTheme = () => {
        const newTheme = !isDarkMod;
        setIsDarkMod(newTheme);
        localStorage.setItem("Theme", JSON.stringify(newTheme));
    };

    useEffect(() => {
        if (isDarkMod) {
            document.body.classList.add("dark-mode");
            document.body.classList.remove("light-theme");
        } else {
            document.body.classList.add("light-theme");
            document.body.classList.remove("dark-mode");
        }
    }, [isDarkMod]);

    return (
        <ThemeContext.Provider value={{ isDarkMod, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
