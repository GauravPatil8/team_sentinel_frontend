"use client";

import { createContext, useContext, type ReactNode } from "react";
import axios from "axios";
import { shopApi } from "@/lib/api"; // ✅ Import shop API for fetching nearby shops

const API_BASE_URL = "http://localhost:5000/api";

interface PrintRequestContextType {
  createPrintRequest: (
    data: {
      customerId: string;
      shopkeeperId?: string;
      filesInfo: {
        id: number;
        name: string;
        data: Buffer; // Base64 or encrypted data
        pages: number;
        size: string;
        copies: number;
      }[];
      pages: string;
      expiresAt: Date;
    },
    token: string
  ) => Promise<any>;

  getShopPrintRequests: (shopId: string, token: string) => Promise<any>;
  getUserPrintRequests: (userId: string, token: string) => Promise<any>;
  getShareLink: (requestId: string, token: string) => Promise<any>;
  getSharedDocuments: (requestId: string) => Promise<any>;
  getNearbyShops: (location: { lat: number; lng: number }, token: string) => Promise<any>; // ✅ Added function for fetching nearby shops
}

const PrintRequestContext = createContext<PrintRequestContextType | undefined>(undefined);

export const PrintRequestProvider = ({ children }: { children: ReactNode }) => {
  
  const createPrintRequest = async (
    data: {
      customerId: string;
      shopkeeperId?: string;
      filesInfo: {
        id: number;
        name: string;
        data: Buffer; // Base64 or encrypted data
        pages: number;
        size: string;
        copies: number;
      }[];
      pages: string;
      expiresAt: Date;
    },
    token: string
  ) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/print-requests`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return await response.data;
    } catch (error) {
      console.error("Create print request error:", error);
      throw error;
    }
  };

  const getShopPrintRequests = async (shopId: string, token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/print-requests/shop/${shopId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return await response.json();
    } catch (error) {
      console.error("Get shop print requests error:", error);
      throw error;
    }
  };

  const getUserPrintRequests = async (userId: string, token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/print-requests/user/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return await response.json();
    } catch (error) {
      console.error("Get user print requests error:", error);
      throw error;
    }
  };

  const getShareLink = async (requestId: string, token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/print-requests/share/${requestId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return await response.json();
    } catch (error) {
      console.error("Get share link error:", error);
      throw error;
    }
  };

  const getSharedDocuments = async (requestId: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/share/${requestId}`, {
        withCredentials: true,  
      });
      if  (!response) throw new Error("No Request Found");

      return await response.data;
    } catch (error) {
      console.error("Error in shared documents:", error);
      throw error;
    }
  };

  // ✅ Added function to fetch nearby shops
  const getNearbyShops = async (location: { lat: number; lng: number }, token: string) => {
    return await shopApi.getNearbyShops(location, token);
  };

  return (
    <PrintRequestContext.Provider
      value={{
        createPrintRequest,
        getShopPrintRequests,
        getUserPrintRequests,
        getShareLink,
        getSharedDocuments,
        getNearbyShops, // ✅ Added this function
      }}
    >
      {children}
    </PrintRequestContext.Provider>
  );
};

// Export the custom hook for using the context
export function usePrintRequest() {
  const context = useContext(PrintRequestContext);
  if (context === undefined) {
    throw new Error("PrintRequestContext must be used within a PrintRequestProvider");
  }
  return context;
}
