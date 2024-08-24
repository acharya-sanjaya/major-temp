import {createContext, useState, useEffect, ReactNode} from "react";

// Define the shape of the context state
interface AppContextProps {
  authToken: string | null;
  theme: "dark" | "light";
  setAuthToken: (token: string | null) => void;
  toggleTheme: () => void;
}

// Create the context with default values
const AppContext = createContext<AppContextProps>({
  authToken: null,
  theme: "dark",
  setAuthToken: () => {},
  toggleTheme: () => {},
});

// Create the provider component
export const AppProvider = ({children}: {children: ReactNode}) => {
  const [authToken, setAuthTokenState] = useState<string | null>(null);
  const [theme, setThemeState] = useState<"dark" | "light">("dark");

  // Load initial values from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedTheme = localStorage.getItem("theme") as "dark" | "light";

    console.log(authToken);

    if (storedToken) {
      setAuthTokenState(storedToken);
    }

    if (storedTheme) {
      setThemeState(storedTheme);
    } else {
      localStorage.setItem("theme", "dark");
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
        setAuthToken,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
