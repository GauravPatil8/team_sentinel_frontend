"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Check, FileText, Printer, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

import { usePrintRequest } from "@/lib/printRequestContext";
import axios from "axios";

const { getSharedDocuments } = usePrintRequest()
const API_BASE_URL = "http://localhost:5000";
// Mock data for the request
const mockRequest = {
  customerName: "John Doe",
  status: "pending", // pending, approved, printed
  filesInfo: [
    {
      id: 1,
      name: "Invoice-2023.pdf",
      pages: 5,
      copies: 2,
      size: "1.2 MB",
    },
    {
      id: 2,
      name: "Receipt.pdf",
      pages: 2,
      copies: 1,
      size: "0.5 MB",
    },
  ],
  pages: 7,
  createdAt: "2023-12-20T10:30:00Z",
  expiresAt: "2023-12-21T10:30:00Z",
}

// Mock printers
const mockPrinters = [
  { id: "printer1", name: "HP LaserJet Pro" },
  { id: "printer2", name: "Epson WorkForce" },
  { id: "printer3", name: "Canon PIXMA" },
]

export default function ShareRequestPage() {
    
    const { toast } = useToast()
    const { requestId } = useParams() as { requestId: string }
    const [request, setRequest] = useState(mockRequest)
    const [printMode, setPrintMode] = useState("bw")
    const [selectedPrinter, setSelectedPrinter] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [timeLeft, setTimeLeft] = useState("")
    
  useEffect(()=> {
    async function fetchPrintRequests() {
        try {
          const data = await getSharedDocuments(requestId);
          setRequest(data);
          console.log(data)
        } catch (error) {
          console.error("Error fetching print requests:", error);
        }
      }
      fetchPrintRequests();
  }, []);

  useEffect(() => {
    
    const calculateTimeLeft = () => {
      const expiresAt = new Date(request.expiresAt).getTime()
      const now = Date.now()
      const difference = expiresAt - now
      console.log(difference)
      if (difference > 0) {
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        setTimeLeft(`${hours}h ${minutes}m`)
      } else {
        setTimeLeft("Expired")
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [request.expiresAt])

  const handleRequestAccess = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setRequest({
        ...request,
        status: "Approved",
      })
      setIsLoading(false)
      toast({
        title: "Access granted",
        description: "You can now print these documents",
      })
    }, 1500)
  }

  const handlePrint = async () => {
    if (!selectedPrinter) {
      toast({
        title: "No printer selected",
        description: "Please select a printer to continue",
        variant: "destructive",
      })
      return
    }
  
    setIsLoading(true)
  
    try {
      // Simulate an API call for printing
      const response = await axios.post(`${API_BASE_URL}/api/print`, {
        requestId,
        printer: selectedPrinter,
        printMode,
      })
  
      if (response.data.success) {
        setRequest((prev) => ({ ...prev, status: "printed" }))
        toast({
          title: "Documents printed",
          description: "The documents have been sent to the printer",
        })
      } else {
        toast({
          title: "Printing failed",
          description: "Something went wrong, please try again",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Printing error:", error)
      toast({
        title: "Printing error",
        description: "Failed to send the print job",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Sentinel</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Secure Document Printing</span>
          </div>
        </div>
      </header>
      <main className="container flex-1 py-8">
        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Print Request By {request.customerName} </CardTitle>
                <CardDescription>
                  Request Id : {requestId}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">Status</div>
                <div
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                    request.status === "printed"
                      ? "bg-green-100 text-green-800"
                      : request.status === "approved"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {request.status === "printed"
                    ? "Printed"
                    : request.status === "approved"
                      ? "Ready to Print"
                      : "Awaiting Approval"}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-3 text-lg font-medium">Document Details</h3>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 gap-4 border-b bg-muted p-4 font-medium">
                  <div>File Name</div>
                  <div>Pages</div>
                  <div>Copies</div>
                  <div>Size</div>
                </div>
                {request.filesInfo.map((file) => (
                  <div key={file.id} className="grid grid-cols-4 gap-4 border-b p-4 last:border-0">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{file.name}</span>
                    </div>
                    <div>{file.pages}</div>
                    <div>{file.copies}</div>
                    <div>{file.size}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">Print Information</h3>
              <div className="space-y-3 rounded-md border p-4">
                <div className="grid grid-cols-2">
                  <div className="text-sm font-medium">Total Pages:</div>
                  <div>{request.pages}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="text-sm font-medium">Link Expires:</div>
                  <div>{timeLeft}</div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-lg font-medium">Print Settings</h3>
                <div className="space-y-4 rounded-md border p-4">
                  <div className="space-y-2">
                    <Label htmlFor="print-mode">Print Mode</Label>
                    <Select value={printMode} onValueChange={setPrintMode} disabled={request.status === "printed"}>
                      <SelectTrigger id="print-mode">
                        <SelectValue placeholder="Select print mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bw">Black & White</SelectItem>
                        <SelectItem value="color">Color</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="printer">Printer</Label>
                    <Select
                      value={selectedPrinter}
                      onValueChange={setSelectedPrinter}
                      disabled={request.status === "printed" || request.status === "pending"}
                    >
                      <SelectTrigger id="printer">
                        <SelectValue placeholder="Select printer" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockPrinters.map((printer) => (
                          <SelectItem key={printer.id} value={printer.id}>
                            {printer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="flex justify-between p-6">
            <div className="text-sm text-muted-foreground">This link will expire after printing or in {timeLeft}</div>
            {request.status === "Pending" ? (
              <Button onClick={handleRequestAccess} disabled={isLoading}>
                {isLoading ? "Processing..." : "Request Access"}
              </Button>
            ) : request.status === "Approved" ? (
              <Button onClick={handlePrint} disabled={isLoading || !selectedPrinter}>
                <Printer className="mr-2 h-4 w-4" />
                {isLoading ? "Printing..." : "Print Documents"}
              </Button>
            ) : (
              <Button disabled className="bg-green-600 hover:bg-green-700">
                <Check className="mr-2 h-4 w-4" />
                Printed Successfully
              </Button>
            )}
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

