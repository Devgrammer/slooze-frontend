import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  createdAt?: string;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  clearAuth: () => void;
}
interface AuthType {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};



export const AuthProvider =( { children }: AuthType )=>{
     const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

   useEffect(() => {
     const loadUserFromStorage = () => {
       try {
         const savedUser = sessionStorage.getItem("user");
         const token = sessionStorage.getItem("token");

         if (savedUser && token) {
           setUser(JSON.parse(savedUser));
         }
       } catch (error) {
         console.error("Failed to load user from storage:", error);
         setError(JSON.stringify(error))
         sessionStorage.removeItem("user");
         sessionStorage.removeItem("token");
       } finally {
         setIsLoading(false);
       }
     };

     loadUserFromStorage();
  }, []);

    const clearAuth = () => {
      setUser(null);
      setError(null);
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token"); // Also clear token if exists
    };

    const value: AuthContextType = {
    user,
    setUser,
    isLoading,
    setIsLoading,
    error,
    setError,
    clearAuth
  };

  

    return (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}