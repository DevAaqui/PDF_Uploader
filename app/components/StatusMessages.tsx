"use client";

import { CheckCircle, AlertCircle } from "lucide-react";

interface StatusMessageProps {
  status: "idle" | "uploading" | "success" | "error";
}

export default function StatusMessage({ status }: StatusMessageProps) {
  if (status === "idle") return null;

  return (
    <div className="flex items-center justify-center mb-6 p-4 rounded-lg">
      {status === "success" && (
        <div className="flex items-center bg-green-50 border border-green-200 rounded-lg px-4 py-3">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          <span className="text-green-700">Files uploaded successfully!</span>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <span className="text-red-700">
            Error uploading files. Please try again.
          </span>
        </div>
      )}

      {status === "uploading" && (
        <div className="flex items-center bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mr-2"></div>
          <span className="text-blue-700">Uploading files...</span>
        </div>
      )}
    </div>
  );
}