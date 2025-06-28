const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
const PORT = process.env.BACKEND_PORT || 3001;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },
});

// PDF parsing endpoint
app.post("/api/parse-pdf", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    console.log(
      `Processing PDF: ${req.file.originalname} (${req.file.size} bytes)`
    );

    const buffer = req.file.buffer;

    // Parse PDF content
    const data = await pdfParse(buffer);
    console.log("data backend>>>>>>>>>>>>>>>>>>", data);

    // Clean and process the extracted text
    let extractedText = data.text
      .replace(/\s+/g, " ")
      .replace(/\n\s*\n/g, "\n\n")
      .trim();

    // Limit text length for preview
    if (extractedText.length > 10000) {
      extractedText =
        extractedText.substring(0, 10000) +
        "\n\n... [Content truncated for preview]";
    }

    // Extract metadata
    const metadata = data.info || {};

    // Parse dates
    let creationDate = "";
    let modDate = "";

    if (metadata.CreationDate) {
      try {
        const date = new Date(metadata.CreationDate);
        creationDate = date.toISOString();
      } catch (e) {
        creationDate = metadata.CreationDate;
      }
    }

    if (metadata.ModDate) {
      try {
        const date = new Date(metadata.ModDate);
        modDate = date.toISOString();
      } catch (e) {
        modDate = metadata.ModDate;
      }
    }

    console.log(
      `Successfully parsed PDF: ${req.file.originalname} (${data.numpages} pages)`
    );

    res.json({
      success: true,
      text: extractedText,
      pages: data.numpages,
      info: {
        title: metadata.Title || req.file.originalname.replace(".pdf", ""),
        author: metadata.Author || "Unknown",
        subject: metadata.Subject || "",
        creator: metadata.Creator || "",
        producer: metadata.Producer || "",
        creationDate: creationDate,
        modDate: modDate,
        keywords: metadata.Keywords || "",
        language: metadata.Language || "",
      },
    });
  } catch (error) {
    console.error("PDF parsing error:", error);

    let errorMessage = "Failed to parse PDF";
    if (error.message?.includes("password")) {
      errorMessage = "PDF is password-protected and cannot be parsed";
    } else if (
      error.message?.includes("corrupt") ||
      error.message?.includes("invalid")
    ) {
      errorMessage = "PDF file appears to be corrupted or invalid";
    } else if (error.message?.includes("memory")) {
      errorMessage = "PDF file is too large to process";
    }

    res.status(500).json({ error: errorMessage });
  }
});

// PDF to DOC conversion endpoint using Claude API
app.post("/api/convert-pdf-to-doc", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    if (!process.env.CLAUDE_API_KEY) {
      return res.status(500).json({ error: "Claude API key not configured" });
    }

    console.log(
      `Converting PDF to DOC: ${req.file.originalname} (${req.file.size} bytes)`
    );

    const buffer = req.file.buffer;

    // Parse PDF content
    const data = await pdfParse(buffer);
    const pdfText = data.text;

    // Create prompt for Claude to convert PDF to DOC format
    const conversionPrompt = `Please convert the following PDF content into a well-formatted DOC (Word document) structure. 

Requirements:
1. Maintain the original document structure and formatting
2. Preserve headings, subheadings, and hierarchy
3. Keep paragraphs and line breaks intact
4. Maintain any lists, tables, or special formatting
5. Ensure proper document flow and readability
6. Add appropriate spacing and formatting for a Word document

PDF Content:
${pdfText}

Please provide the converted content in a format that can be directly used in a Word document. Include proper formatting markers where needed.`;

    // Call Claude API for conversion
    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: conversionPrompt,
        },
      ],
    });

    const convertedContent = message.content[0].text;

    // Create a simple DOC-like structure (in real implementation, you'd use a library like docx)
    const docContent = {
      title: data.info?.Title || req.file.originalname.replace(".pdf", ""),
      content: convertedContent,
      metadata: {
        originalPages: data.numpages,
        convertedAt: new Date().toISOString(),
        originalFile: req.file.originalname,
      },
    };

    console.log(`Successfully converted PDF to DOC: ${req.file.originalname}`);

    res.json({
      success: true,
      docContent: docContent,
      message: "PDF successfully converted to DOC format",
    });
  } catch (error) {
    console.error("PDF to DOC conversion error:", error);

    let errorMessage = "Failed to convert PDF to DOC";
    if (error.message?.includes("API key")) {
      errorMessage = "Claude API key is invalid or missing";
    } else if (error.message?.includes("quota")) {
      errorMessage = "API quota exceeded";
    } else if (error.message?.includes("timeout")) {
      errorMessage = "Conversion timed out";
    }

    res.status(500).json({ error: errorMessage });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "PDF parsing service is running",
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "PDF Parsing Backend API",
    version: "1.0.0",
    endpoints: {
      "POST /api/parse-pdf": "Parse PDF file and extract content",
      "GET /health": "Health check endpoint",
    },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 PDF parsing server running on port ${PORT}`);
  console.log(`📄 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API endpoint: http://localhost:${PORT}/api/parse-pdf`);
});
