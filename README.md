# SmartGate (React Native)

## Overview
SmartGate is a React Native app designed for face and license plate recognition, integrating with a server to manage and control gate access. The app provides various screens, such as the dashboard, face recognition (Volti), license plate recognition (Targhe), and settings (Impostazione), allowing users to manage access data and configure settings directly from a mobile device.

## Features
- **Dashboard**: Overview of the app's key functionalities.
- **Volti (Faces)**: Upload and manage face data for recognition.
- **Targhe (Plates)**: Upload and manage license plate data for recognition.
- **Cars**: View vehicle-related information and identification.
- **Impostazione (Settings)**: Configure the app settings and server connection.

### Server Integration
The app connects to the SmartGate server to manage recognized faces and license plates:
- Users can **upload new face images** or license plate photos directly to the server from their mobile device. 
- Once uploaded, the server processes these images and updates the database for real-time recognition at the gate.
- Future updates will allow for **removal** of faces and license plates, as well as editing existing entries.

### Upcoming Features
- **User group management**: Set up user groups with different access levels.
- **Access control customization**: Control gate permissions for specific users or groups.
- **Expanded settings**: Further customization options for recognition accuracy, alerts, and more.

## Installation
To set up the app locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Nikkio083/SmartGateApp.git
    cd smartgate-react-native
    ```
2. Install dependencies (ensure you have Node.js installed):
    ```bash
    npm install
    ```
3. Run the app:
    ```bash
    npm start
    ```
   For Android:
    ```bash
    npm run android
    ```
   For iOS:
    ```bash
    npm run ios
    ```

## App Structure
Here’s an overview of the app structure:

- **App.js**: The entry point of the app, initializing navigation and screens such as Dashboard, Volti, Targhe, Cars, and Impostazione.
- **Screens**:
  - **Dashboard.js**: Displays the main dashboard functionalities.
  - **Volti.js**: Manages face recognition tasks and uploads.
  - **Targhe.js**: Handles license plate recognition and uploads.
  - **Cars.js**: Contains vehicle-related information.
  - **Impostazione.js**: Provides options to configure server settings and app preferences.

## Dependencies
Key dependencies for this project:
- React Native: Core framework.
- React Navigation: For screen navigation.
- React Native Paper: For UI components.
- Expo Splash Screen: Controls the splash screen.

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
