# PDF Uploader - Full Stack Application

A modern, full-featured PDF upload application built with Next.js 14 (App Router) frontend and a dedicated Node.js backend for reliable PDF parsing. This application demonstrates best practices for building scalable full-stack applications with separate frontend and backend services.

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
├── client/                 # Next.js Frontend
│   ├── app/               # App Router directory
│   │   ├── api/           # API routes (proxies to backend)
│   │   │   └── parse-pdf/ # PDF parsing endpoint
│   │   ├── components/    # Reusable components
│   │   │   ├── Navigation.tsx
│   │   │   ├── UploadArea.tsx
│   │   │   ├── StatusMessage.tsx
│   │   │   ├── FileList.tsx
│   │   │   └── ShowFileContent.tsx
│   │   ├── about/         # About page route
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── package.json       # Frontend dependencies
│   ├── next.config.js     # Next.js configuration
│   ├── tailwind.config.ts # Tailwind CSS configuration
│   └── tsconfig.json      # TypeScript configuration
├── server/                # Node.js Backend
│   ├── server.js          # Express server
│   ├── package.json       # Backend dependencies
│   └── config.js          # Backend configuration
├── package.json           # Root package.json with scripts
├── start.sh              # Linux/Mac startup script
├── start.bat             # Windows startup script
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
   npm run dev
   ```

3. **Open your browser:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:3001](http://localhost:3001)
   - Backend Health Check: [http://localhost:3001/health](http://localhost:3001/health)

## 📖 Available Scripts

### Root Scripts

- `npm run install:all` - Install all dependencies (root + client + server)
- `npm run dev` - Start both frontend and backend concurrently
- `npm run dev:client` - Start only the frontend
- `npm run dev:server` - Start only the backend
- `npm run build` - Build the frontend for production
- `npm run start` - Start the frontend in production mode
- `npm run server` - Start the backend in production mode

### Client Scripts (in client/ directory)

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Server Scripts (in server/ directory)

- `npm run dev` - Start backend with nodemon
- `npm start` - Start backend in production mode

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

**Client (.env.local in client/ directory):**

```env
BACKEND_URL=http://localhost:3001
```

**Server (.env in server/ directory):**

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
3. Set build command: `cd client && npm run build`
4. Set environment variable: `BACKEND_URL=your-backend-url`
5. Deploy

### Backend (Railway/Heroku/AWS)

1. Deploy the `server/` directory
2. Set environment variables
3. Update frontend `BACKEND_URL`

## 🔍 Troubleshooting

### Common Issues

1. **Backend not starting:**

   ```bash
   cd server && npm install && npm run dev
   ```

2. **Frontend not starting:**

   ```bash
   cd client && npm install && npm run dev
   ```

3. **CORS errors:**

   - Check `FRONTEND_URL` in server config
   - Ensure frontend is running on correct port

4. **PDF parsing fails:**

   - Check file size (max 50MB)
   - Ensure file is a valid PDF
   - Check server logs for specific errors

5. **Port conflicts:**
   - Change `BACKEND_PORT` in server config
   - Update `BACKEND_URL` in frontend

### Development Workflow

1. **Start both services:**

   ```bash
   npm run dev
   ```

2. **Start only frontend:**

   ```bash
   npm run dev:client
   ```

3. **Start only backend:**

   ```bash
   npm run dev:server
   ```

4. **Install dependencies:**
   ```bash
   npm run install:all
   ```

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

1. Check the server logs: `cd server && npm run dev`
2. Check the frontend logs: `cd client && npm run dev`
3. Verify both services are running on correct ports
4. Check environment variables are set correctly

---

Built with ❤️ using Next.js 14, Node.js, and Express
