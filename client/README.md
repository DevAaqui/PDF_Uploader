# PDF Uploader - Next.js App Router with Node.js Backend

A modern, full-featured PDF upload application built with Next.js 14 (App Router) and a dedicated Node.js backend for reliable PDF parsing. This application demonstrates best practices for building scalable web applications with separate frontend and backend services.

## 🚀 Features

- **Next.js 14 App Router** - Latest routing system with file-based routing
- **Node.js Backend** - Dedicated Express server for PDF parsing
- **Real PDF Parsing** - Extract actual text content and metadata from PDF files
- **TypeScript** - Full type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Drag & Drop Upload** - Intuitive file upload interface
- **Responsive Design** - Mobile-first approach with beautiful UI
- **Concurrent Development** - Run frontend and backend simultaneously
- **Modern Icons** - Lucide React icons for consistent design
- **ESLint** - Code quality and consistency

## 📁 Project Structure

```
PDF_Uploader/
├── app/                    # Next.js App Router directory
│   ├── api/               # API routes (proxies to backend)
│   │   └── parse-pdf/     # PDF parsing endpoint
│   ├── components/        # Reusable components
│   │   ├── Navigation.tsx # Navigation component
│   │   ├── UploadArea.tsx # File upload component
│   │   ├── StatusMessage.tsx # Status display component
│   │   ├── FileList.tsx   # File list component
│   │   └── ShowFileContent.tsx # PDF content viewer
│   ├── about/             # About page route
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── backend/               # Node.js backend service
│   ├── server.js          # Express server
│   ├── package.json       # Backend dependencies
│   └── config.js          # Backend configuration
├── public/                # Static assets
├── start.sh              # Linux/Mac startup script
├── start.bat             # Windows startup script
├── package.json          # Frontend dependencies and scripts
└── README.md             # This file
```

## 🛠️ Quick Start

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Option 1: Automatic Setup (Recommended)

**For Linux/Mac:**

```bash
chmod +x start.sh
./start.sh
```

**For Windows:**

```cmd
start.bat
```

### Option 2: Manual Setup

1. **Install all dependencies:**

   ```bash
   npm run install:all
   ```

2. **Start both services concurrently:**

   ```bash
   npm run dev:full
   ```

3. **Open your browser:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:3001](http://localhost:3001)
   - Backend Health Check: [http://localhost:3001/health](http://localhost:3001/health)

## 📖 Available Scripts

### Frontend Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend Scripts

- `npm run backend` - Start backend development server
- `npm run backend:install` - Install backend dependencies

### Combined Scripts

- `npm run dev:full` - Start both frontend and backend concurrently
- `npm run install:all` - Install all dependencies (frontend + backend)

## 🎨 Key Components

### Frontend (Next.js)

- **UploadArea** - Drag & drop interface with file validation
- **StatusMessage** - Real-time upload status feedback
- **FileList** - Display uploaded files with remove functionality
- **ShowFileContent** - Real PDF content extraction and display
- **Navigation** - Responsive navigation with active states

### Backend (Node.js)

- **Express Server** - RESTful API for PDF processing
- **PDF Parsing** - Real text extraction using pdf-parse
- **File Upload** - Multer middleware for file handling
- **CORS Support** - Cross-origin resource sharing
- **Error Handling** - Comprehensive error management

## 🔧 Configuration

### Environment Variables

**Frontend (.env.local):**

```env
BACKEND_URL=http://localhost:3001
```

**Backend (.env):**

```env
BACKEND_PORT=3001
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### Backend Configuration

The backend supports:

- **File Size Limit**: 50MB per PDF
- **Text Preview Limit**: 10KB for performance
- **CORS**: Configured for frontend communication
- **Security**: Helmet.js for security headers

## 📝 API Endpoints

### POST /api/parse-pdf

Parses PDF files and extracts content.

**Request:**

- Content-Type: `multipart/form-data`
- Body: Form data with `file` field (PDF file)

**Response:**

```json
{
  "success": true,
  "text": "Extracted PDF content...",
  "pages": 5,
  "info": {
    "title": "Document Title",
    "author": "Document Author",
    "subject": "Document Subject",
    "creator": "PDF Creator",
    "producer": "PDF Producer",
    "creationDate": "2024-01-01T00:00:00.000Z",
    "modDate": "2024-01-01T00:00:00.000Z",
    "keywords": "PDF, Document",
    "language": "en-US"
  }
}
```

### GET /health

Health check endpoint for the backend service.

## 🚀 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Import your repository to Vercel
3. Set environment variable: `BACKEND_URL=your-backend-url`
4. Deploy

### Backend (Railway/Heroku/AWS)

1. Deploy the `backend/` directory
2. Set environment variables
3. Update frontend `BACKEND_URL`

## 🔍 Troubleshooting

### Common Issues

1. **Backend not starting:**

   ```bash
   cd backend && npm install && npm run dev
   ```

2. **CORS errors:**

   - Check `FRONTEND_URL` in backend config
   - Ensure frontend is running on correct port

3. **PDF parsing fails:**

   - Check file size (max 50MB)
   - Ensure file is a valid PDF
   - Check backend logs for specific errors

4. **Port conflicts:**
   - Change `BACKEND_PORT` in backend config
   - Update `BACKEND_URL` in frontend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both frontend and backend
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:

1. Check the backend logs: `cd backend && npm run dev`
2. Check the frontend logs: `npm run dev`
3. Verify both services are running on correct ports
4. Check environment variables are set correctly

---

Built with ❤️ using Next.js 14, Node.js, and Express
