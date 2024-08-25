import {jwtDecode} from "jwt-decode";
import useAuth from "./useAuth";

// Define the shape of the decoded token
interface DecodedToken {
  id: string;
  role: string;
  email: string;
  fullName: string;
  proExpiry?: Date;
  iat?: number;
  exp?: number;
  profileImageUrl: string;
}

// Custom hook to get the current user information
const useCurrentUser = () => {
  const {authToken} = useAuth();

  if (!authToken) {
    return null;
  }

  try {
    const decoded: DecodedToken = jwtDecode(authToken);
    return decoded;
  } catch (error) {
    console.error("Failed to decode auth token:", error);
    return null;
  }
};

export default useCurrentUser;
