"use client";

/**
 * Marketplace page - Browse and discover APIs
 */

import { useState } from "react";
import { APICategory } from "@/types/api";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import { wrapFetchWithPayment } from "thirdweb/x402";
import { client } from "@/lib/thirdweb";

// Mock data for demonstration
const mockAPIs = [
  {
    id: "weather-api-1",
    name: "Real-time Weather Data",
    description: "Get current weather data for any location worldwide",
    provider: "0x1234...5678",
    category: APICategory.DATA_FEED,
    pricing: { amount: "$0.01", type: "per_call" },
    stats: { totalCalls: 1250, uptime: 99.9 },
    endpoint: "/api/examples/weather",
    method: "GET",
    params: [{ name: "city", type: "string", required: true, example: "New York" }],
  },
  {
    id: "gpt-4-api",
    name: "AI Text Generation",
    description: "Generate text using AI models",
    provider: "0xabcd...efgh",
    category: APICategory.AI_MODEL,
    pricing: { amount: "$0.05", type: "per_call" },
    stats: { totalCalls: 5420, uptime: 99.5 },
    endpoint: "/api/examples/ai-text",
    method: "POST",
    params: [{ name: "prompt", type: "string", required: true, example: "Write a haiku about blockchain" }],
  },
  {
    id: "image-gen-api",
    name: "AI Image Generation",
    description: "Generate images from text prompts using Stable Diffusion",
    provider: "0x9876...5432",
    category: APICategory.AI_MODEL,
    pricing: { amount: "$0.10", type: "per_call" },
    stats: { totalCalls: 890, uptime: 98.7 },
    endpoint: "/api/examples/image-gen",
    method: "POST",
    params: [{ name: "prompt", type: "string", required: true, example: "A futuristic city" }],
  },
];

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAPI, setSelectedAPI] = useState<any>(null);
  const [testParams, setTestParams] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const account = useActiveAccount();
  const wallet = useActiveWallet();

  const filteredAPIs = mockAPIs.filter((api) => {
    const matchesCategory =
      selectedCategory === "all" || api.category === selectedCategory;
    const matchesSearch =
      api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      api.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleTryAPI = (api: any) => {
    setSelectedAPI(api);
    setResponse(null);
    setError(null);
    // Initialize params with example values
    const initialParams: Record<string, string> = {};
    api.params?.forEach((param: any) => {
      initialParams[param.name] = param.example || "";
    });
    setTestParams(initialParams);
  };

  const handleTestAPI = async () => {
    if (!account || !wallet) {
      setError("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      // Build the URL
      const baseUrl = `${window.location.origin}${selectedAPI.endpoint}`;
      const url = selectedAPI.method === "GET"
        ? `${baseUrl}?${new URLSearchParams(testParams).toString()}`
        : baseUrl;

      const options: RequestInit = {
        method: selectedAPI.method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (selectedAPI.method === "POST") {
        options.body = JSON.stringify(testParams);
      }

      console.log("🔵 Starting x402 payment flow...");
      console.log("Wallet address:", account.address);
      console.log("API endpoint:", url);

      // Wrap fetch with x402 payment handling
      // Max value: $0.01 in USDC (6 decimals)
      const fetchWithPay = wrapFetchWithPayment(
        fetch,
        client,
        wallet, // Use wallet instead of account
        BigInt(10_000) // 0.01 USDC = 10,000 (6 decimals)
      );

      console.log("🔵 Calling API with payment wrapper...");
      const res = await fetchWithPay(url, options);
      console.log("🟢 Response received:", res.status, res.statusText);

      const data = await res.json();

      if (!res.ok) {
        console.error("❌ API error:", data);
        throw new Error(data.error || `HTTP ${res.status}: ${res.statusText}`);
      }

      console.log("✅ API call successful:", data);
      setResponse(data);
    } catch (err: any) {
      console.error("❌ Error in handleTestAPI:", err);

      // Provide more detailed error messages
      let errorMessage = err.message || "Failed to call API";

      if (err.message?.includes("insufficient funds")) {
        errorMessage = "Insufficient USDC balance. Get test USDC from https://faucet.circle.com/";
      } else if (err.message?.includes("user rejected")) {
        errorMessage = "Transaction rejected by user";
      } else if (err.message?.includes("gas")) {
        errorMessage = "Insufficient MATIC for gas fees. Get test MATIC from https://faucet.polygon.technology/";
      } else if (err.message?.includes("settlement")) {
        errorMessage = `Settlement error: ${err.message}. Make sure you have USDC and MATIC on Polygon Amoy testnet.`;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">API Marketplace</h1>
          <p className="text-gray-400">
            Discover and consume APIs with autonomous x402 payments
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search APIs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            <option value={APICategory.DATA_FEED}>Data Feeds</option>
            <option value={APICategory.AI_MODEL}>AI Models</option>
            <option value={APICategory.COMPUTATION}>Computation</option>
            <option value={APICategory.STORAGE}>Storage</option>
            <option value={APICategory.ORACLE}>Oracle</option>
          </select>
        </div>

        {/* API Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAPIs.map((api) => (
            <div
              key={api.id}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{api.name}</h3>
                <span className="bg-blue-600 text-xs px-2 py-1 rounded">
                  {api.category.replace("_", " ")}
                </span>
              </div>
              <p className="text-gray-400 mb-4 text-sm">{api.description}</p>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-2xl font-bold text-green-400">
                    {api.pricing.amount}
                  </div>
                  <div className="text-xs text-gray-500">
                    {api.pricing.type.replace("_", " ")}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">
                    {api.stats.totalCalls.toLocaleString()} calls
                  </div>
                  <div className="text-xs text-green-400">
                    {api.stats.uptime}% uptime
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mb-4">
                Provider: {api.provider}
              </div>
              <button
                onClick={() => handleTryAPI(api)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors"
              >
                Try API
              </button>
            </div>
          ))}
        </div>

        {filteredAPIs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              No APIs found matching your criteria
            </p>
          </div>
        )}
      </div>

      {/* API Testing Modal */}
      {selectedAPI && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedAPI.name}</h2>
                  <p className="text-gray-400 text-sm">{selectedAPI.description}</p>
                </div>
                <button
                  onClick={() => setSelectedAPI(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              {/* API Details */}
              <div className="mb-6 p-4 bg-gray-900 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Method:</span>
                    <span className="ml-2 font-mono text-blue-400">{selectedAPI.method}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Price:</span>
                    <span className="ml-2 font-bold text-green-400">{selectedAPI.pricing.amount}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-400">Endpoint:</span>
                    <span className="ml-2 font-mono text-sm">{selectedAPI.endpoint}</span>
                  </div>
                </div>
              </div>

              {/* Parameters */}
              {selectedAPI.params && selectedAPI.params.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Parameters</h3>
                  {selectedAPI.params.map((param: any) => (
                    <div key={param.name} className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        {param.name}
                        {param.required && <span className="text-red-400 ml-1">*</span>}
                        <span className="text-gray-500 ml-2 text-xs">({param.type})</span>
                      </label>
                      <input
                        type="text"
                        value={testParams[param.name] || ""}
                        onChange={(e) =>
                          setTestParams({ ...testParams, [param.name]: e.target.value })
                        }
                        placeholder={param.example}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Wallet Warning */}
              {!account && (
                <div className="mb-4 p-4 bg-yellow-900 bg-opacity-30 border border-yellow-600 rounded-lg">
                  <p className="text-yellow-400 text-sm">
                    ⚠️ Please connect your wallet to test this API
                  </p>
                </div>
              )}

              {/* Error Display */}
              {error && (
                <div className="mb-4 p-4 bg-red-900 bg-opacity-30 border border-red-600 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Response Display */}
              {response && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Response</h3>
                  <pre className="p-4 bg-gray-900 rounded-lg overflow-x-auto text-sm">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleTestAPI}
                  disabled={isLoading || !account}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  {isLoading ? "Calling API..." : `Test API (${selectedAPI.pricing.amount})`}
                </button>
                <button
                  onClick={() => setSelectedAPI(null)}
                  className="px-6 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

