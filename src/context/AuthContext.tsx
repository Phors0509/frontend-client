"use client";
import axiosInstance from "@/utils/axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { API_ENDPOINTS } from "@/utils/const/api-endpoints";
import { User } from "@/utils/types/user";
import { SignInData, SignUpData, VerifyCodeData } from "@/utils/types/auth";
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  fetchUser: () => void;
  signUp: ({
    sur_name,
    last_name,
    email,
    phone_number,
    password,
  }: SignUpData) => Promise<void>;
  verifyCode: ({ email, phone_number, code }: VerifyCodeData) => Promise<void>;
  signIn: ({ email, phone_number, password }: SignInData) => Promise<void>;
  signOut: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(
        `${API_ENDPOINTS.CORPARATE_PROFILE_ME}`
      );
      setUser(res.data.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Check auth status failed:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const signUp = async (data: SignUpData) => {
    setIsLoading(true);
    try {
      await axiosInstance.post(`${API_ENDPOINTS.CORPARATE_SIGNUP}`, {
        sur_name: data.sur_name,
        last_name: data.last_name,
        email: data.email,
        phone_number: data.phone_number,
        password: data.password,
      });
      router.push(
        `/verify?contact=${data.email || data.phone_number}&method=${data.email ? "email" : "phone_number"}`
      );
    } catch (error) {
      console.error("Sign up failed:", error);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async (data: VerifyCodeData) => {
    setIsLoading(true);
    try {
      await axiosInstance.post(API_ENDPOINTS.CORPARATE_VERIFY, {
        [data.email ? "email" : "phone_number"]:
          data.email || data.phone_number,
        code: data.code,
      });
      router.push("/signin");
    } catch (error) {
      console.error("Verify code failed:", error);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (data: SignInData) => {
    setIsLoading(true);
    try {
      await axiosInstance.post(API_ENDPOINTS.CORPARATE_SIGNIN, data);
      const res = await axiosInstance.get(API_ENDPOINTS.CORPARATE_PROFILE_ME);
      setUser(res.data.data);
      setIsAuthenticated(true);
      router.push("/dashboard");
    } catch (error) {
      console.error("Sign in failed:", error);

      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
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
        verifyCode,
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
