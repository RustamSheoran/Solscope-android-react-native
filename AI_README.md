# AI README - SolScope React Native Migration

## 🚀 Context
This project is a complete rewrite of the SolScope Android app using **React Native (Expo)**. 
**Goal:** Build a "Thin Client" Solana wallet analyzer and swap interface.

## 📚 Source of Truth
- **Curriculum:** [100xMobile Bootcamp Notion](https://ishanlakhwani.notion.site/100xMobile-Bootcamp-30178c0ed26f807fb884eab53cbd8e5c)
- **Reference:** SolScan Lite & Swap UI Assignment (Class 1 & 2)

## 🛠️ Tech Stack
- **Framework:** Expo (Managed Workflow)
- **Language:** TypeScript
- **Navigation:** `expo-router` with `(tabs)`
- **Networking:** Native `fetch()` for JSON-RPC (Helius/QuickNode) - *No web3.js initially*
- **State:** Zustand (Wallet, Watchlist)
- **Styling:** `StyleSheet` / `react-native-safe-area-context`

## 📋 Immediate Tasks
1.  **Initialize Project:** `npx create-expo-app -t expo-template-blank-typescript .`
2.  **Setup Navigation:** Create `app/(tabs)/_layout.tsx` and `app/_layout.tsx`.
3.  **Port Design:** Implement `ClayButton` and `GlassCard` from Figma designs.

## 🔗 Architecture Notes
- **RPC:** We use raw JSON-RPC calls for speed and "thin client" architecture.
- **Wallet:** Mobile Wallet Adapter (MWA) will be integrated in Phase 3.
- **Swap:** Jupiter V6 Quote API via REST.

**Maintained by:** Antigravity (Google Deepmind)
