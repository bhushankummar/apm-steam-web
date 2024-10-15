import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthUserType } from "@crema/types/models/AuthUser";

type FirebaseContextProps = {
  user: AuthUserType | null | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

export type SignInProps = {
  email: string;
  password: string;
};

type FirebaseActionsProps = {
  registerUserWithEmailAndPassword: (data: SignUpProps) => void;
  logInWithEmailAndPassword: (data: SignInProps) => void;
  logInWithPopup: (type: string) => void;
  logout: () => void;
};

const FirebaseContext = createContext<FirebaseContextProps>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
});
const FirebaseActionsContext = createContext<FirebaseActionsProps>({
  registerUserWithEmailAndPassword: () => {},
  logInWithEmailAndPassword: () => {},
  logInWithPopup: () => {},
  logout: () => {},
});

export const useFirebase = () => useContext(FirebaseContext);
// export const useMicrosoftAzure = () => useContext(FirebaseContext);
export const useFirebaseActions = () => useContext(FirebaseActionsContext);

interface FirebaseAuthProviderProps {
  children: ReactNode;
  fetchStart: () => void;
  fetchSuccess: () => void;
  fetchError: (data: string) => void;
}

const FirebaseAuthProvider: React.FC<FirebaseAuthProviderProps> = ({
  children,
  fetchStart,
  fetchSuccess,
  fetchError,
}) => {
  const [firebaseData, setFirebaseData] = useState<FirebaseContextProps>({
    user: { email: "test@example.com" } as AuthUserType, // Mock user data
    isLoading: false,
    isAuthenticated: true, // Mock authenticated state
  });

  // Simulate successful user state on mount
  useEffect(() => {
    fetchStart();
    setFirebaseData({
      user: { email: "test@example.com" } as AuthUserType, // Mock user
      isAuthenticated: true,
      isLoading: false,
    });
    fetchSuccess();
  }, []);

  // Simulate login with email and password
  const logInWithEmailAndPassword = async ({ email, password }: SignInProps) => {
    fetchStart();
    try {
      // Simulating successful login with mock user data
      setFirebaseData({
        user: { email } as AuthUserType, // Mocked email
        isAuthenticated: true,
        isLoading: false,
      });
      fetchSuccess();
    } catch (error: any) {
      setFirebaseData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      fetchError("Login failed");
    }
  };

  // Simulate registration with email and password
  const registerUserWithEmailAndPassword = async ({
    name,
    email,
    password,
  }: SignUpProps) => {
    fetchStart();
    try {
      // Simulating successful registration
      setFirebaseData({
        user: { email, displayName: name } as AuthUserType, // Mocked user data
        isAuthenticated: true,
        isLoading: false,
      });
      fetchSuccess();
    } catch (error: any) {
      setFirebaseData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      fetchError("Registration failed");
    }
  };

  // Simulate social login with provider
  const logInWithPopup = async (providerName: string) => {
    fetchStart();
    try {
      // Simulating successful login
      setFirebaseData({
        user: { email: "socialuser@example.com" } as AuthUserType, // Mocked user data
        isAuthenticated: true,
        isLoading: false,
      });
      fetchSuccess();
    } catch (error: any) {
      setFirebaseData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      fetchError("Social login failed");
    }
  };

  // Simulate logout
  const logout = async () => {
    setFirebaseData({ ...firebaseData, isLoading: true });
    try {
      // Simulating successful logout
      setFirebaseData({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error: any) {
      setFirebaseData({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      fetchError("Logout failed");
    }
  };

  return (
    <FirebaseContext.Provider value={{ ...firebaseData }}>
      <FirebaseActionsContext.Provider
        value={{
          logInWithEmailAndPassword,
          registerUserWithEmailAndPassword,
          logInWithPopup,
          logout,
        }}
      >
        {children}
      </FirebaseActionsContext.Provider>
    </FirebaseContext.Provider>
  );
};

export default FirebaseAuthProvider;
