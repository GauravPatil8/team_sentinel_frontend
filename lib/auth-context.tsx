"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { authApi } from "@/lib/api"

type User = {
  _id?: string
  location: { coordinates: number[] }
  services: string[]
  address: string
  id: string
  name: string
  email: string
  role: "customer" | "shopkeeper"
  shopName?: string
  token: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  error: string | null
  customerLogin: (email: string, password: string) => Promise<void>
  customerSignup: (name: string, email: string, password: string) => Promise<void>
  shopkeeperLogin: (email: string, password: string) => Promise<void>
  shopkeeperSignup: (data: {
    name: string
    email: string
    password: string
    shopName: string
    address?: string
    services?: string[]
    location?: number[]
  }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])
  const customerLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await authApi.customerLogin({ email, password });
  
      if (response.error) {
        setError(response.error);
        return;
      }
  
      const userData: User = {
        _id: response._id, // ✅ Ensure _id is included
        id: response.id,
        name: response.name,
        email: response.email,
        role: "customer",
        token: response.token,
        location: response.location || { coordinates: [0, 0] }, 
        services: response.services || [], 
        address: response.address || "N/A", 
      };
  
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      router.push("/dashboard/customer");
    } catch (err) {
      setError("Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const customerSignup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await authApi.customerSignup({ name, email, password });
  
      // FIX: Handle error returned by API properly
      if (response?.error) {
        console.error("Signup failed:", response.error);
        setError(response.error);
        return;  // ✅ Stop execution if there's an error
      }
  
      console.log("Signup successful:", response);
  
      const userData: User = {
        _id: response._id,
        id: response.id,
        name: response.name,
        email: response.email,
        role: "customer",
        token: response.token,
        location: response.location || { coordinates: [0, 0] },
        services: response.services || [],
        address: response.address || "N/A",
      };
      
  
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      router.push("/dashboard/customer");
    } catch (err: any) {
      console.error("Unexpected Signup error:", err.message);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  

  const shopkeeperLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await authApi.shopkeeperLogin({ email, password });
  
      if (response.error) {
        setError(response.error);
        return;
      }
  
      const userData: User = {
        _id: response._id, 
        id: response.id,
        name: response.name,
        email: response.email,
        role: "shopkeeper",
        shopName: response.shopName,
        token: response.token,
        location: response.location || { coordinates: [0, 0] }, // ✅ Default location
        services: response.services || [], // ✅ Default empty array
        address: response.address || "N/A", // ✅ Default value
      };
  
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      router.push("/dashboard/shopkeeper");
    } catch (err) {
      setError("Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  

  const shopkeeperSignup = async (data: {
    name: string
    email: string
    password: string
    shopName: string
    address?: string
    services?: string[]
    location?: number[]
  }) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await authApi.shopkeeperSignup(data)

      if (response.error) {
        setError(response.error)
        return
      }

      const userData : User = {
        _id: response._id, 
        id: response.id,
        name: response.name,
        email: response.email,
        role: "shopkeeper",
        shopName: response.shopName,
        token: response.token,
        location: response.location || { coordinates: [0, 0] }, // ✅ Default location
        services: response.services || [], // ✅ Default empty array
        address: response.address || "N/A", // ✅ Default value
      };

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      router.push("/login")
    } catch (err) {
      setError("Failed to sign up. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        customerLogin,
        customerSignup,
        shopkeeperLogin,
        shopkeeperSignup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
