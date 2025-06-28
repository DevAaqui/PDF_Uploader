"use client";

import React from "react";
import { FileText } from "lucide-react";

interface FileListProps {
  files: File[];
  onRemoveFile: (index: number) => void;
}

export default function FileList({ files, onRemoveFile }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Uploaded Files ({files.length})
      </h2>
      <div className="space-y-4">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={() => onRemoveFile(index)}
              className="text-red-500 hover:text-red-700 transition-colors duration-200"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}