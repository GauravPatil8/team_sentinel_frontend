"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { ShopkeeperDashboardHeader } from "@/components/dashboard/shopkeeper/dashboard-header";
import { ShopkeeperSidebar } from "@/components/dashboard/shopkeeper/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define the type for shop data
type ShopDataType = {
  id: string;
  name: string;
  email: string;
  shopName: string;
  address: string;
  services: string[];
  location: { coordinates: [number, number] };
};

export default function ShopProfile() {
  const [shopData, setShopData] = useState<ShopDataType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setShopData({
        id: user.id || "N/A",
        name: user.name || "N/A",
        email: user.email || "N/A",
        shopName: user.shopName || "My Print Shop",
        address: user.address || "123 Main St, City, State",
        services: user.services ?? ["Color Printing", "Black & White Printing", "Document Scanning"],
        location: user.location ?? { coordinates: [0, 0] },
      });
      setIsLoading(false);
    }
  }, [user]);

  return (
    <div className="flex min-h-screen flex-col">
      <ShopkeeperDashboardHeader />

      <div className="flex flex-1">
        <ShopkeeperSidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container py-6">
            <motion.div
              className="mb-8 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold">Shop Profile</h1>
              <p className="text-muted-foreground">Manage your shop details and settings</p>
            </motion.div>

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card className="overflow-hidden">
                    <CardHeader className="bg-primary/5">
                      <CardTitle>Shop Information</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <Label htmlFor="shopName">Shop Name</Label>
                        <Input id="shopName" value={shopData?.shopName ?? ""} readOnly className="mt-1 bg-muted" />
                      </div>
                      <div>
                        <Label htmlFor="ownerName">Owner Name</Label>
                        <Input id="ownerName" value={shopData?.name ?? ""} readOnly className="mt-1 bg-muted" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={shopData?.email ?? ""} readOnly className="mt-1 bg-muted" />
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" value={shopData?.address ?? ""} readOnly className="mt-1 bg-muted" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden mt-6">
                    <CardHeader className="bg-primary/5">
                      <CardTitle>Services Offered</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ul className="space-y-2">
                        {shopData?.services.map((service, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-5 w-5 text-green-500"
                            >
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                            {service}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="overflow-hidden">
                    <CardHeader className="bg-primary/5">
                      <CardTitle>Shop Location</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="bg-muted h-64 rounded-md flex items-center justify-center">
                        <p className="text-muted-foreground">Map will be displayed here</p>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground">
                          Coordinates: {shopData?.location.coordinates[0]}, {shopData?.location.coordinates[1]}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden mt-6">
                    <CardHeader className="bg-primary/5">
                      <CardTitle>Account Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-2">
                      <Button className="w-full">Edit Profile</Button>
                      <Button variant="outline" className="w-full">
                        Change Password
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
