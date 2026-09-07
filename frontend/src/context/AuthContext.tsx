import { createContext, useContext, useState, type ReactNode } from "react";
import Cookies from "js-cookie";
import type { IAuthContext } from "../interfaces";

interface IProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider = ({ children }: IProps) => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Cookies.get('token') ? true : false
  })

  const checkAuth = () => {
    const token = Cookies.get('token');

    if (!token) {
      setIsAuthenticated(false);
      return false
    } else {
      setIsAuthenticated(true);
      return true
    }
  }

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, checkAuth }} >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export default AuthProvider;