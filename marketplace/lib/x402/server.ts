/**
 * x402 Server utilities for accepting payments
 */

import { createThirdwebClient } from "thirdweb";
import { polygon, polygonAmoy } from "thirdweb/chains";
import type { X402PaymentData, X402Response } from "@/types/api";
import { USDC_TOKEN } from "@/lib/constants";

export class X402Server {
  private client: any;
  private facilitatorBaseUrl: string;
  private serverWalletAddress: string;
  private network: any;

  constructor(
    secretKey: string,
    serverWalletAddress: string,
    isTestnet: boolean = true
  ) {
    this.client = createThirdwebClient({ secretKey });
    this.serverWalletAddress = serverWalletAddress;
    this.network = isTestnet ? polygonAmoy : polygon;

    // Use Corbits facilitator which supports Polygon without EIP-7702
    // Alternative facilitators:
    // - PayAI: https://facilitator.payai.network
    // - x402.rs: https://facilitator.x402.rs
    this.facilitatorBaseUrl = "https://facilitator.corbits.dev";
  }

  /**
   * Settle a payment for an API call using Corbits facilitator HTTP API
   */
  async settlePayment(
    resourceUrl: string,
    method: string,
    paymentData: string | null,
    price: string
  ): Promise<X402Response> {
    // Convert USD string price to USDC token amount
    // e.g., "$0.01" -> 10000 (0.01 USDC with 6 decimals)
    const usdAmount = parseFloat(price.replace('$', ''));
    const tokenAmount = Math.floor(usdAmount * Math.pow(10, USDC_TOKEN.decimals)).toString();

    console.log("🔵 Server: Settling payment with config:", {
      resourceUrl,
      method,
      payTo: this.serverWalletAddress,
      network: this.network.id,
      tokenAmount,
      hasPaymentData: !!paymentData,
    });

    // If no payment data, return 402 Payment Required
    if (!paymentData) {
      const response402: X402Response = {
        status: 402,
        responseBody: {
          x402Version: 1,
          error: "X-PAYMENT header is required",
          accepts: [
            {
              scheme: "exact",
              network: `eip155:${this.network.id}`,
              maxAmountRequired: tokenAmount,
              resource: resourceUrl,
              description: "Access to paid API content",
              mimeType: "application/json",
              payTo: this.serverWalletAddress,
              maxTimeoutSeconds: 300,
              asset: USDC_TOKEN.address,
            },
          ],
        },
        responseHeaders: {
          "Content-Type": "application/json",
        },
      };
      return response402;
    }

    // Call Corbits facilitator HTTP API to settle payment
    try {
      const facilitatorResponse = await fetch(`${this.facilitatorBaseUrl}/settle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          x402Version: 1,
          paymentHeader: paymentData, // Pass the base64-encoded string directly
          paymentRequirements: {
            scheme: "exact",
            network: `eip155:${this.network.id}`,
            maxAmountRequired: tokenAmount,
            resource: resourceUrl,
            description: "Access to paid API content",
            mimeType: "application/json",
            payTo: this.serverWalletAddress,
            maxTimeoutSeconds: 300,
            asset: USDC_TOKEN.address,
          },
        }),
      });

      const facilitatorData = await facilitatorResponse.json();

      if (facilitatorResponse.ok) {
        console.log("✅ Server: Payment settled successfully!");
        return {
          status: 200,
          responseBody: facilitatorData,
          responseHeaders: {
            "Content-Type": "application/json",
          },
        };
      } else {
        console.log("🔴 Server: Settlement failed:", facilitatorData);
        return {
          status: 402,
          responseBody: {
            x402Version: 1,
            error: "Settlement error",
            errorMessage: facilitatorData.error || "Failed to settle payment",
            accepts: [
              {
                scheme: "exact",
                network: `eip155:${this.network.id}`,
                maxAmountRequired: tokenAmount,
                resource: resourceUrl,
                description: "Access to paid API content",
                mimeType: "application/json",
                payTo: this.serverWalletAddress,
                maxTimeoutSeconds: 300,
                asset: USDC_TOKEN.address,
              },
            ],
          },
          responseHeaders: {
            "Content-Type": "application/json",
          },
        };
      }
    } catch (error: any) {
      console.error("🔴 Server: Facilitator error:", error);
      return {
        status: 402,
        responseBody: {
          x402Version: 1,
          error: "Settlement error",
          errorMessage: error.message || "Failed to connect to facilitator",
          accepts: [
            {
              scheme: "exact",
              network: `eip155:${this.network.id}`,
              maxAmountRequired: tokenAmount,
              resource: resourceUrl,
              description: "Access to paid API content",
              mimeType: "application/json",
              payTo: this.serverWalletAddress,
              maxTimeoutSeconds: 300,
              asset: USDC_TOKEN.address,
            },
          ],
        },
        responseHeaders: {
          "Content-Type": "application/json",
        },
      };
    }
  }

  /**
   * Verify a payment without settling using Corbits facilitator HTTP API
   */
  async verifyPayment(
    resourceUrl: string,
    method: string,
    paymentData: string | null,
    price: string
  ): Promise<X402Response> {
    // Convert USD string price to USDC token amount
    const usdAmount = parseFloat(price.replace('$', ''));
    const tokenAmount = Math.floor(usdAmount * Math.pow(10, USDC_TOKEN.decimals)).toString();

    if (!paymentData) {
      return {
        status: 402,
        responseBody: {
          x402Version: 1,
          error: "X-PAYMENT header is required",
        },
        responseHeaders: {
          "Content-Type": "application/json",
        },
      };
    }

    try {
      const facilitatorResponse = await fetch(`${this.facilitatorBaseUrl}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          x402Version: 1,
          paymentHeader: paymentData, // Pass the base64-encoded string directly
          paymentRequirements: {
            scheme: "exact",
            network: `eip155:${this.network.id}`,
            maxAmountRequired: tokenAmount,
            resource: resourceUrl,
            description: "Access to paid API content",
            mimeType: "application/json",
            payTo: this.serverWalletAddress,
            maxTimeoutSeconds: 300,
            asset: USDC_TOKEN.address,
          },
        }),
      });

      const facilitatorData = await facilitatorResponse.json();

      return {
        status: facilitatorResponse.ok ? 200 : 402,
        responseBody: facilitatorData,
        responseHeaders: {
          "Content-Type": "application/json",
        },
      };
    } catch (error: any) {
      return {
        status: 402,
        responseBody: {
          x402Version: 1,
          error: "Verification error",
          errorMessage: error.message || "Failed to verify payment",
        },
        responseHeaders: {
          "Content-Type": "application/json",
        },
      };
    }
  }

  /**
   * Create a payment middleware for Next.js API routes
   */
  createPaymentMiddleware(price: string) {
    return async (request: Request): Promise<X402Response | null> => {
      const paymentData = request.headers.get("x-payment");
      const url = new URL(request.url);

      const result = await this.settlePayment(
        url.toString(),
        request.method,
        paymentData,
        price
      );

      if (result.status === 200) {
        return null; // Payment successful, continue
      }

      return result; // Return 402 response
    };
  }
}

/**
 * Create an x402 server instance
 */
export function createX402Server(
  secretKey: string,
  serverWalletAddress: string,
  isTestnet: boolean = true
): X402Server {
  return new X402Server(secretKey, serverWalletAddress, isTestnet);
}

