import {useContext} from "react";
import AppContext from "../context/AppContextProvider";

const useTheme = () => {
  const {theme, toggleTheme} = useContext(AppContext);
  return {theme, toggleTheme};
};

export default useTheme;
