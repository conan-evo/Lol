# Timer & Tasks App

A beautiful and intuitive mobile app for tracking time and managing tasks, built with React Native and Expo.

## 🚀 Features

### ⏱️ Timer
- **Simple Time Tracking**: Start, stop, and reset timer with intuitive controls
- **Session History**: View your recent timer sessions with duration and timestamps
- **Clean Interface**: Large, easy-to-read time display with modern UI

### ✅ Task Management
- **Add Tasks**: Create tasks with titles and optional descriptions
- **Edit Tasks**: Modify existing tasks anytime
- **Complete Tasks**: Mark tasks as done with a simple tap
- **Delete Tasks**: Remove tasks you no longer need
- **Visual Status**: Clear visual indicators for completed vs pending tasks

### 💾 Data Persistence
- **Local Storage**: All your data is stored locally on your device using AsyncStorage
- **No Internet Required**: Works completely offline
- **Data Persistence**: Your tasks and timer history persist between app sessions

## 📱 Installation

### Option 1: Install via Expo Go (Recommended for iOS)

1. **Install Expo Go** on your iOS device from the App Store
2. **Clone this repository**:
   ```bash
   git clone https://github.com/yourusername/timer-tasks-app.git
   cd timer-tasks-app
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npx expo start
   ```
5. **Scan the QR code** with your iPhone camera or Expo Go app

### Option 2: Build Native App (Requires Apple Developer Account)

1. **Set up Expo Application Services (EAS)**:
   ```bash
   npm install -g @expo/cli
   npx expo install --fix
   ```
2. **Configure EAS Build**:
   ```bash
   npx expo install expo-dev-client
   npx eas build:configure
   ```
3. **Build for iOS**:
   ```bash
   npx eas build --platform ios
   ```

### Option 3: Expo Development Build

For a more native experience while still using Expo:

1. **Create a development build**:
   ```bash
   npx eas build --profile development --platform ios
   ```
2. **Install the development build** on your device via TestFlight or direct installation

## 🛠️ Development

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- iOS device or simulator

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/timer-tasks-app.git
   cd timer-tasks-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npx expo start
   ```

4. **Run on iOS**:
   - Press `i` to open iOS Simulator
   - Or scan QR code with Expo Go app on your iOS device

### Project Structure

```
timer-tasks-app/
├── App.tsx                 # Main app component with navigation
├── src/
│   ├── screens/
│   │   ├── TimerScreen.tsx  # Timer functionality
│   │   └── TasksScreen.tsx  # Task management
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces
│   └── utils/
│       ├── storage.ts       # AsyncStorage utilities
│       └── time.ts          # Time formatting utilities
├── app.json                # Expo configuration
└── package.json            # Dependencies and scripts
```

## 🏗️ Built With

- **React Native** - Mobile app framework
- **Expo** - Development platform and tools
- **TypeScript** - Type safety
- **React Navigation** - Navigation library
- **AsyncStorage** - Local data persistence
- **Expo Vector Icons** - Beautiful icons

## 📚 Technical Details

### Data Storage

The app uses AsyncStorage to persist data locally on the device:

- **Tasks**: Stored with id, title, description, completion status, and timestamps
- **Timer Sessions**: Stored with duration, start/end times, and optional task linkage
- **Automatic Backup**: Data is automatically saved when modified

### Performance

- **Optimized Rendering**: Uses FlatList for efficient task list rendering
- **Memory Management**: Timer cleanup and proper interval management
- **Minimal Dependencies**: Lightweight package selection for fast startup

### Compatibility

- **iOS**: 11.0+
- **Expo SDK**: 49.0+
- **React Native**: 0.72+

## 🔮 Future Enhancements

- [ ] Timer presets (Pomodoro, custom durations)
- [ ] Task categories and tags
- [ ] Data export functionality
- [ ] Push notifications for timer completion
- [ ] Dark mode support
- [ ] Statistics and analytics
- [ ] Task time tracking integration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or issues, please open an issue on GitHub or contact the development team.

---

**Happy time tracking and task management! ⏰✅**