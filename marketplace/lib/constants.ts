/**
 * Application constants and configuration
 */

// USDC Token Configuration for Polygon Amoy Testnet
export const USDC_AMOY = {
  address: "0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582", // Official Circle USDC on Polygon Amoy
  decimals: 6,
  symbol: "USDC",
  name: "USD Coin",
} as const;

// USDC Token Configuration for Polygon Mainnet
export const USDC_POLYGON = {
  address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
  decimals: 6,
  symbol: "USDC",
  name: "USD Coin",
} as const;

// Get the appropriate USDC config based on environment
export const USDC_TOKEN = process.env.NEXT_PUBLIC_IS_TESTNET === "true" 
  ? USDC_AMOY 
  : USDC_POLYGON;

// Network Configuration
export const NETWORK_CONFIG = {
  chainId: process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? 80002 : 137,
  name: process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? "Polygon Amoy" : "Polygon",
  rpcUrl: process.env.NEXT_PUBLIC_IS_TESTNET === "true" 
    ? "https://rpc-amoy.polygon.technology/"
    : "https://polygon-rpc.com/",
  blockExplorer: process.env.NEXT_PUBLIC_IS_TESTNET === "true"
    ? "https://amoy.polygonscan.com/"
    : "https://polygonscan.com/",
} as const;

// Payment Configuration
export const PAYMENT_CONFIG = {
  maxPaymentAmount: "$1.00", // Maximum payment per API call
  maxPaymentValue: BigInt(1_000_000), // 1 USDC in smallest units (6 decimals)
  defaultTimeout: 300, // 5 minutes
} as const;

// API Categories
export const API_CATEGORIES = {
  DATA_FEED: "data_feed",
  AI_MODEL: "ai_model",
  COMPUTATION: "computation",
  STORAGE: "storage",
  ORACLE: "oracle",
} as const;

// Faucet Links
export const FAUCETS = {
  matic: "https://faucet.polygon.technology/",
  usdc: "https://faucet.circle.com/",
  alchemy: "https://www.alchemy.com/faucets/polygon-amoy",
} as const;

// External Links
export const LINKS = {
  docs: "https://portal.thirdweb.com/payments/x402",
  github: "https://github.com/microchipgnu/MCPay",
  explorer: NETWORK_CONFIG.blockExplorer,
  thirdweb: "https://thirdweb.com",
} as const;

