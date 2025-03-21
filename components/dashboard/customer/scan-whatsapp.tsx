import { useState, useRef } from "react";
import Tesseract from "tesseract.js";
import { whatsappApi } from "@/lib/api";

const ScanWhatsApp = ({ shareLink }: { shareLink: string }) => {
  const [shopkeeperNumber, setShopkeeperNumber] = useState<string | null>(null);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Function to start the camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }, // Front camera
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
    } catch (error) {
      setMessage("Error accessing camera.");
      console.error("Camera Error:", error);
    }
  };
  
  
  

  // Function to stop the camera
  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(track => track.stop());
  };

  // Function to capture image and process text
// Function to capture image and process text
const captureAndProcess = async () => {
  if (!videoRef.current || !canvasRef.current) return;

  const video = videoRef.current;
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  // Ensure video is playing before capturing
  if (video.readyState !== video.HAVE_ENOUGH_DATA) {
    setMessage("Video not ready. Try again.");
    return;
  }

  // Capture image from video stream
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Convert to OCR-readable format
  const imageDataUrl = canvas.toDataURL("image/png"); // Convert to base64

  if (!imageDataUrl) {
    setMessage("Failed to capture image. Try again.");
    return;
  }

  setIsProcessing(true);
  setMessage("Processing image...");

  try {
    // Run OCR on captured image
    const { data } = await Tesseract.recognize(imageDataUrl, "eng");
    console.log("OCR Output:", data.text);

    // Extract only numbers (phone number format)
    const phoneMatch = data.text.match(/\d{10,}/);
    if (phoneMatch) {
      setShopkeeperNumber(phoneMatch[0]);
      setMessage(`Detected Phone Number: ${phoneMatch[0]}`);
    } else {
      setMessage("No valid phone number found.");
    }
  } catch (error) {
    setMessage("Failed to process image.");
    console.error("OCR Error:", error);
  } finally {
    setIsProcessing(false);
    stopCamera();
  }
};


  // Function to extract phone number using OCR
  const processImage = async (imageBlob: Blob) => {
    setIsProcessing(true);
    setMessage("Processing image...");

    try {
      const { data } = await Tesseract.recognize(imageBlob, "eng");
      console.log("OCR Output:", data.text);

      // Extract only numbers (phone number format)
      const phoneMatch = data.text.match(/\d{10,}/);
      if (phoneMatch) {
        setShopkeeperNumber(phoneMatch[0]);
        setMessage(`Detected Phone Number: ${phoneMatch[0]}`);
      } else {
        setMessage("No valid phone number found.");
      }
    } catch (error) {
      setMessage("Failed to process image.");
      console.error("OCR Error:", error);
    } finally {
      setIsProcessing(false);
      stopCamera();
    }
  };

  // Function to send WhatsApp message
  const sendWhatsAppMessage = async () => {
    if (!shopkeeperNumber) {
      setMessage("Scan a shopkeeper's number first!");
      return;
    }

    setIsSending(true);
    try {
      await whatsappApi.sendMessage(shopkeeperNumber, shareLink);
      setMessage("WhatsApp message sent successfully!");
    } catch (error) {
      setMessage("Failed to send message.");
    } finally {
      setIsSending(false);
    }
  };

  
  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-2">Scan Shopkeeper's Phone Number</h2>

      {/* Start Camera Button */}
      <button
        className="px-4 py-2 mb-4 rounded-md bg-blue-500 text-white"
        onClick={startCamera}
      >
        Start Camera
      </button>

      {/* Video Stream for Camera */}
      <video ref={videoRef} autoPlay playsInline className="w-64 h-64 border rounded-md" />

      {/* Capture Image Button */}
      <button
        className="px-4 py-2 mt-4 rounded-md bg-green-500 text-white"
        onClick={captureAndProcess}
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Capture & Extract Number"}
      </button>

      {/* Canvas for Image Capture (Hidden) */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {shopkeeperNumber && <p className="mt-2 text-green-600">{message}</p>}

      {/* Send WhatsApp Button */}
      <button
        className="bg-green-500 text-white px-4 py-2 mt-4 rounded-md"
        onClick={sendWhatsAppMessage}
        disabled={!shopkeeperNumber || isSending}
      >
        {isSending ? "Sending..." : "Send Hi on WhatsApp"}
      </button>
    </div>
  );
};

export default ScanWhatsApp;
