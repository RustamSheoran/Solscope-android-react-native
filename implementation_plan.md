# Implementation Plan - SolScope React Native Migration

## Goal

Rebuild the SolScope Android application using React Native to enable cross-platform support while maintaining the high-fidelity "Glassmorphism" and "Claymorphism" design aesthetic.

## User Review Required

> [!IMPORTANT]
> **Workspace Access**: I currently do not have write access to `/home/rustam/React-Native-Solscope`. Please add this folder to your workspace or allow me to create it in the current directory.

## Proposed Changes

### 1. Project Initialization

- **Framework**: **Expo** (Managed workflow) as recommended by the curriculum.
- **Language**: **TypeScript**.
- **Navigation**: **Expo Router** (File-based routing, `(tabs)` structure).
- **Location**: `/home/rustam/React-Native-Solscope` (Requires workspace access).

### 2. Architecture: "Thin Client" (Bootcamp Style)

- **Networking**: Use native `fetch()` for JSON-RPC calls (`getAccountInfo`, `getBalance`, `kline` data) instead of heavy SDKs initially. This mirrors the "SolScan Lite" approach.
- **State**: **Zustand** for lightweight global state (managing User's Public Key, Sol Price, Watchlist).
- **Crypto**: `ed25519` logic for key management if needed, but primarily focusing on read-only RPC first.

### 3. UI/UX Porting (Design System)

Refcreate the custom "Clay" and "Glass" styles using React Native's styling engine.

- **Glassmorphism**: Use `expo-blur` for the blur effects and semi-transparent backgrounds.
- **Claymorphism**: Use heavily shadowed `View` components with high border radius to replicate the "soft UI" feel.

### 4. Key Components (Assignment 2: Swap UI)

- **`ClayButton`**: Reusable component with shadow/elevation props to match Figma.
- **`GlassCard`**: Using `expo-blur` and translucent backgrounds.
- **`SwapCard`**: Complex stateful component for token selection and amount input.
- **`TokenRow`**: For the token selection modal.

### 5. Solana Integration (SolScan Lite Pattern)

- **RPC Client**: Custom hook `useSolanaRpc` to wrap `fetch` calls to Helius/QuickNode/Mainnet-Beta.
- **Wallet Adapter**: `@solana-mobile/mobile-wallet-adapter-protocol` (MWA) for the "Connect" button in the final phase.
- **Swap Logic**: Route queries to Jupiter API v6 (REST) via `fetch`.

## Verification Plan

### Automated Tests

- Type checking with `tsc`.
- Basic unit tests for utility functions (like price formatting).

### Manual Verification

- **Run on Android Emulator**: `npx expo run:android`
- **Wallet Connect**: Test connecting a mock wallet or Phantom.
- **Swap Flow**: Verify the quote retrieval and UI update loop.
