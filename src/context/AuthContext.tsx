"use client";
import axiosInstance from "@/utils/axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { API_ENDPOINTS } from "@/utils/const/api-endpoints";
import { User } from "@/utils/types/user";
import { SignInData, SignUpData, } from "@/utils/types/auth";
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  fetchUser: () => void;
  signUp: ({
    sur_name,
    last_name,
    email,
    password,
    confirmPassword,
  }: SignUpData) => Promise<void>;
  signIn: ({ email, password }: SignInData) => Promise<void>;
  signOut: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);   
  const router = useRouter();

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(`${API_ENDPOINTS.CORPARATE_PROFILE_ME}`);
      
      if (res.data && res.data.data) {
        setUser(res.data.data);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        router.push('/signin');
      }
    } catch (error) {
      console.error("Check auth status failed:", error);
      setIsAuthenticated(false);
      setUser(null);
      router.push('/signin');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signUp = async (data: SignUpData) => {
    setIsLoading(true);
    try {
      await axiosInstance.post(API_ENDPOINTS.CORPARATE_SIGNUP, {
        sur_name: data.sur_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        contact: data.contact,
        employee_count: data.employee_count,
      });
      router.push("/pending");
      console.log("signup form :::::::::::", data);
    } catch (error) {
      console.error("Sign up failed:", error);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (data: SignInData) => {
    // setIsLoading(true);
    try {
      await axiosInstance.post(API_ENDPOINTS.CORPARATE_SIGNIN, {
        email: data.email,
        password: data.password,
      });
      const res = await axiosInstance.get(API_ENDPOINTS.CORPARATE_PROFILE_ME);
      setUser(res.data.data);
      setIsAuthenticated(true);
      router.push("/dashboard/chart");
    } catch (error) {
      console.log("Sign in failed:", error);
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      throw error;
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.post(API_ENDPOINTS.SIGN_OUT);
      setIsAuthenticated(false);
      setUser(null);
      router.push("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
      setUser(null);
      router.push("/signin");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        fetchUser,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
