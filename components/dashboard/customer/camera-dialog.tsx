"use client"

import { useRef, useEffect } from "react"
import { Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { SelectedFile, FileSettings } from "@/lib/type"
import { v4 as uuidv4 } from "uuid"

interface CameraDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCapture: (file: SelectedFile) => void
}

const defaultFileSettings: FileSettings = {
  copies: 1,
  paperSize: "a4",
  orientation: "portrait",
  color: "color",
  doubleSided: false,
  pages: "all"
}

export function CameraDialog({ open, onOpenChange, onCapture }: CameraDialogProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (open) {
      startCamera()
    } else {
      stopCamera()
    }

    return () => {
      stopCamera()
    }
  }, [open])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      const tracks = stream.getTracks()
      tracks.forEach(track => track.stop())
      videoRef.current.srcObject = null
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')

      if (!context) return

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height)

      // Convert canvas to file
      canvas.toBlob((blob) => {
        if (!blob) return
        
        const file = new File([blob], `capture-${Date.now()}.jpg`, {
          type: "image/jpeg",
          lastModified: Date.now()
        })

        const selectedFile: SelectedFile = {
          id: uuidv4(),
          name: file.name,
          size: file.size,
          type: file.type,
          preview: URL.createObjectURL(file),
          file: file,
          settings: { ...defaultFileSettings }
        }

        onCapture(selectedFile)
      }, 'image/jpeg', 0.9)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Take a Photo</DialogTitle>
          <DialogDescription>
            Use your camera to capture a document or image for printing
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="h-full w-full object-cover" 
            />
          </div>

          <canvas ref={canvasRef} className="hidden" />

          <div className="flex justify-center">
            <Button 
              onClick={capturePhoto} 
              className="rounded-full h-14 w-14 p-0"
            >
              <Camera className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}