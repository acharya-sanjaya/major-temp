import { createContext, useState, useEffect, ReactNode } from "react";

// Define the shape of the preference structure
export interface Preference {
    genre: Record<string, number>;
    author: Record<string, number>;
}

// Define the shape of the context state
export interface AppContextProps {
    authToken: string | null;
    theme: "dark" | "light";
    preference: Preference | null;
    setAuthToken: (token: string | null) => void;
    toggleTheme: () => void;
    setPreference: (preference: Preference | null) => void;
}

// Create the context with default values
const AppContext = createContext<AppContextProps>({
    authToken: null,
    theme: "dark",
    preference: null,
    setAuthToken: () => {},
    toggleTheme: () => {},
    setPreference: () => {},
});

// Create the provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [authToken, setAuthTokenState] = useState<string | null>(null);
    const [theme, setThemeState] = useState<"dark" | "light">("dark");
    const [preference, setPreference] = useState<Preference | null>(null);

    // Load initial values from localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        const storedTheme = localStorage.getItem("theme") as "dark" | "light";
        const storedPreference = localStorage.getItem("preference");

        if (storedToken) {
            setAuthTokenState(storedToken);
        }

        if (storedTheme) {
            setThemeState(storedTheme);
        } else {
            localStorage.setItem("theme", "dark");
        }

        if (storedPreference) {
            setPreference(JSON.parse(storedPreference));
        }
    }, []);

    // Update localStorage whenever authToken changes
    const setAuthToken = (token: string | null) => {
        if (token) {
            localStorage.setItem("authToken", token);
        } else {
            localStorage.removeItem("authToken");
        }
        setAuthTokenState(token);
    };

    // Toggle theme and update localStorage
    const toggleTheme = () => {
        setThemeState((prevTheme) => {
            const newTheme = prevTheme === "dark" ? "light" : "dark";
            localStorage.setItem("theme", newTheme);
            return newTheme;
        });
    };

    return (
        <AppContext.Provider
            value={{
                authToken,
                theme,
                preference,
                setAuthToken,
                toggleTheme,
                setPreference,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
