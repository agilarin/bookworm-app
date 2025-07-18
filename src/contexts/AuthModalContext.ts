import { createContext, useContext } from "react";

export interface AuthModalContextValue {
  open: boolean;
  onToggle: () => void;
  onOpen: () => void;
  onClose: () => void;
}

export const AuthModalContext = createContext<AuthModalContextValue>({
  open: false,
  onOpen: () => {},
  onClose: () => {},
  onToggle: () => {},
});

export const useAuthModal = () => useContext(AuthModalContext);
