import {useContext} from "react";
import AppContext from "../context/AppContextProvider";

const useAuth = () => {
  const {authToken, setAuthToken} = useContext(AppContext);

  const isAuth = !!authToken;

  const login = (token: string) => {
    setAuthToken(token);
  };

  const logout = () => {
    setAuthToken(null);
  };

  return {isAuth, authToken, login, logout};
};

export default useAuth;
