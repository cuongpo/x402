/**
 * Home page - Marketplace landing
 */

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Decentralized API Marketplace
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            The first marketplace where AI agents can discover and consume APIs
            with autonomous x402 payments on Polygon. No API keys, no
            subscriptions, just pay-per-use.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/marketplace"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse APIs
            </Link>
            <Link
              href="/provider"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              List Your API
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2">AI Agent Ready</h3>
            <p className="text-gray-400">
              Built for autonomous AI agents to discover and consume APIs
              without human intervention.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">x402 Payments</h3>
            <p className="text-gray-400">
              Seamless micropayments using the x402 protocol. Pay only for what
              you use, when you use it.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-xl font-bold mb-2">On Polygon</h3>
            <p className="text-gray-400">
              Low-cost, fast transactions on Polygon blockchain. Perfect for
              high-frequency API calls.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h4 className="font-semibold mb-2">Discover APIs</h4>
              <p className="text-sm text-gray-400">
                Browse the marketplace for data feeds, AI models, and more
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h4 className="font-semibold mb-2">Connect Wallet</h4>
              <p className="text-sm text-gray-400">
                Connect your wallet with USDC on Polygon
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h4 className="font-semibold mb-2">Make Request</h4>
              <p className="text-sm text-gray-400">
                Call the API - payment is handled automatically
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h4 className="font-semibold mb-2">Get Response</h4>
              <p className="text-sm text-gray-400">
                Receive your data instantly after payment settles
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-400 mb-2">0</div>
            <div className="text-gray-400">APIs Listed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-400 mb-2">0</div>
            <div className="text-gray-400">Providers</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-400 mb-2">$0</div>
            <div className="text-gray-400">Total Volume</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-400 mb-2">0</div>
            <div className="text-gray-400">API Calls</div>
          </div>
        </div>
      </div>
    </div>
  );
}
