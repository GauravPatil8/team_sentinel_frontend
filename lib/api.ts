// Base URL for API requests
const API_BASE_URL = "http://localhost:5000/api"
import axios from "axios";
import { Buffer } from "buffer"; 
// Authentication APIs
export const authApi = {
  // Customer authentication
  customerSignup: async (data: { name: string; email: string; password: string }) => {
    console.log("Customer Signup function called");
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup/customer`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });
      console.log(response.data)
      return response.data; 
    } catch (error: any) {
      console.error("Customer signup error:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || "Signup failed. Please try again.");
    }
  },
  


  customerLogin: async (data: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login/customer`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Customer login error:", error)
      throw error
    }
  },

  // Shopkeeper authentication
  shopkeeperSignup: async (data: {
    name: string
    email: string
    password: string
    shopName: string
    address?: string
    services?: string[]
    location?: number[]
  }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup/shopkeeper`, data ,{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      })

      return response.data
    } catch (error) {
      console.error("Shopkeeper signup error:", error)
      throw error
    }
  },

  shopkeeperLogin: async (data: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login/shopkeeper`, data,{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      })

      return response.data
    } catch (error) {
      console.error("Shopkeeper login error:", error)
      throw error
    }
  },
}

// Print Request APIs
export const printRequestApi = {
  // Create a new print request
  createPrintRequest: async (
    data: {
      customerId: string;
      shopkeeperId?: string;
      encryptedFiles: ArrayBuffer[];
      fileNames: string[];
      pages: string;
      copies: number;
      aesKey: string;
      aesIv: string;
    },
    token: string
  ) => {
    try {
      // ✅ Convert encrypted files to Base64 before sending
      const encryptedFilesBase64 = data.encryptedFiles.map((file) =>
        Buffer.from(file).toString("base64")
      );

      const response = await axios.post(
        `${API_BASE_URL}/print-requests`,
        {
          ...data,
          encryptedFiles: encryptedFilesBase64, // ✅ Send as Base64
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Create print request error:", error);
      throw error;
    }
  },

  // Get print requests for a shop
  getShopPrintRequests: async (shopId: string, token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/print-requests/shop/${shopId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return await response.json()
    } catch (error) {
      console.error("Get shop print requests error:", error)
      throw error
    }
  },

  // Get print requests for a user
  getUserPrintRequests: async (userId: string, token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/print-requests/user/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return await response.json()
    } catch (error) {
      console.error("Get user print requests error:", error)
      throw error
    }
  },

 // Get share link for a print request
 getShareLink: async (requestId: string, token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/print-requests/share/${requestId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return await response.json()
  } catch (error) {
    console.error("Get share link error:", error)
    throw error
  }
},

  getSharedDocuments: async (requestId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/share/${requestId}`);
    
    if (response.data && response.data.encryptedFiles) {
      // Ensure the response contains encrypted files
      return response.data.encryptedFiles.map((file: string) =>
        Buffer.from(file, "base64").toString("utf-8") // Convert Base64 to UTF-8 for frontend processing
      );
    }
    
    return response.data;
  } catch (error) {
    console.error("Error fetching shared documents:", error);
    throw error;
  }
},


}


// Shop APIs
export const shopApi = {
  getNearbyShops: async (location: { lat: number; lng: number }, token: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/nearby-shops?lat=${location.lat}&lng=${location.lng}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Get nearby shops error:", error);
      throw error;
    }
  },
};


// Document history APIs
export const documentApi = {
  // Get document history for a user
  getDocumentHistory: async (userId: string, token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/documents/history/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return await response.json()
    } catch (error) {
      console.error("Get document history error:", error)
      throw error
    }
  },
}
