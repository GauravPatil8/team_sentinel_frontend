"use client"

import { motion } from "framer-motion"
import { Upload, Camera, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function QuickUpload({ onUploadClick, onCameraClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="mb-8 overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Quick Upload</CardTitle>
              <CardDescription>Drag and drop your documents to quickly send them to a print shop</CardDescription>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-primary" />
              <span>End-to-end encrypted</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div
            className="flex items-center justify-center rounded-md border border-dashed p-8 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={onUploadClick}
          >
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-lg font-medium">Drag files here or click to browse</h3>
              <p className="text-sm text-muted-foreground">Support for PDF, DOCX, XLSX, PPTX, JPG, PNG and more</p>
              <div className="flex gap-4 mt-2">
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    onUploadClick()
                  }}
                  className="group transition-all hover:shadow-md"
                >
                  <Upload className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
                  Upload Document
                </Button>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    onCameraClick()
                  }}
                  className="transition-all hover:shadow-md"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Take Photo
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

