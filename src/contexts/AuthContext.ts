import { User } from "firebase/auth";
import { createContext } from "react";

interface AuthContextType {
  // isSuccess: boolean;
  user: User | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
});
