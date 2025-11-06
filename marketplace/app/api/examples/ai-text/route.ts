/**
 * Example x402-enabled API: AI Text Generation
 * This demonstrates a more expensive API endpoint
 */

import { NextRequest, NextResponse } from "next/server";
import { createX402Server } from "@/lib/x402/server";

const x402Server = createX402Server(
  process.env.THIRDWEB_SECRET_KEY || "demo-key",
  process.env.SERVER_WALLET_ADDRESS || "0x0000000000000000000000000000000000000000",
  process.env.NEXT_PUBLIC_IS_TESTNET === "true"
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const paymentData = request.headers.get("x-payment");
    const resourceUrl = request.url;

    // Settle the payment - $0.05 per call
    const result = await x402Server.settlePayment(
      resourceUrl,
      "POST",
      paymentData,
      "$0.05"
    );

    if (result.status === 200) {
      // Mock AI response
      const aiResponse = {
        prompt,
        completion: `This is a mock AI-generated response to: "${prompt}". In a real implementation, this would call an actual AI model.`,
        model: "gpt-4-mock",
        tokens: Math.floor(Math.random() * 100) + 50,
        timestamp: new Date().toISOString(),
      };

      return NextResponse.json(aiResponse, {
        status: 200,
        headers: result.responseHeaders,
      });
    } else {
      return NextResponse.json(result.responseBody, {
        status: result.status,
        headers: result.responseHeaders,
      });
    }
  } catch (error) {
    console.error("AI Text API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

