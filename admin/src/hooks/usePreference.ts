import { useContext, useEffect, useCallback } from "react";
import AppContext, {
    AppContextProps,
    Preference,
} from "../context/AppContextProvider";

const usePreference = () => {
    const { preference, setPreference } =
        useContext<AppContextProps>(AppContext);

    // Update preference in localStorage
    useEffect(() => {
        console.log(preference);
    }, [preference]);

    // Add preference and update localStorage
    const addPreference = useCallback(
        (genreName: string, authorId: string, score: number) => {
            setPreference((prevPreference: Preference | null) => {
                const updatedPreference: Preference = {
                    genre: {
                        ...(prevPreference?.genre || {}),
                        [genreName]:
                            (prevPreference?.genre[genreName] || 0) + score,
                    },
                    author: {
                        ...(prevPreference?.author || {}),
                        [authorId]:
                            (prevPreference?.author[authorId] || 0) + score,
                    },
                };

                localStorage.setItem(
                    "preference",
                    JSON.stringify(updatedPreference)
                );
                return updatedPreference;
            });
        },
        [setPreference]
    );

    // Decay preference scores logarithmically every 5 minutes
    useEffect(() => {
        const decayInterval = setInterval(() => {
            setPreference((prevPreference) => {
                if (!prevPreference) return prevPreference;

                const decayedPreference: Preference = {
                    genre: Object.fromEntries(
                        Object.entries(prevPreference.genre).map(
                            ([key, value]) => [
                                key,
                                Math.max(0, value - Math.log(value + 1)),
                            ]
                        )
                    ),
                    author: Object.fromEntries(
                        Object.entries(prevPreference.author).map(
                            ([key, value]) => [
                                key,
                                Math.max(0, value - Math.log(value + 1)),
                            ]
                        )
                    ),
                };

                localStorage.setItem(
                    "preference",
                    JSON.stringify(decayedPreference)
                );
                return decayedPreference;
            });
        }, 1000 * 60 * 5); // 5 minutes

        return () => clearInterval(decayInterval);
    }, [setPreference]);

    return {
        addPreference,
    };
};

export default usePreference;
