/**
 * x402 Payment Proxy API Route
 * This endpoint acts as a gateway for all API calls, handling x402 payments
 */

import { NextRequest, NextResponse } from "next/server";
import { createX402Server } from "@/lib/x402/server";

const x402Server = createX402Server(
  process.env.THIRDWEB_SECRET_KEY!,
  process.env.SERVER_WALLET_ADDRESS!,
  process.env.NEXT_PUBLIC_IS_TESTNET === "true"
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { apiId, endpoint, method = "GET", price, description } = body;

    if (!apiId || !endpoint || !price) {
      return NextResponse.json(
        { error: "Missing required fields: apiId, endpoint, price" },
        { status: 400 }
      );
    }

    // Get payment data from headers
    const paymentData = request.headers.get("x-payment");
    const resourceUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/x402/proxy?apiId=${apiId}`;

    // Settle the payment
    const result = await x402Server.settlePayment(
      resourceUrl,
      method,
      paymentData,
      price
    );

    if (result.status === 200) {
      // Payment successful, proxy the request to the actual API
      try {
        const apiResponse = await fetch(endpoint, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await apiResponse.json();

        return NextResponse.json(data, {
          status: apiResponse.status,
          headers: {
            ...result.responseHeaders,
            "X-API-ID": apiId,
          },
        });
      } catch (error) {
        return NextResponse.json(
          { error: "Failed to fetch from API endpoint" },
          { status: 500 }
        );
      }
    } else {
      // Payment required or failed
      return NextResponse.json(result.responseBody, {
        status: result.status,
        headers: result.responseHeaders,
      });
    }
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const apiId = searchParams.get("apiId");
  const endpoint = searchParams.get("endpoint");
  const price = searchParams.get("price");

  if (!apiId || !endpoint || !price) {
    return NextResponse.json(
      { error: "Missing required query parameters: apiId, endpoint, price" },
      { status: 400 }
    );
  }

  const paymentData = request.headers.get("x-payment");
  const resourceUrl = request.url;

  const result = await x402Server.settlePayment(
    resourceUrl,
    "GET",
    paymentData,
    price
  );

  if (result.status === 200) {
    try {
      const apiResponse = await fetch(endpoint);
      const data = await apiResponse.json();

      return NextResponse.json(data, {
        status: apiResponse.status,
        headers: {
          ...result.responseHeaders,
          "X-API-ID": apiId,
        },
      });
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch from API endpoint" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(result.responseBody, {
      status: result.status,
      headers: result.responseHeaders,
    });
  }
}

