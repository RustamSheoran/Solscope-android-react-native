# SolScope (React Native)

A lightweight Solana explorer and wallet analyzer built with **React Native (Expo)**.

SolScope acts as a "Thin Client" for the Solana blockchain, allowing users to query account details, view transaction history, and eventually swap tokens, all without relying on heavy web3 SDKs for read-only operations.

## 🚀 Features

- **Wallet Analysis**: Instantly fetch SOL balances and view recent activity for any address.
- **Lightweight Architecture**: Uses direct **JSON-RPC** calls via native `fetch()` for optimal performance and minimal bundle size.
- **Modern UI**: Built with a clean, high-fidelity design system using `react-native-safe-area-context` and custom components.
- **Cross-Platform**: Runs smoothly on both Android and iOS.

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev) (Managed Workflow)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Networking**: Native `fetch()` API

## 🏁 Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/RustamSheoran/Solscope-android-react-native.git
    cd Solscope-android-react-native
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    npx expo install
    ```

3.  **Run the app:**
    ```bash
    npx expo start
    ```

    - Press `a` for Android Emulator.
    - Press `i` for iOS Simulator.
    - Scan QR code with Expo Go (Android).

## 📂 Project Structure

```
/app          # Screens and Navigation (Expo Router)
/components   # Reusable UI components
/hooks        # Custom hooks (data fetching, etc.)
/assets       # Static assets
```
