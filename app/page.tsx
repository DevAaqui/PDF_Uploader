"use client";

import { useState } from "react";
import UploadArea from "./components/UploadArea";
import StatusMessage from "./components/StatusMessages";
import FileList from "./components/FileList";

export default function Home() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const pdfFiles = Array.from(files).filter(
      (file) => file.type === "application/pdf"
    );
    if (pdfFiles.length > 0) {
      setUploadedFiles((prev) => [...prev, ...pdfFiles]);
      setUploadStatus("success");
      setTimeout(() => setUploadStatus("idle"), 3000);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            PDF Uploader
          </h1>
          <p className="text-lg text-gray-600">
            Upload and manage your PDF files with ease
          </p>
        </div>

        {/* Upload Area Component */}
        <UploadArea
          dragActive={dragActive}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onChange={handleChange}
        />

        {/* Status Message Component */}
        <StatusMessage status={uploadStatus} />

        {/* File List Component */}
        <FileList files={uploadedFiles} onRemoveFile={removeFile} />
      </div>
    </main>
  );
}