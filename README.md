# Solana Wallet Tracker

A clean, interactive front-end for tracking Solana wallet activity. Users can paste in a wallet address to see portfolio details, recent trades, a leaderboard of top performers, and simulated performance stats.

## Features

- **Wallet Input Form**  
  Paste a Solana wallet address to load sample data.

- **Portfolio Overview**  
  Displays total wins, profit percentage, last 5 trades (with win/loss icons), and a sparkline chart.

- **Top Trenchers Leaderboard**  
  Ranks wallets by ROI, reward amount, and trade count. Includes hover effects and animated sorting tabs.

- **Live Big Wins Feed**  
  Auto-rotating ticker of recent high-profit plays (fake data).

- **Gambling Stats Panel**  
  Shows aggregated stats like:
  - Wallets Tracked
  - Total SOL Moved Today
  - Top ROI Wallet
  - Avg Win Rate

- **Smooth UI**  
  Uses glassmorphic cards, dark-mode palette, neon glow accents, and scroll-triggered animations.

## Tech Stack

- Built with **Next.js** or **React** (prompt-generated frontend layout)  
- Uses **sample data**; no live API integration out of the box  
- Fully styled for real-world feel with polished UX interactions

## Deployment

Any static or Node.js-capable host can serve the build:

```bash
npm install
npm run build
npm start
