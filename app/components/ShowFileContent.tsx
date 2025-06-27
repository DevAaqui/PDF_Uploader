"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Eye,
  EyeOff,
  Download,
  X,
  File,
  Calendar,
  Hash,
  ExternalLink,
} from "lucide-react";

interface ShowFileContentProps {
  files: File[];
  onCloseFile: (index: number) => void;
}

interface FileContent {
  index: number;
  name: string;
  text: string;
  pages: number;
  info: any;
  isLoading: boolean;
  error?: string;
}

export default function ShowFileContent({
  files,
  onCloseFile,
}: ShowFileContentProps) {
  const [fileContents, setFileContents] = useState<FileContent[]>([]);
  const [expandedFiles, setExpandedFiles] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Reset file contents when files change
    setFileContents([]);
    setExpandedFiles(new Set());
  }, [files]);

  const toggleFileExpansion = (index: number) => {
    setExpandedFiles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
        // Load content when expanding
        loadFileContent(index);
      }
      return newSet;
    });
  };

  const loadFileContent = async (index: number) => {
    const file = files[index];
    if (!file) return;

    // Check if content is already loaded
    if (fileContents.find((fc) => fc.index === index)) return;

    // Add loading state
    setFileContents((prev) => [
      ...prev,
      {
        index,
        name: file.name,
        text: "",
        pages: 0,
        info: {},
        isLoading: true,
      },
    ]);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/parse-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to parse PDF");
      }

      const data = await response.json();

      setFileContents((prev) =>
        prev.map((fc) =>
          fc.index === index
            ? {
                ...fc,
                text: data.text,
                pages: data.pages,
                info: data.info,
                isLoading: false,
              }
            : fc
        )
      );
    } catch (error) {
      console.error("Error loading PDF content:", error);
      setFileContents((prev) =>
        prev.map((fc) =>
          fc.index === index
            ? {
                ...fc,
                text: "",
                pages: 0,
                info: {},
                isLoading: false,
                error: "Failed to parse PDF content",
              }
            : fc
        )
      );
    }
  };

  const downloadFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openFileInNewTab = (file: File) => {
    const url = URL.createObjectURL(file);
    window.open(url, "_blank");
  };

  const formatFileInfo = (info: any) => {
    const infoItems = [];

    if (info.title) infoItems.push({ label: "Title", value: info.title });
    if (info.author) infoItems.push({ label: "Author", value: info.author });
    if (info.subject) infoItems.push({ label: "Subject", value: info.subject });
    if (info.creator) infoItems.push({ label: "Creator", value: info.creator });
    if (info.producer)
      infoItems.push({ label: "Producer", value: info.producer });
    if (info.creationDate) {
      const date = new Date(info.creationDate);
      infoItems.push({ label: "Created", value: date.toLocaleDateString() });
    }
    if (info.modDate) {
      const date = new Date(info.modDate);
      infoItems.push({ label: "Modified", value: date.toLocaleDateString() });
    }

    return infoItems;
  };

  if (files.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        PDF Content Viewer ({files.length} files)
      </h2>
      <div className="space-y-6">
        {files.map((file, index) => {
          const isExpanded = expandedFiles.has(index);
          const fileContent = fileContents.find((fc) => fc.index === index);
          const fileInfo = fileContent ? formatFileInfo(fileContent.info) : [];

          return (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              {/* File Header */}
              <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center">
                  <FileText className="h-6 w-6 text-blue-500 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                      {fileContent &&
                        !fileContent.isLoading &&
                        !fileContent.error && (
                          <>
                            <span className="flex items-center">
                              <Hash className="h-3 w-3 mr-1" />
                              {fileContent.pages} pages
                            </span>
                          </>
                        )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openFileInNewTab(file)}
                    className="p-2 text-gray-500 hover:text-green-600 transition-colors duration-200"
                    title="Open in new tab"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => downloadFile(file)}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                    title="Download file"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => toggleFileExpansion(index)}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                    title={isExpanded ? "Collapse content" : "Expand content"}
                  >
                    {isExpanded ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => onCloseFile(index)}
                    className="p-2 text-gray-500 hover:text-red-600 transition-colors duration-200"
                    title="Remove file"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* File Content */}
              {isExpanded && (
                <div className="p-6 bg-white">
                  {fileContent?.isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
                      <span className="text-gray-600">
                        Processing PDF content...
                      </span>
                    </div>
                  ) : fileContent?.error ? (
                    <div className="text-center py-8">
                      <div className="text-red-500 mb-2">
                        <FileText className="h-12 w-12 mx-auto mb-2" />
                        <p className="text-sm">{fileContent.error}</p>
                      </div>
                      <p className="text-gray-500 text-sm">
                        Unable to parse this PDF file. You can still view it in
                        a new tab.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* File Information */}
                      {fileInfo.length > 0 && (
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                            <File className="h-4 w-4 mr-2" />
                            Document Information
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {fileInfo.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center text-sm"
                              >
                                <span className="font-medium text-blue-800 w-20">
                                  {item.label}:
                                </span>
                                <span className="text-blue-700">
                                  {item.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* PDF Content */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          Document Content Preview
                        </h4>
                        <div className="max-h-96 overflow-y-auto">
                          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
                            {fileContent?.text ||
                              "Click the eye icon to load content"}
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
