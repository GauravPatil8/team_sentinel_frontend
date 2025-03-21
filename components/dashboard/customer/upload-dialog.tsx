"use client"

import { useEffect,useState, useRef, Dispatch, SetStateAction } from "react"
import Image from "next/image"
import { X, Upload, Shield, MapPin, Check } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { printRequestApi } from "@/lib/api"
import { usePrintRequest } from "@/lib/printRequestContext";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from "axios"
import { AlertCircle, Clipboard } from "lucide-react";
import io from "socket.io-client";
import crypto from "crypto";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
let encryptedFiles: Buffer[];
let encryptedBuffer: Buffer;
let customerPublicKey: string;
let confirmationOpen = false
// let aesKey: Buffer, iv: Buffer;
export let aesKey: Buffer = crypto.randomBytes(32); // AES-256 requires a 32-byte key
export let iv: Buffer = crypto.randomBytes(16); 
let shop_Id: string;
const ecdh = crypto.createECDH("secp256k1");
ecdh.generateKeys();
customerPublicKey = ecdh.getPublicKey().toString("base64");
import EventEmitter from "events";
import ScanWhatsApp from "./scan-whatsapp"
const eventEmitter = new EventEmitter();
const secondEmitter = new EventEmitter();
let response;
    
const socket = io("http://localhost:5000", {
  transports: ["websocket"], // Force WebSocket transport
  reconnectionAttempts: 5,   // Try reconnecting 5 times
  timeout: 5000              // Set timeout for connection
});

socket.on("connect", () => {
  console.log("Connected to WebSocket server!");
});

// const handleShopKeeperKey = async ({
//   public_key,
//   shopId,
// }: { public_key: string, shopId: string }) => {
//   const sharedSecret = ecdh.computeSecret(Buffer.from(public_key, "base64"));
//   shop_Id = shopId
  
//   const cipher = crypto.createCipheriv("aes-256-gcm", sharedSecret.subarray(0, 32), iv);
//   let encryptedData = cipher.update(Buffer.concat([aesKey, iv]));
//   encryptedData = Buffer.concat([encryptedData, cipher.final()]);

//   const authTag = cipher.getAuthTag();
//   encryptedBuffer = Buffer.concat([encryptedData, iv, authTag]);
  
//   socket.emit("customer_encrypted_key", {
//     publicKey: customerPublicKey,  // Send customer's public key
//     encryptedData: encryptedBuffer.toString("base64"),
//     shop_Id
// });
// };

socket.on("shopKeeperKey", (data)=>{
  console.log("customer socket hit")
  const sharedSecret = ecdh.computeSecret(Buffer.from(data.publicKey, "base64"));
  shop_Id = data.shopId
  
  const cipher = crypto.createCipheriv("aes-256-gcm", sharedSecret.subarray(0, 32), iv);
  let encryptedData = cipher.update(Buffer.concat([aesKey, iv]));
  encryptedData = Buffer.concat([encryptedData, cipher.final()]);

  const authTag = cipher.getAuthTag();
  encryptedBuffer = Buffer.concat([encryptedData, iv, authTag]);
  confirmationOpen = true
  eventEmitter.emit("confirmEncryption");
});
// socket.emit("customer_encrypted_key", {
//   customerPublicKey: customerPublicKey,  // Send customer's public key
//   encryptedData: encryptedBuffer.toString("base64"),
//   shop_Id
// });
interface FileSettings {
  copies: number
  paperSize: "a4" | "letter" | "legal" | "a3"
  orientation: "portrait" | "landscape"
  color: "color" | "bw"
  doubleSided: boolean
  pages: string
}

interface SelectedFile {
  id: string
  name: string
  size: number
  type: string
  preview: string | null
  file: File
  settings: FileSettings
}

interface UploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedFiles: SelectedFile[]
  setSelectedFiles: Dispatch<SetStateAction<SelectedFile[]>>
}

const defaultFileSettings: FileSettings = {
  copies: 1,
  paperSize: "a4",
  orientation: "portrait",
  color: "color",
  doubleSided: false,
  pages: "all"
}

