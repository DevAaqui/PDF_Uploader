import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "File must be a PDF" }, { status: 400 });
    }

    // Forward the request to the Node.js server
    const backendFormData = new FormData();
    backendFormData.append('file', file);

    const response = await fetch(`${BACKEND_URL}/api/parse-pdf`, {
      method: 'POST',
      body: backendFormData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Backend service error');
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("PDF parsing error:", error);

    let errorMessage = "Failed to parse PDF";
    if (error.message?.includes('password')) {
      errorMessage = "PDF is password-protected and cannot be parsed";
    } else if (error.message?.includes('corrupt') || error.message?.includes('invalid')) {
      errorMessage = "PDF file appears to be corrupted or invalid";
    } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
      errorMessage = "Backend service is not available. Please ensure the server is running on port 3001.";
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
