# SmartGate (React Native)
## Overview
SmartGate is a React Native app designed for face and license plate recognition, leveraging various screens for functionalities such as dashboard control, face recognition (Volti), and car plate identification (Targhe). This app also allows users to configure settings within the app itself.

## Features
- Dashboard: Overview of the app's key functionalities.
- Volti (Faces): Face recognition functionality.
- Targhe (Plates): License plate recognition.
- Cars: Vehicle-related information and identification.
- Impostazione (Settings): Configuration settings for the app.

## Installation
Follow these steps to set up the app locally:

1. Clone the repository:
```bash
git clone https://github.com/your-username/smartgate-react-native.git
cd smartgate-react-native
```
2. Install dependencies: Make sure you have Node.js installed, then run:
```bash
npm install
```
3. Run the app:
```bash
npm start
```
Android/iOS Emulators: For Android:
```bash
npm run android
```
For iOS:
```bash
npm run ios
```

## App Structure
Here’s an overview of the app structure:

- App.js:
  The entry point of the app, which configures navigation and initializes screens like Dashboard, Volti, Targhe, Cars, and Impostazione.
- Screens:
  - Dashboard.js: Displays main dashboard functionalities.
  - Volti.js: Manages the face recognition feature.
  - Targhe.js: Manages the license plate recognition.
  - Cars.js: Contains vehicle-related data.
  - Impostazione.js: Allows the user to configure settings.

## Dependencies
Key dependencies for this project:
- React Native: Core framework.
- React Navigation: For screen navigation.
- React Native Paper: For UI components.
- Expo Splash Screen: To control the splash screen.

Install them by running:
```bash
npm install react-native-paper @react-navigation/native @react-navigation/native-stack expo-splash-screen
```

## How it works
1. The app initializes with a splash screen that stays visible for 2 seconds before transitioning to the main dashboard.
2. Users can navigate between different screens such as Volti, Targhe, and Cars to perform face and plate recognition tasks.
3. The Impostazione screen allows users to customize settings.


## Contribution
Feel free to fork this repository and submit pull requests for any improvements or features.

## License
This project is licensed under the MIT License.