export function UploadDialog({ open, onOpenChange, selectedFiles, setSelectedFiles }: UploadDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [nearbyShops, setNearbyShops] = useState<{ id: string; shopName: string }[]>([]);
  const [selectedShop, setSelectedShop] = useState<string | null>(null);
  const { user } = useAuth();
  const { getNearbyShops } = usePrintRequest();
  const [accessRequested, setAccessRequested] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showApiModal, setApiModal] = useState(false);
  // useEffect(() => {
  //   if (open && user) {
  //     fetchNearbyShops();
  //   }
  // }, [open, user]);

  // const fetchNearbyShops = async () => {
  //   if (!user?.id) {
  //     setError("User not authenticated.");
  //     return;
  //   }
  
  //   try {
  //     // Simulate getting user location dynamically
  //     navigator.geolocation.getCurrentPosition(
  //       async (position) => {
  //         const location = { lat: position.coords.latitude, lng: position.coords.longitude };
  //         console.log("Fetching shops for location:", location);
  
  //         const shops = await getNearbyShops(location, user.token);
  //         console.log("Shops fetched:", shops);
  
  //         if (!shops || shops.length === 0) {
  //           setError("No nearby shops found.");
  //           return;
  //         }
  
  //         setNearbyShops(shops);
  //       },
  //       (error) => {
  //         setError("Failed to get user location.");
  //         console.error(error);
  //       }
  //     );
  //   } catch (error) {
  //     console.error("Error fetching nearby shops:", error);
  //     setError("Failed to fetch nearby shops.");
  //   }
  // };
  
  
  

  

//   const encryptSelectedFiles = async (): Promise<
//   { id: string; name: string; encryptedData: ArrayBuffer }[]
// > => {
//   return await Promise.all(
//     selectedFiles.map(async (file) => {
//       const encrypted = await encryptFile(file.file);
//       return { id: file.id, name: file.name, encryptedData: encrypted.encryptedData };
//     })
//   );
// };

    useEffect(() => {
      const handler2 = () => {
        setApiModal(true);
      };
      secondEmitter.on("getShareLink", handler2);

      return () => {
        secondEmitter.off("getShareLink", handler2); // Correct cleanup function
      };
    }, []);

    useEffect(() => {
      const handler = () => {
        
        setShowModal(true);
      };

      eventEmitter.on("confirmEncryption", handler);

      return () => {
        eventEmitter.off("confirmEncryption", handler); // Correct cleanup function
      };
    }, []);

const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files?.length) {
    const filesArray: SelectedFile[] = Array.from(e.target.files).map((file, index) => ({
      id: (index + 1).toString(),
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
      file: file,
      settings: {
        paperSize: "a4", // Default paper size
        orientation: "portrait", // Default orientation
        color: "bw", // Default print type
        doubleSided: false, // Default double-sided setting
        pages: "all", // Default pages
        copies: 1, // Default copy count
      },
    }));
    setSelectedFiles(filesArray);
  }
};

