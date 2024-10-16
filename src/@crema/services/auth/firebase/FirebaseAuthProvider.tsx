import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthUserType } from "@crema/types/models/AuthUser";
import { auth } from "./firebase";

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
  
    const getAuthUser = auth.onAuthStateChanged(
      (user) => {
        // Check if idToken exists and is valid
        const idToken = user?.getIdToken(); // Assuming this method retrieves the token
        console.log("Authenticated User:", user, "Auth Token:", idToken);
  
        if (idToken) {
          setFirebaseData({
            user: user as AuthUserType,
            isAuthenticated: true,  // User is valid if idToken exists
            isLoading: false,
          });
        } else {
          setFirebaseData({
            user: null,
            isAuthenticated: false,  // No token means not authenticated
            isLoading: false,
          });
        }
  
        fetchSuccess();
      },
      () => {
        // On error, handle the state update
        fetchSuccess();
        setFirebaseData({
          user: null,
          isAuthenticated: false,  // Explicitly set as not authenticated
          isLoading: false,
        });
      }
    );
  
    return () => {
      getAuthUser(); // Unsubscribe from auth listener
    };
  }, []);  // No need to depend on firebaseData.user
  
  // Simulate login with email and password
  const logInWithEmailAndPassword = async ({ email }: SignInProps) => {
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
  const logInWithPopup = async () => {
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
