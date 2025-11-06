/**
 * Core types for the Decentralized API Marketplace
 */

export interface APIListing {
  id: string;
  name: string;
  description: string;
  provider: string; // Ethereum address
  endpoint: string;
  category: APICategory;
  pricing: PricingModel;
  status: APIStatus;
  createdAt: number;
  updatedAt: number;
  metadata: APIMetadata;
  stats: APIStats;
}

export enum APICategory {
  DATA_FEED = "data_feed",
  AI_MODEL = "ai_model",
  COMPUTATION = "computation",
  STORAGE = "storage",
  ORACLE = "oracle",
  OTHER = "other",
}

export enum APIStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  DEPRECATED = "deprecated",
}

export interface PricingModel {
  type: "per_call" | "per_token" | "per_mb" | "subscription";
  amount: string; // In USD string format like "$0.01"
  currency: "USD" | "USDC" | "EUROe";
  asset?: {
    address: string;
    decimals: number;
    symbol: string;
  };
}

export interface APIMetadata {
  version: string;
  documentation?: string;
  tags: string[];
  rateLimit?: {
    requests: number;
    period: "second" | "minute" | "hour" | "day";
  };
  authentication?: {
    type: "x402" | "api_key" | "oauth";
  };
}

export interface APIStats {
  totalCalls: number;
  totalRevenue: string;
  uniqueUsers: number;
  averageResponseTime: number;
  uptime: number; // percentage
}

export interface PaymentReceipt {
  transactionHash: string;
  from: string;
  to: string;
  amount: string;
  asset: string;
  timestamp: number;
  apiId: string;
  endpoint: string;
}

export interface ProviderProfile {
  address: string;
  name: string;
  description?: string;
  website?: string;
  twitter?: string;
  github?: string;
  apis: string[]; // API IDs
  totalRevenue: string;
  reputation: number; // 0-100
  joinedAt: number;
}

export interface ConsumerProfile {
  address: string;
  totalSpent: string;
  apisUsed: string[];
  transactionCount: number;
}

// x402 specific types
export interface X402PaymentData {
  resourceUrl: string;
  method: string;
  paymentData: string | null;
  payTo: string;
  network: any; // Chain object from thirdweb
  price: string | { amount: string; asset: { address: string; decimals: number } };
  facilitator: any;
  routeConfig: {
    description: string;
    mimeType: string;
    maxTimeoutSeconds: number;
  };
}

export interface X402Response {
  status: number;
  responseBody: any;
  responseHeaders: Record<string, string>;
}