const handleShopSelect = (newValue: string) => {
  console.log("Selected Shop:", newValue); // Debugging
  setSelectedShop(newValue); // Update the selected shop
};

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      const filesArray: SelectedFile[] = Array.from(e.dataTransfer.files).map((file, index) => ({
        id: (index + 1).toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
        file: file,
        settings: {
          paperSize: "a4", 
          orientation: "portrait", 
          color: "bw", 
          doubleSided: false, 
          pages: "all", 
          copies: 1, 
        },
      }));
      setSelectedFiles(filesArray);
    }
  };
  
  const fileToBuffer = (file: File): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(Buffer.from(reader.result as ArrayBuffer));
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };
  const updateFileSettings = (fileId: string, key: keyof FileSettings, value: any) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === fileId ? { ...file, settings: { ...file.settings, [key]: value } } : file
      )
    );
  };

  const removeFile = (fileId: string) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
  };
  const handleConfirm = ()=>{
    socket.emit("customer_encrypted_key", {
      customerPublicKey: customerPublicKey,  // Send customer's public key
      encryptedData: encryptedBuffer.toString("base64"),
      shop_Id
    });
    setShowModal(false)
  }

  const handleUpload = async () => {
    
    if (!user) {
      setError("User not authenticated.");
      return;
    }
    socket.emit("register", {userId: user.id})
    // if (!selectedShop) {
    //   setError("Please select a print shop before uploading.");
    //   return;
    // }

    setIsUploading(true);
    setError(null);

    try {
      
      const filesInfo = selectedFiles.map((file) => ({
        id: file.id, 
        name: file.name,
        pages: file.settings.pages === "all" ? 1 : parseInt(file.settings.pages, 10), 
        size: file.size.toString(), // Convert size to string
        copies: file.settings.copies,
      }));
    
      
      // const encryptedFiles = await Promise.all(
      //   selectedFiles.map(async (file) => {
      //     const arrayBuffer = await file.file.arrayBuffer(); // Convert file to ArrayBuffer
      //     return Buffer.from(arrayBuffer); // Convert to Buffer
      //   })
      // );
      // aesKey = crypto.randomBytes(32); // AES-256 Key
      // iv = crypto.randomBytes(16); // IV for AES-GCM

      console.log("Generated AES Key:", aesKey.toString("hex"));
      console.log("Generated IV:", iv.toString("hex"));
      const fileBuffers = await Promise.all(
        selectedFiles.map((file) => fileToBuffer(file.file))
      );
      console.log(fileBuffers)
      encryptedFiles = fileBuffers.map((fileBuffer) => {
        const cipher = crypto.createCipheriv("aes-256-gcm", aesKey, iv);
        const encryptedData = Buffer.concat([cipher.update(fileBuffer), cipher.final()]);
        return encryptedData; 
      });
      // encryptedFiles = encryptFiles(aesKey, iv, fileBuffers);
      console.log(`encrypted documents: ${encryptedFiles}`)
      const totalPages = filesInfo.reduce((sum, file) => sum + file.pages, 0).toString();
      response = await printRequestApi.createPrintRequest(
        {
          customerId: user.id,
          shopkeeperId: selectedShop || undefined,
          filesInfo: filesInfo, // Matches Mongoose schema
          encryptedData: encryptedFiles, // Array of Buffers
          pages: totalPages, // Assuming global setting
        },
        user.token
      );
    console.log(`print Request: ${response.requestId}`)
      
      secondEmitter.emit("getShareLink");
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsUploading(false);
              onOpenChange(false);
              setSelectedFiles([]);
            }, 500);
            return 100;
          }
          return prev + 5;
        });
      }, 200);
    } catch (err) {
      setError("Failed to upload files. Please try again.");
      setIsUploading(false);
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };
  
  const FilePreview = ({ file }: { file: SelectedFile }) => (
    <div className="relative h-40 w-full">
      {file.type.startsWith("image/") ? (
        <Image
          src={file.preview || ""}
          alt="File preview"
          fill
          className="object-contain rounded-md"
        />
      ) : (
        <div className="flex items-center justify-center h-full bg-muted rounded-md">
          <div className="text-center">
            <span className="text-4xl">📄</span>
            <p className="text-sm mt-2">{file.name}</p>
          </div>
        </div>
      )}
    </div>
  );
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Upload Documents</DialogTitle>
          <DialogDescription>
            Upload your documents securely. All files are encrypted end-to-end.
          </DialogDescription>
        </DialogHeader>
  
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
  
       {/* ✅ NEW: Select Nearby Print Shop */}
<div className="space-y-4">
  <label className="flex items-center gap-2">
    <MapPin className="w-5 h-5 text-primary" />
    Select Nearby Print Shop
  </label>
  
  {/* The Select component */}
  <Select value={selectedShop || ""} onValueChange={handleShopSelect}>
  <SelectTrigger>
    <SelectValue placeholder="Choose a print shop" />
  </SelectTrigger>

  <SelectContent>
    {nearbyShops.map((shop, index) => (
      <SelectItem key={shop.id || index} value={shop.id}>
        {shop.shopName}
      </SelectItem>
    ))}
  </SelectContent>
</Select>




{selectedShop && (
  <p className="text-sm text-muted-foreground mt-2">
    Selected Print Shop: {nearbyShops.find((shop) => shop.id === selectedShop)?.shopName}
  </p>
)}

