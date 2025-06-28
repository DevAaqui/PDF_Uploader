export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            About PDF Uploader
          </h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              PDF Uploader is a modern web application built with Next.js 14 and
              the App Router. It provides a seamless experience for uploading
              and managing PDF files with a beautiful, responsive interface.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Features
            </h2>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Drag and drop file upload</li>
              <li>Multiple file selection</li>
              <li>Real-time file validation</li>
              <li>Responsive design</li>
              <li>Modern UI with Tailwind CSS</li>
              <li>TypeScript support</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Technology Stack
            </h2>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Next.js 14 with App Router</li>
              <li>React 18</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Lucide React Icons</li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Getting Started
              </h3>
              <p className="text-blue-700">
                Run{" "}
                <code className="bg-blue-100 px-2 py-1 rounded">
                  npm run dev
                </code>{" "}
                to start the development server and visit{" "}
                <code className="bg-blue-100 px-2 py-1 rounded">
                  http://localhost:3000
                </code>{" "}
                to see the application.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
