#!/bin/bash

echo "🚀 Setting up Timer & Tasks App..."

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

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if Expo CLI is installed globally
if ! command -v expo &> /dev/null; then
    echo "📲 Installing Expo CLI globally..."
    npm install -g @expo/cli
fi

echo "✅ Setup complete!"
echo ""
echo "🎉 You can now run the app with:"
echo "   npm start"
echo ""
echo "📱 To install on iOS:"
echo "   1. Install 'Expo Go' from the App Store"
echo "   2. Run 'npm start' and scan the QR code"
echo ""
echo "🔧 For native builds:"
echo "   npm run build:ios"