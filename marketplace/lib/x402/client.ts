/**
 * x402 Client utilities for making payments and consuming APIs
 */

import { createThirdwebClient } from "thirdweb";
import { wrapFetchWithPayment } from "thirdweb/x402";

export class X402Client {
  private client: any;
  private wallet: any;
  private maxValue: bigint;

  constructor(clientId: string, wallet: any, maxValue: bigint = BigInt(1_000_000)) {
    this.client = createThirdwebClient({ clientId });
    this.wallet = wallet;
    this.maxValue = maxValue;
  }

  /**
   * Make a request to an x402-enabled API
   */
  async fetch(url: string, options?: RequestInit): Promise<Response> {
    const fetchWithPay = wrapFetchWithPayment(
      fetch,
      this.client,
      this.wallet,
      this.maxValue
    );

    return fetchWithPay(url, options);
  }

  /**
   * Get payment history for the current wallet
   */
  async getPaymentHistory(): Promise<any[]> {
    // TODO: Implement payment history retrieval
    return [];
  }

  /**
   * Get current balance
   */
  async getBalance(): Promise<string> {
    // TODO: Implement balance retrieval
    return "0";
  }
}

/**
 * Create an x402 client instance
 */
export function createX402Client(
  clientId: string,
  wallet: any,
  maxValue?: bigint
): X402Client {
  return new X402Client(clientId, wallet, maxValue);
}

