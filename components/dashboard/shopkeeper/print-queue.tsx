"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronRight, MoreHorizontal, Download, CheckCircle, X, Printer, Shield } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { printRequestApi } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";


interface PrintRequest {
  _id: string;
  fileNames: string[];
  customer?: { name: string };
  pages: number;
  copies: number;
  createdAt: string;
  urgent?: boolean;
  status?: string;
}


interface PrintQueueProps {
  onPrintClick: (printData: {
    id: string;
    name: string;
    customer: string;
    pages: number;
    color: boolean;
    copies: number;
  }) => void;
  showAll?: boolean;
}

export function PrintQueue({ onPrintClick, showAll = false }: PrintQueueProps) {
  const [printRequests, setPrintRequests] = useState<PrintRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      fetchPrintRequests();
    }
  }, [user]);

  const fetchPrintRequests = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await printRequestApi.getShopPrintRequests(user.id, user.token);

      if (response.error) {
        setError(response.error);
        return;
      }

      setPrintRequests(response.printRequests || []);
    } catch (err) {
      setError("Failed to fetch print requests. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateRequestStatus = async (requestId: string, status: string) => {
    setPrintRequests((prevRequests) =>
      prevRequests.map((req) => (req._id === requestId ? { ...req, status } : req))
    );
  };

  const handleViewAll = () => {
    router.push("/dashboard/shopkeeper/queue");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const displayRequests = showAll ? printRequests : printRequests.slice(0, 5);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
      <Card className="mb-8 overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Print Queue</CardTitle>
              <CardDescription>Manage your current print jobs</CardDescription>
            </div>
            {!showAll && (
              <Button variant="outline" size="sm" className="group transition-all hover:shadow-md" onClick={handleViewAll}>
                View All
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {printRequests.length === 0 ? (
            <div className="rounded-md border p-8 text-center">
              <Printer className="h-10 w-10 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No print requests yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">When customers send print requests, they will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {displayRequests.map((request) => (
                <div key={request._id}>{request.fileNames[0]}</div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
