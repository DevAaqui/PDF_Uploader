"use client";

import { Upload } from "lucide-react";

interface UploadAreaProps {
  dragActive: boolean;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadArea({
  dragActive,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onChange,
}: UploadAreaProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <div
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
          dragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Drop your PDF files here
        </h3>
        <p className="text-gray-500 mb-6">or click to browse your files</p>
        <input
          type="file"
          multiple
          accept=".pdf"
          onChange={onChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer transition-colors duration-200"
        >
          Choose Files
        </label>
      </div>
    </div>
  );
}