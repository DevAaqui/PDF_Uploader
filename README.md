# PDF Uploader - Next.js App Router Boilerplate

A modern, full-featured PDF upload application built with Next.js 14 and the App Router. This boilerplate demonstrates best practices for building scalable web applications with the latest Next.js features.

## 🚀 Features

- **Next.js 14 App Router** - Latest routing system with file-based routing
- **TypeScript** - Full type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Drag & Drop Upload** - Intuitive file upload interface
- **Responsive Design** - Mobile-first approach with beautiful UI
- **API Routes** - Server-side API endpoints for file handling
- **Modern Icons** - Lucide React icons for consistent design
- **ESLint** - Code quality and consistency

## 📁 Project Structure

```
PDF_Uploader/
├── app/                    # App Router directory
│   ├── api/               # API routes
│   │   └── upload/        # File upload endpoint
│   ├── components/        # Reusable components
│   │   └── Navigation.tsx # Navigation component
│   ├── about/             # About page route
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── public/                # Static assets
├── .eslintrc.json         # ESLint configuration
├── .gitignore            # Git ignore rules
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies and scripts
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd PDF_Uploader
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📖 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Key Components

### App Router Structure

The application uses Next.js 14's App Router with the following structure:

- **`app/layout.tsx`** - Root layout with navigation and global styles
- **`app/page.tsx`** - Home page with drag & drop upload functionality
- **`app/about/page.tsx`** - About page demonstrating nested routing
- **`app/api/upload/route.ts`** - API endpoint for file uploads

### Components

- **Navigation** - Responsive navigation bar with active state indicators
- **File Upload** - Drag & drop interface with file validation
- **File List** - Display uploaded files with remove functionality

## 🔧 Configuration

### Tailwind CSS

The project is configured with Tailwind CSS for styling. The configuration can be found in `tailwind.config.ts`.

### TypeScript

Full TypeScript support with strict mode enabled. Configuration in `tsconfig.json`.

### ESLint

Code quality is maintained with ESLint using Next.js recommended rules.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository to Vercel
3. Deploy automatically

### Other Platforms

The application can be deployed to any platform that supports Node.js:

```bash
npm run build
npm run start
```

## 📝 API Endpoints

### POST /api/upload

Handles file uploads with validation.

**Request:**

- Content-Type: `multipart/form-data`
- Body: Form data with `files` field

**Response:**

```json
{
  "message": "Files uploaded successfully",
  "files": [
    {
      "name": "document.pdf",
      "size": 1024000,
      "type": "application/pdf",
      "lastModified": 1234567890
    }
  ],
  "count": 1
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions, please:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Search existing issues
3. Create a new issue with detailed information

---

Built with ❤️ using Next.js 14 and the App Router
