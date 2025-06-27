'use client'

import { useState } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'

export default function Home() {
    const [dragActive, setDragActive] = useState(false)
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files)
        }
    }

    const handleFiles = (files: FileList) => {
        const pdfFiles = Array.from(files).filter(file => file.type === 'application/pdf')
        if (pdfFiles.length > 0) {
            setUploadedFiles(prev => [...prev, ...pdfFiles])
            setUploadStatus('success')
            setTimeout(() => setUploadStatus('idle'), 3000)
        }
    }

    const removeFile = (index: number) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index))
    }

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

                {/* Upload Area */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <div
                        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${dragActive
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Drop your PDF files here
                        </h3>
                        <p className="text-gray-500 mb-6">
                            or click to browse your files
                        </p>
                        <input
                            type="file"
                            multiple
                            accept=".pdf"
                            onChange={handleChange}
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

                {/* Status Message */}
                {uploadStatus === 'success' && (
                    <div className="flex items-center justify-center mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-green-700">Files uploaded successfully!</span>
                    </div>
                )}

                {uploadStatus === 'error' && (
                    <div className="flex items-center justify-center mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                        <span className="text-red-700">Error uploading files. Please try again.</span>
                    </div>
                )}

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                            Uploaded Files ({uploadedFiles.length})
                        </h2>
                        <div className="space-y-4">
                            {uploadedFiles.map((file, index) => (
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
                                        onClick={() => removeFile(index)}
                                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
} 