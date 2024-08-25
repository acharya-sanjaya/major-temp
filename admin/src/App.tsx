import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import useAuth from "./hooks/useAuth";
import useTheme from "./hooks/useTheme";
import BeforeAuth from "./pages/BeforeAuth";

const App = () => {
    const { isAuth } = useAuth();
    const { theme } = useTheme();

    useEffect(() => {
        document.body.classList.add(`${theme}`);

        return () => {
            document.body.classList.remove(`${theme}`);
        };
    }, [theme]);

    if (!isAuth) {
        return <BeforeAuth />;
    }

    return (
        <div className="relative min-h-dvh font-mono">
            <MainContent />
            <Sidebar />
            <Navbar />
        </div>
    );
};

export default App;
