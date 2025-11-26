import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined" && localStorage.getItem("theme")) {
            return localStorage.getItem("theme");
        }
        return "light";
    });


    useEffect(() => {
        const root = window.document.documentElement;
        const isDark = theme === "dark";


        root.classList.remove(isDark ? "light" : "dark");


        if (isDark) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }


        localStorage.setItem("theme", theme);
    }, [theme]);


    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    const isDarkMode = theme === "dark";

    return (
        <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};