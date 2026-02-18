# SolScope React Native Migration Context

## 🎯 Goal

Rebuild SolScope as a **"Thin Client" Android application using React Native (Expo)** to align with the [100xMobile Bootcamp](https://ishanlakhwani.notion.site/100xMobile-Bootcamp-30178c0ed26f807fb884eab53cbd8e5c) curriculum.

## 🛠️ Tech Stack & Architecture

- **Framework:** Expo (Managed Workflow)
- **Language:** TypeScript
- **Navigation:** `expo-router` (File-based routing with `(tabs)`)
- **Networking:** Native `fetch()` for JSON-RPC (Helius/QuickNode). **No heavy SDKs** (like `@solana/web3.js`) initially, to maintain lightweight performance.
- **State Management:** Zustand (User public key, SOL price, Watchlist).
- **Styling:** `StyleSheet`, `react-native-safe-area-context`, and `expo-blur` for Glassmorphism.

## 📱 Features & Scope

1.  **SolScan Lite (Phase 1)**:
    - Fetch SOL Balance using raw JSON-RPC (`getAccountInfo`).
    - Display recent activity/airdrops.
2.  **Swap UI (Phase 2)**:
    - High-fidelity port of the "Clay" and "Glass" design system.
    - Components: `ClayButton`, `GlassCard`, `SwapCard`.
3.  **Wallet Integration (Phase 3)**:
    - Solana Mobile Wallet Adapter (MWA) for connecting generic wallets (Phantom, Solflare).
    - Jupiter Aggregator v6 API for swap quotes.

## 📝 Implementation Plan

### 1. Project Initialization

- [ ] Initialize with `npx create-expo-app -t expo-template-blank-typescript .`
- [ ] **IMMEDIATE ACTION**: Commit and push "Initial commit" to GitHub before writing feature code.

### 2. Navigation Structure

- Create `app/(tabs)/_layout.tsx` for Bottom Tabs (Wallet, Swap).
- Create `app/_layout.tsx` for Root Stack and Providers.

### 3. Core Components (Design System)

- **`ClayButton`**: Reusable component with shadow/elevation props (Figma fidelity).
- **`GlassCard`**: Using `expo-blur` and translucent backgrounds.
- **`TokenRow`**: For the token selection modal.

### 4. Logic & Integration

- **RPC Hook**: Create `useSolanaRpc` hook to wrap `fetch` calls.
- **Jupiter API**: Implement `fetchQuote` using Jupiter v6 REST API.
- **Wallet Adapter**: Integrate `@solana-mobile/mobile-wallet-adapter-protocol`.

## ⚠️ Important Notes

- **Do not use `npm install @solana/web3.js` immediately.** Stick to `fetch` for read-only data first.
- **Design Fidelity:** The UI must match the specific "Glass/Clay" aesthetic provided in the bootcamp Figma.
