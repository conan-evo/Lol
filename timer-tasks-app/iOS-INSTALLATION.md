# iOS Installation Guide

This guide explains how to install the Timer & Tasks app on your iOS device directly from GitHub.

## 🎯 Quick Start (Recommended)

### Method 1: Expo Go App (Easiest)

1. **Install Expo Go** from the App Store on your iPhone/iPad
2. **Clone the repository** on any computer:
   ```bash
   git clone https://github.com/yourusername/timer-tasks-app.git
   cd timer-tasks-app
   ```
3. **Run the setup script**:
   ```bash
   ./install.sh
   ```
4. **Start the development server**:
   ```bash
   npm start
   ```
5. **Open the app**: Scan the QR code with your iPhone camera or Expo Go app

### Method 2: Direct GitHub Clone on Mac

If you have a Mac, you can run the app directly:

1. **Clone and setup**:
   ```bash
   git clone https://github.com/yourusername/timer-tasks-app.git
   cd timer-tasks-app
   ./install.sh
   ```
2. **Start the app**:
   ```bash
   npm start
   ```
3. **Connect your iPhone**: 
   - Make sure your iPhone and Mac are on the same WiFi network
   - Scan the QR code with Expo Go or your iPhone camera

## 🏗️ Building Native iOS App

For a fully native iOS app experience:

### Prerequisites
- Apple Developer Account ($99/year)
- Mac computer with Xcode
- Expo EAS CLI

### Steps

1. **Install EAS CLI**:
   ```bash
   npm install -g @expo/cli
   ```

2. **Login to Expo**:
   ```bash
   npx expo login
   ```

3. **Configure EAS**:
   ```bash
   npx eas build:configure
   ```

4. **Build for iOS**:
   ```bash
   npx eas build --platform ios
   ```

5. **Install via TestFlight**:
   - The build will be uploaded to App Store Connect
   - Distribute via TestFlight for testing
   - Install on your device through TestFlight app

## 📱 Alternative Installation Methods

### Using Expo Development Build

1. **Create development build**:
   ```bash
   npx eas build --profile development --platform ios
   ```

2. **Install development client**:
   - Download the development build from EAS
   - Install via TestFlight or direct installation

3. **Run with development build**:
   ```bash
   npm start --dev-client
   ```

### Using GitHub Actions (Automated Builds)

Set up automated builds by adding GitHub Actions workflow:

1. **Create `.github/workflows/build.yml`**:
   ```yaml
   name: Build iOS App
   on:
     push:
       branches: [main]
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: actions/setup-node@v2
         - run: npm install
         - run: npx eas build --platform ios --non-interactive
   ```

## 🚀 Publishing to App Store

To publish the app to the App Store:

1. **Build production version**:
   ```bash
   npx eas build --platform ios --profile production
   ```

2. **Submit to App Store**:
   ```bash
   npx eas submit --platform ios
   ```

## 🔧 Troubleshooting

### Common Issues

**"Expo Go not connecting"**
- Ensure both devices are on the same WiFi network
- Try using tunnel mode: `npx expo start --tunnel`

**"Build failed"**
- Check your Apple Developer Account status
- Verify bundle identifier is unique
- Ensure all certificates are valid

**"App crashes on device"**
- Check Expo SDK compatibility
- Verify all dependencies are installed correctly
- Use development build for better debugging

### Getting Help

- Check the [Expo Documentation](https://docs.expo.dev/)
- Visit the [React Native Documentation](https://reactnative.dev/)
- Open an issue on GitHub for app-specific problems

## 📋 Requirements

### Minimum iOS Version
- iOS 11.0 or later
- iPhone 6s or newer
- iPad Air 2 or newer

### Development Requirements
- Node.js 14+
- npm or yarn
- Expo CLI
- Mac computer (for native builds)
- Apple Developer Account (for App Store distribution)

---

**Need help?** Open an issue on GitHub or check the documentation links above! 🚀