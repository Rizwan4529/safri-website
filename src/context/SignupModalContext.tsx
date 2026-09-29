import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import SignupModal from "../components/ui/SignupModal";

type SignupModalContextValue = {
  isOpen: boolean;
  openSignupModal: () => void;
  closeSignupModal: () => void;
};

const SignupModalContext = createContext<SignupModalContextValue | null>(null);

export const SignupModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openSignupModal = useCallback(() => setIsOpen(true), []);
  const closeSignupModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openSignupModal, closeSignupModal }),
    [isOpen, openSignupModal, closeSignupModal],
  );

  return (
    <SignupModalContext.Provider value={value}>
      {children}
      <SignupModal />
    </SignupModalContext.Provider>
  );
};

export const useSignupModal = () => {
  const ctx = useContext(SignupModalContext);
  if (!ctx) {
    throw new Error("useSignupModal must be used within SignupModalProvider");
  }
  return ctx;
};
