// app/dashboard/customer/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CustomerDashboardHeader } from "@/components/dashboard/customer/dashboard-header";
import { CustomerSidebar } from "@/components/dashboard/customer/sidebar";
import { QuickUpload } from "@/components/dashboard/customer/quick-upload";
import { RecentDocuments } from "@/components/dashboard/customer/recent-documents";
import { UploadDialog } from "@/components/dashboard/customer/upload-dialog";
import { CameraDialog } from "@/components/dashboard/customer/camera-dialog";
import { useAuth } from "@/lib/auth-context";
import { SelectedFile } from "@/lib/type";

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showCameraDialog, setShowCameraDialog] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);

  return (
    <div className="flex min-h-screen flex-col">
      <CustomerDashboardHeader />

      <div className="flex flex-1">
        <CustomerSidebar onUploadClick={() => setShowUploadDialog(true)} />

        <main className="flex-1 overflow-auto">
          <div className="container py-6">
            <motion.div
              className="mb-8 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold">{user?.name}</h1>
            </motion.div>

            <QuickUpload
              onUploadClick={() => setShowUploadDialog(true)}
              onCameraClick={() => setShowCameraDialog(true)}
            />
            <RecentDocuments viewMode={viewMode} setViewMode={setViewMode} />
          </div>
        </main>
      </div>

      <UploadDialog
        open={showUploadDialog}
        onOpenChange={setShowUploadDialog}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
      />

      <CameraDialog
        open={showCameraDialog}
        onOpenChange={setShowCameraDialog}
        onCapture={(file: SelectedFile) => {
          setSelectedFiles(prev => [...prev, file]);
          setShowCameraDialog(false);
        }}
      />
    </div>
  );
}