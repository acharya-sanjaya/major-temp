import {useEffect} from "react";
import Navbar from "./pages/afterAuth/Navbar";
import useAuth from "./hooks/useAuth";
import useTheme from "./hooks/useTheme";
import BeforeAuth from "./pages/BeforeAuth";
import Books from "./pages/afterAuth/books/Books";
import {Navigate, Route, Routes} from "react-router-dom";
import BookDescription from "./pages/afterAuth/books/BookDescription";
import Favourites from "./pages/afterAuth/Favourites";

const App = () => {
  const {isAuth} = useAuth();
  const {theme} = useTheme();

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
      <div className="mt-16 p-4 pl-2">
        <Routes>
          <Route path="/" element={<Navigate to="/books" replace />} />
          <Route path="/home" element={<Navigate to="/books" replace />} />
          <Route path="/dashboard" element={<Navigate to="/books" replace />} />
          <Route path="/books" element={<Books />} />
          <Route path="/favourites" element={<Favourites />} />
          {/* <Route path="/reservations" element={<Reservations />} /> */}
          <Route path="/book-description" element={<>Book not found</>} />
          <Route path="/book-description/:id" element={<BookDescription />} />
          {/* <Route path="/burrows" element={<Burrows />} /> */}
          {/* <Route path="/payments" element={<Payments />} /> */}
          <Route path="*" element={<>Page not found</>} />
        </Routes>
      </div>
      <Navbar />
    </div>
  );
};

export default App;
