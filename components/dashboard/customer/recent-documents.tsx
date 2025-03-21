"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { List, Grid, Filter, Printer, Trash, Download, MoreHorizontal } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { printRequestApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription } from "@/components/ui/alert";
import crypto from "crypto";
import io from "socket.io-client";
let encryptedBuffer: Buffer;
let customerPublicKey: string;
let shop_Id: string;
import { aesKey, iv } from "./upload-dialog";
const socket = io("http://localhost:5000", {
  transports: ["websocket"], // Force WebSocket transport
  reconnectionAttempts: 5,   // Try reconnecting 5 times
  timeout: 5000              // Set timeout for connection
});

socket.on("connect", () => {
  console.log("Connected to WebSocket server!");
});
const ecdh = crypto.createECDH("secp256k1");
ecdh.generateKeys();
customerPublicKey = ecdh.getPublicKey().toString("base64");

interface PrintRequest {
  _id: string;
  fileNames: string[];
  createdAt: string;
  copies: number;
  status: "Pending" | "Approved" | "Printed";
}

interface RecentDocumentsProps {
  viewMode: "list" | "grid";
  setViewMode: React.Dispatch<React.SetStateAction<"list" | "grid">>;
}

export function RecentDocuments({ viewMode, setViewMode }: RecentDocumentsProps) {
  const [documents, setDocuments] = useState<{ all: PrintRequest[]; pending: PrintRequest[]; printed: PrintRequest[] }>({
    all: [],
    pending: [],
    printed: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  
  useEffect(() => {
    if (user) {
      fetchDocuments();
    }
  }, [user]);

  const fetchDocuments = async () => {
    if (!user) return;
  
    setIsLoading(true);
    setError(null);
  
    try {
      console.log("Fetching documents for user:", user.id);
    
      const response = await printRequestApi.getUserPrintRequests(user.id, user.token);
      console.log("API Response:", response);
    
      if (!Array.isArray(response)) { 
        console.error("Unexpected API Response:", response);
        setError("Unexpected API Response");
        return;
      }
    
      const pendingDocs = response.filter((doc: PrintRequest) => doc.status !== "Printed");
      const printedDocs = response.filter((doc: PrintRequest) => doc.status === "Printed");
    
      setDocuments({ all: response, pending: pendingDocs, printed: printedDocs });
    } catch (err) {
      console.error("Fetch Documents Error:", err);
      setError("Failed to fetch documents. Please try again.");
    } finally {
      setIsLoading(false);
    }
    
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

  return (
    <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Recent Documents</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setViewMode("list")} className={viewMode === "list" ? "bg-muted" : ""}>
            <List className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setViewMode("grid")} className={viewMode === "grid" ? "bg-muted" : ""}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="printed">Printed</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {documents.all.length === 0 ? <NoDocumentsMessage type="all" /> : <DocumentList documents={documents.all} viewMode={viewMode} />}
        </TabsContent>

        <TabsContent value="pending">
          {documents.pending.length === 0 ? <NoDocumentsMessage type="pending" /> : <DocumentList documents={documents.pending} viewMode={viewMode} />}
        </TabsContent>

        <TabsContent value="printed">
          {documents.printed.length === 0 ? <NoDocumentsMessage type="printed" /> : <DocumentList documents={documents.printed} viewMode={viewMode} />}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

interface DocumentListProps {
  documents: PrintRequest[];
  viewMode: "list" | "grid";
}

function DocumentList({ documents, viewMode }: DocumentListProps) {
  return viewMode === "grid" ? (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {documents.map((doc) => (
        <DocumentCard key={doc._id} doc={doc} />
      ))}
    </div>
  ) : (
    <div className="space-y-2">
      {documents.map((doc) => (
        <DocumentCard key={doc._id} doc={doc} />
      ))}
    </div>
  );
}

interface DocumentCardProps {
  doc: PrintRequest;
}

function DocumentCard({ doc }: DocumentCardProps) {

  

  return (
    <Card key={doc._id} className="hover:shadow-md transition-shadow">
      <CardHeader>
        {/* <CardTitle>{doc.fileNames?.[0] || "Untitled Document"}</CardTitle> */}
        <CardDescription>Uploaded {new Date(doc.createdAt).toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Badge className={doc.status === "Printed" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}>
          {doc.status === "Printed" ? "Printed" : "Pending"}
        </Badge>
        


        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              Download
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Printer className="mr-2 h-4 w-4" />
              Print Again
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}

interface NoDocumentsMessageProps {
  type: "all" | "pending" | "printed";
}

function NoDocumentsMessage({ type }: NoDocumentsMessageProps) {
  const messages = {
    all: "Upload a document to get started.",
    pending: "You have no pending documents.",
    printed: "You have no printed documents.",
  };
  return (
    <div className="rounded-md border p-8 text-center">
      <h3 className="mt-4 text-lg font-medium">{messages[type]}</h3>
    </div>
  );
}
