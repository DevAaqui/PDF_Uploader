@echo off
echo 🚀 Starting PDF Uploader Application...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo 📦 Installing dependencies...

REM Install root dependencies
echo Installing root dependencies...
npm install

REM Install client dependencies
echo Installing client dependencies...
cd client
npm install
cd ..

REM Install server dependencies
echo Installing server dependencies...
cd server
npm install
cd ..

echo.
echo ✅ Dependencies installed successfully!
echo.

REM Start both services concurrently
echo 🚀 Starting frontend and backend services...
echo Frontend will be available at: http://localhost:3000
echo Backend will be available at: http://localhost:3001
echo.

npm run dev 