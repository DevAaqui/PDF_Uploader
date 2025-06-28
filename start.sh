#!/bin/bash

echo "🚀 Starting PDF Uploader Application..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."

# Install root dependencies
echo "Installing root dependencies..."
npm install

# Install client dependencies
echo "Installing client dependencies..."
cd client && npm install && cd ..

# Install server dependencies
echo "Installing server dependencies..."
cd server && npm install && cd ..

echo ""
echo "✅ Dependencies installed successfully!"
echo ""

# Start both services concurrently
echo "🚀 Starting frontend and backend services..."
echo "Frontend will be available at: http://localhost:3000"
echo "Backend will be available at: http://localhost:3001"
echo ""

npm run dev 