import {createContext, useState, useEffect, ReactNode} from "react";

// Define the shape of the preference structure
interface Preference {
  genre: Record<string, number>;
  author: Record<string, number>;
}

// Define the shape of the context state
interface AppContextProps {
  authToken: string | null;
  theme: "dark" | "light";
  preference: Preference | null;
  setAuthToken: (token: string | null) => void;
  toggleTheme: () => void;
  addPreference: (genreName: string, authorId: string, score: number) => void;
}

// Create the context with default values
const AppContext = createContext<AppContextProps>({
  authToken: null,
  theme: "dark",
  preference: null,
  setAuthToken: () => {},
  toggleTheme: () => {},
  addPreference: () => {},
});

// Create the provider component
export const AppProvider = ({children}: {children: ReactNode}) => {
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

  const addPreference = (genreName: string, authorId: string, score: number) => {
    setPreference((prevPreference) => {
      if (!prevPreference) return {genre: {[genreName]: score}, author: {[authorId]: score}};

      const updatedPreference: Preference = {
        genre: {
          ...prevPreference.genre,
          [genreName]: (prevPreference.genre[genreName] || 0) + score,
        },
        author: {
          ...prevPreference.author,
          [authorId]: (prevPreference.author[authorId] || 0) + score, // Use authorId here
        },
      };
      localStorage.setItem("preference", JSON.stringify(updatedPreference));
      return updatedPreference;
    });
  };

  // Decay preference scores logarithmically every 5 minutes
  //   useEffect(() => {
  //     const decayInterval = setInterval(() => {
  //       setPreference((prevPreference) => {
  //         if (!prevPreference) return prevPreference;

  //         const decayedPreference: Preference = {
  //           genre: Object.fromEntries(
  //             Object.entries(prevPreference.genre).map(([key, value]) => [
  //               key,
  //               Math.max(0, value - Math.log(value + 1)),
  //             ])
  //           ),
  //           author: Object.fromEntries(
  //             Object.entries(prevPreference.author).map(([key, value]) => [
  //               key,
  //               Math.max(0, value - Math.log(value + 1)),
  //             ])
  //           ),
  //         };

  //         localStorage.setItem("preference", JSON.stringify(decayedPreference));
  //         return decayedPreference;
  //       });
  //     }, 1000 * 60 * 5); // 5 minutes

  //     return () => clearInterval(decayInterval);
  //   }, []);

  return (
    <AppContext.Provider
      value={{
        authToken,
        theme,
        preference,
        setAuthToken,
        toggleTheme,
        addPreference,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