</div>
{/* ✅ END */}


        {!isUploading ? (
          <>
            <div
              className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileSelect}
                multiple
              />
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Drag files here or click to browse</h3>
                <p className="text-sm text-muted-foreground">
                  Support for PDF, DOCX, XLSX, PPTX, JPG, PNG and more
                </p>
              </div>
            </div>
  
            {selectedFiles.length > 0 && (
              <Accordion type="multiple" className="w-full mt-4">
                {selectedFiles.map((file) => (
                  <AccordionItem key={file.id} value={file.id}>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <AccordionTrigger className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          {file.preview ? (
                            <div className="relative h-10 w-10 overflow-hidden rounded">
                              <Image
                                src={file.preview}
                                alt="Preview"
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-10 w-10 bg-muted flex items-center justify-center rounded">
                              📄
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium truncate max-w-[300px]">
                              {file.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
  
                    <AccordionContent>
                      <Tabs defaultValue="settings" className="mt-4">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="settings">Settings</TabsTrigger>
                          <TabsTrigger value="preview">Preview</TabsTrigger>
                        </TabsList>
  
                        <TabsContent value="settings">
                          <div className="space-y-4 mt-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Paper Size</Label>
                                <Select
                                  value={file.settings.paperSize}
                                  onValueChange={(value: FileSettings['paperSize']) => 
                                    updateFileSettings(file.id, 'paperSize', value)
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select size" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="a4">A4</SelectItem>
                                    <SelectItem value="letter">Letter</SelectItem>
                                    <SelectItem value="legal">Legal</SelectItem>
                                    <SelectItem value="a3">A3</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
  
                              <div className="space-y-2">
                                <Label>Orientation</Label>
                                <RadioGroup
                                  value={file.settings.orientation}
                                  onValueChange={(value: FileSettings['orientation']) => 
                                    updateFileSettings(file.id, 'orientation', value)
                                  }
                                  className="flex gap-4"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="portrait" id={`portrait-${file.id}`} />
                                    <Label htmlFor={`portrait-${file.id}`}>Portrait</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="landscape" id={`landscape-${file.id}`} />
                                    <Label htmlFor={`landscape-${file.id}`}>Landscape</Label>
                                  </div>
                                </RadioGroup>
                              </div>
                            </div>
  
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Print Type</Label>
                                <RadioGroup
                                  value={file.settings.color}
                                  onValueChange={(value: FileSettings['color']) => 
                                    updateFileSettings(file.id, 'color', value)
                                  }
                                  className="flex gap-4"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="color" id={`color-${file.id}`} />
                                    <Label htmlFor={`color-${file.id}`}>Color</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="bw" id={`bw-${file.id}`} />
                                    <Label htmlFor={`bw-${file.id}`}>Black & White</Label>
                                  </div>
                                </RadioGroup>
                              </div>
  
                              <div className="space-y-2">
                                <Label>Copies</Label>
                                <div className="flex items-center gap-4">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateFileSettings(file.id, 'copies', Math.max(1, file.settings.copies - 1))}
                                  >
                                    -
                                  </Button>
                                  <span className="text-center w-8">{file.settings.copies}</span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateFileSettings(file.id, 'copies', file.settings.copies + 1)}
                                  >
                                    +
                                  </Button>
                                </div>
                              </div>
                            </div>
  
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label>Double-sided printing</Label>
                                <Switch
                                  checked={file.settings.doubleSided}
                                  onCheckedChange={(checked) => 
                                    updateFileSettings(file.id, 'doubleSided', checked)
                                  }
                                />
                              </div>
                            </div>
  
                            <div className="space-y-2">
                              <Label>Pages to print</Label>
                              <Input
                                placeholder="e.g. 1-5, 8, 11-13"
                                value={file.settings.pages === "all" ? "" : file.settings.pages}
                                onChange={(e) => 
                                  updateFileSettings(file.id, 'pages', e.target.value || "all")
                                }
                              />
                              <p className="text-xs text-muted-foreground">Leave empty to print all pages</p>
                            </div>
                          </div>
                        </TabsContent>
  
                        <TabsContent value="preview">
                          <div className="mt-4 border rounded-lg p-4">
                            <FilePreview file={file} />
                          </div>
                        </TabsContent>
                      </Tabs>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
            
            <DialogFooter className="flex justify-between mt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                <span>End-to-end encrypted</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpload} disabled={selectedFiles.length === 0}>
                  <Shield className="mr-2 h-4 w-4" />
                  Send to Print Shop
                </Button>
              </div>
            </DialogFooter>
          </>
        ) : (
          <div className="py-8 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Uploading...</span>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        {accessRequested ? (
          <Button onClick={handleAccess} variant="default">
            <Check className="mr-2 h-4 w-4" />
            Grant Access
          </Button>
        ) : (
          <Button onClick={handleUpload} disabled={selectedFiles.length === 0}>
            <Shield className="mr-2 h-4 w-4" />
            Send to Print Shop
          </Button>
        )}
            </div>
            <Progress value={uploadProgress} max={100} />
          </div>
        )}
        
      </DialogContent>
      {showApiModal && (
  <ApiConfirmationModal
    open={showApiModal}
    onCancel={() => setApiModal(false)}
  />
)}

{showModal && (
  <ConfirmationModal 
    open={showModal}
    onConfirm={handleConfirm}
    onCancel={() => setShowModal(false)}
  />
)}

    </Dialog>
    
  );
  };
  function ConfirmationModal({ open, onConfirm, onCancel }) {
    return (
      <Dialog open={open} onOpenChange={onCancel}>
        <DialogContent className="sm:max-w-[400px] text-center">
          <DialogHeader>
            <AlertCircle className="w-10 h-10 mx-auto text-red-500" />
            <DialogTitle>Confirm Print Request</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">Do you want to allow the shopkeeper to print your files?</p>
          <DialogFooter className="flex justify-center gap-4 mt-4">
            <Button variant="outline" onClick={onCancel} className="w-24">
              Cancel
            </Button>
            <Button onClick={onConfirm} className="w-24">
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  function ApiConfirmationModal({ open, onCancel }) {
    const [loading, setLoading] = useState(false);
    const [responseComp, setResponse] = useState({
      success: true,
      shareLink: ""
    });
    const [copied, setCopied] = useState(false);
    const [showScanner, setShowScanner] = useState(false); 
  
    async function handleFetch() {
      if (!open) return; // Prevent unnecessary API calls when the modal is closed
      setLoading(true);
      try {
        console.log("component called")
        const res = await axios.get(`http://localhost:5000/api/print-requests/share/${response.requestId}`, {
          withCredentials: true,
        });
        setResponse(res.data); // Assuming response contains { shareLink: "..." }
      } catch (error) {
        console.error("API error:", error);
      }
      setLoading(false);
    }
  
    function copyToClipboard() {
      if (!responseComp?.shareLink) return;
      navigator.clipboard.writeText(responseComp.shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  
    useEffect(() => {
      if (open) {
        handleFetch();
      }
    }, [open]); // Fetch data when modal opens
  
    return (
      <>
      <Dialog open={open} onOpenChange={onCancel}>
        <DialogContent className="sm:max-w-[500px] text-center">
          <DialogHeader>
            <AlertCircle className="w-10 h-10 mx-auto text-blue-500" />
            <DialogTitle>Fetch Print Status</DialogTitle>
          </DialogHeader>
  
          <p className="text-gray-600">Shareable Link</p>
  
          {loading ? (
            <p className="text-gray-500 mt-4">Fetching data...</p>
          ) : responseComp ? (
            <div className="mt-4">
              <input
                type="text"
                readOnly
                value={responseComp.shareLink || "No link available"}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          ) : (
            <p className="text-red-500 mt-4">Failed to fetch data.</p>
          )}
  
          <DialogFooter className="flex justify-center gap-4 mt-4">
            {responseComp && (
              <Button onClick={copyToClipboard} className="w-32 flex items-center justify-center">
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Clipboard className="w-4 h-4 mr-2" />}
                {copied ? "Copied" : "Copy Link"}
              </Button>
            )}
  
            <Button variant="outline" onClick={onCancel} className="w-24 flex items-center justify-center">
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
            <Button onClick={() => setShowScanner(true)}>
                            Share
                        </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {showScanner && (
                <Dialog open={showScanner} onOpenChange={() => setShowScanner(false)}>
                    <DialogContent>
                      <VisuallyHidden>
                        
                        <DialogTitle>Scan WhatsApp QR Code</DialogTitle>
                       
                      </VisuallyHidden>
                        <ScanWhatsApp shareLink={ responseComp.shareLink}/>
                    </DialogContent>
                </Dialog>
            )}
      </>
    );
  }