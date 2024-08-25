import {useContext} from "react";
import AppContext from "../context/AppContextProvider";

const usePreference = () => {
  const {addPreference, preference} = useContext(AppContext);

  return {addPreference, preference};
};

export default usePreference;
