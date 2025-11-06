/**
 * Example x402-enabled API: Weather Data
 * This demonstrates how to create a paid API endpoint
 */

import { NextRequest, NextResponse } from "next/server";
import { createX402Server } from "@/lib/x402/server";

// Initialize x402 server
const x402Server = createX402Server(
  process.env.THIRDWEB_SECRET_KEY || "demo-key",
  process.env.SERVER_WALLET_ADDRESS || "0x0000000000000000000000000000000000000000",
  process.env.NEXT_PUBLIC_IS_TESTNET === "true"
);

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get("city") || "San Francisco";

    // Get payment data from headers
    const paymentData = request.headers.get("x-payment");
    const resourceUrl = request.url;

    // Settle the payment - $0.01 per call
    const result = await x402Server.settlePayment(
      resourceUrl,
      "GET",
      paymentData,
      "$0.01" // Price per call
    );

    // If payment is successful (status 200), return the data
    if (result.status === 200) {
      // Mock weather data
      const weatherData = {
        city,
        temperature: Math.floor(Math.random() * 30) + 10,
        condition: ["Sunny", "Cloudy", "Rainy", "Partly Cloudy"][
          Math.floor(Math.random() * 4)
        ],
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 20) + 5,
        timestamp: new Date().toISOString(),
      };

      return NextResponse.json(weatherData, {
        status: 200,
        headers: result.responseHeaders,
      });
    } else {
      // Payment required or failed - return 402 response
      return NextResponse.json(result.responseBody, {
        status: result.status,
        headers: result.responseHeaders,
      });
    }
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

