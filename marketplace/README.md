# x402 Decentralized API Marketplace

> **"Stripe for AI Agents"** - A marketplace where API providers list their services and AI agents can discover and consume them via x402 payments on Polygon.

## 🚀 Overview

This is a decentralized API marketplace that eliminates the friction of API key management, billing systems, and subscription models. AI agents and users can browse available services, read payment requirements from 402 responses, and pay per-use autonomously using the x402 protocol on Polygon.

### Key Features

- 🤖 **AI Agent Ready**: Built for autonomous AI agents to discover and consume APIs
- ⚡ **x402 Payments**: Seamless micropayments using HTTP 402 Payment Required
- 🔗 **Polygon Network**: Low-cost, fast transactions perfect for high-frequency API calls
- 🌐 **Corbits Facilitator**: Uses Corbits facilitator for Polygon support (no EIP-7702 required)
- 📊 **Provider Dashboard**: Easy API listing and revenue tracking
- 🔍 **Marketplace**: Browse and discover APIs by category
- 💰 **Pay-per-use**: No subscriptions, no API keys, just autonomous payments

## ✅ Working Features

- ✅ **x402 Payment Flow**: Fully functional payment system using Corbits facilitator
- ✅ **Polygon Amoy Testnet**: Working on Polygon without EIP-7702 requirement
- ✅ **USDC Payments**: 0.01 USDC micropayments for API calls
- ✅ **Wallet Integration**: thirdweb ConnectButton with MetaMask support
- ✅ **Example APIs**: Weather API and AI Text Generation API
- ✅ **Payment Settlement**: Automatic on-chain settlement via Corbits

## 🚀 Quick Start

```bash
# 1. Clone and install
git clone <your-repo-url>
cd marketplace
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your thirdweb credentials

# 3. Run the development server
npm run dev

# 4. Open http://localhost:3000
# 5. Connect wallet (Polygon Amoy testnet)
# 6. Get test tokens from faucets (see below)
# 7. Try the Weather API for $0.01!
```

## 🏗️ Architecture

### Components

1. **Marketplace Frontend** (`/app/marketplace`)
   - Browse and discover APIs
   - Filter by category
   - View pricing and stats
   - Wallet connection via thirdweb

2. **Provider Dashboard** (`/app/provider`)
   - List new APIs
   - Manage existing APIs
   - Track revenue and usage

3. **x402 Server** (`/lib/x402/server.ts`)
   - Handles payment verification and settlement
   - Integrates with Corbits facilitator
   - Supports Polygon without EIP-7702
   - Returns 402 Payment Required responses

4. **x402 Client** (`/lib/x402/client.ts`)
   - Wraps fetch API with payment handling
   - Signs payment authorizations
   - Automatically retries with payment on 402 responses

5. **Example APIs** (`/app/api/examples`)
   - Weather API ($0.01/call)
   - AI Text Generation ($0.05/call)

### Payment Flow

```
┌─────────┐                ┌─────────┐                ┌──────────────┐                ┌────────────┐
│ Client  │                │  API    │                │   Corbits    │                │ Blockchain │
│ (User)  │                │ Server  │                │ Facilitator  │                │  (Polygon) │
└────┬────┘                └────┬────┘                └──────┬───────┘                └─────┬──────┘
     │                          │                            │                              │
     │  1. GET /api/weather     │                            │                              │
     ├─────────────────────────>│                            │                              │
     │                          │                            │                              │
     │  2. 402 Payment Required │                            │                              │
     │     (payment details)    │                            │                              │
     │<─────────────────────────┤                            │                              │
     │                          │                            │                              │
     │  3. Sign payment auth    │                            │                              │
     │     (ERC-3009)           │                            │                              │
     │                          │                            │                              │
     │  4. GET with X-PAYMENT   │                            │                              │
     ├─────────────────────────>│                            │                              │
     │                          │                            │                              │
     │                          │  5. POST /settle           │                              │
     │                          │    (payment + requirements)│                              │
     │                          ├───────────────────────────>│                              │
     │                          │                            │                              │
     │                          │                            │  6. Submit USDC transfer     │
     │                          │                            ├─────────────────────────────>│
     │                          │                            │                              │
     │                          │                            │  7. Transaction confirmed    │
     │                          │                            │<─────────────────────────────┤
     │                          │                            │                              │
     │                          │  8. Settlement success     │                              │
     │                          │<───────────────────────────┤                              │
     │                          │                            │                              │
     │  9. 200 OK + API data    │                            │                              │
     │<─────────────────────────┤                            │                              │
     │                          │                            │                              │
```

### Why Corbits Facilitator?

The thirdweb facilitator requires **EIP-7702** (a new Ethereum proposal for account abstraction), which is **not supported on Polygon networks**.

We use the **Corbits facilitator** instead because:
- ✅ Supports Polygon Amoy and Polygon Mainnet
- ✅ No EIP-7702 requirement
- ✅ Standard x402 protocol compliance
- ✅ Gasless transactions for users
- ✅ Fast settlement (2-3 seconds)

Alternative facilitators that also support Polygon:
- [PayAI](https://facilitator.payai.network)
- [x402.rs](https://facilitator.x402.rs)

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Blockchain**: Polygon Amoy Testnet (Chain ID: 80002)
- **Payments**: x402 Protocol with Corbits Facilitator
- **Web3**: thirdweb SDK v5
- **Token**: USDC on Polygon Amoy (`0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582`)

## 📦 Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your credentials
```

## ⚙️ Configuration

Create a `.env.local` file with the following variables:

```env
# Thirdweb Configuration
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id_here
THIRDWEB_SECRET_KEY=your_secret_key_here

# Server Wallet (for receiving payments)
SERVER_WALLET_ADDRESS=0xYourWalletAddress

# Network Configuration
NEXT_PUBLIC_IS_TESTNET=true
```

### Getting Thirdweb Credentials

1. Go to [thirdweb.com](https://thirdweb.com)
2. Create an account and project
3. Get your Client ID from the dashboard
4. Generate a Secret Key for server-side operations

### Getting Test Tokens

You'll need test tokens on Polygon Amoy to use the marketplace:

1. **MATIC (for gas fees)**:
   - Visit [Polygon Faucet](https://faucet.polygon.technology/)
   - Select "Polygon Amoy" network
   - Enter your wallet address
   - Request test MATIC

2. **USDC (for payments)**:
   - Visit [Circle Faucet](https://faucet.circle.com/)
   - Select "Polygon Amoy" network
   - Enter your wallet address
   - Request test USDC
   - USDC Contract: `0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582`

## 🚀 Running the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the marketplace.

### Testing the Payment Flow

1. **Connect Your Wallet**:
   - Click "Connect Wallet" in the top-right corner
   - Select MetaMask or your preferred wallet
   - Make sure you're on Polygon Amoy testnet (Chain ID: 80002)

2. **Get Test Tokens** (see "Getting Test Tokens" section above)

3. **Test an API**:
   - Go to the Marketplace page
   - Click "Try API" on the Weather API
   - Click "Test API ($0.01)"
   - Approve the 0.01 USDC payment in your wallet
   - See the API response!

### Troubleshooting

**Issue**: "Chain does not support EIP-7702"
- **Solution**: This project uses the Corbits facilitator which supports Polygon without EIP-7702. Make sure you're using the latest code.

**Issue**: "Insufficient USDC balance"
- **Solution**: Get test USDC from [Circle Faucet](https://faucet.circle.com/)

**Issue**: "Insufficient MATIC for gas fees"
- **Solution**: Get test MATIC from [Polygon Faucet](https://faucet.polygon.technology/)

**Issue**: Browser console shows "Could not establish connection" errors
- **Solution**: This is a browser extension issue (usually MetaMask or other extensions). It doesn't affect functionality and can be safely ignored.

## 📝 Smart Contract Deployment

Deploy the API Registry contract to Polygon:

```bash
# Install Hardhat or Foundry
npm install --save-dev hardhat

# Deploy to Polygon Amoy testnet
npx hardhat run scripts/deploy.js --network polygon-amoy

# Update .env.local with the deployed contract address
```

## 🔌 Using the x402 API

### As a Provider (Creating a Paid API)

```typescript
import { createX402Server } from "@/lib/x402/server";

const x402Server = createX402Server(
  process.env.THIRDWEB_SECRET_KEY!,
  process.env.SERVER_WALLET_ADDRESS!,
  true // testnet
);

export async function GET(request: Request) {
  const paymentData = request.headers.get("x-payment");

  const result = await x402Server.settlePayment(
    request.url,
    "GET",
    paymentData,
    "$0.01", // Price
    {
      description: "My API endpoint",
      mimeType: "application/json",
      maxTimeoutSeconds: 300,
    }
  );

  if (result.status === 200) {
    return Response.json({ data: "your data" });
  } else {
    return Response.json(result.responseBody, {
      status: result.status,
      headers: result.responseHeaders,
    });
  }
}
```

### As a Consumer (Calling a Paid API)

```typescript
import { createX402Client } from "@/lib/x402/client";
import { createWallet } from "thirdweb/wallets";

const wallet = createWallet("io.metamask");
await wallet.connect({ client });

const x402Client = createX402Client(
  process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
  wallet,
  BigInt(1_000_000) // Max 1 USDC
);

const response = await x402Client.fetch(
  "http://localhost:3000/api/examples/weather?city=NYC"
);

const data = await response.json();
console.log(data);
```

## 📚 API Examples

### Weather API

```bash
# Without payment (will return 402)
curl http://localhost:3000/api/examples/weather?city=NYC

# With x402 payment (requires wallet integration)
# See client example above
```

### AI Text Generation

```bash
# POST request with payment
curl -X POST http://localhost:3000/api/examples/ai-text \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Write a haiku about blockchain"}'
```

## 🎯 Roadmap

- [x] Project setup and structure
- [x] Smart contract for API registry
- [x] x402 payment integration with Corbits facilitator
- [x] Marketplace frontend
- [x] Provider dashboard
- [x] Example APIs (Weather, AI Text Generation)
- [x] Wallet connection UI (thirdweb ConnectButton)
- [x] Working payment flow on Polygon Amoy
- [x] USDC micropayments (0.01 USDC minimum)
- [ ] Smart contract deployment scripts
- [ ] API discovery for AI agents
- [ ] Payment history tracking
- [ ] Provider analytics dashboard
- [ ] API testing playground
- [ ] MCP (Model Context Protocol) integration
- [ ] Reputation system
- [ ] API versioning
- [ ] Rate limiting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License

## 🔗 Resources

### x402 Protocol
- [x402 Official Specification](https://github.com/coinbase/x402)
- [x402 Ecosystem](https://www.x402.org/ecosystem)
- [thirdweb x402 Documentation](https://portal.thirdweb.com/payments/x402)
- [thirdweb x402 Client Docs](https://portal.thirdweb.com/payments/x402/client)
- [thirdweb x402 Server Docs](https://portal.thirdweb.com/payments/x402/server)
- [thirdweb x402 Facilitator Docs](https://portal.thirdweb.com/payments/x402/facilitator)

### Facilitators
- [Corbits Facilitator](https://facilitator.corbits.dev) - Used in this project (supports Polygon)
- [PayAI Facilitator](https://facilitator.payai.network) - Alternative for Polygon
- [x402.rs Facilitator](https://facilitator.x402.rs) - Alternative for Polygon

### Reference Implementations
- [MCPay Reference Implementation](https://github.com/microchipgnu/MCPay)
- [x402 Gated API Example](https://github.com/jarrodwatts/x402-gated-api)

### Blockchain & Tools
- [Polygon Documentation](https://docs.polygon.technology/)
- [Polygon Amoy Faucet](https://faucet.polygon.technology/)
- [Circle USDC Faucet](https://faucet.circle.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [thirdweb SDK](https://portal.thirdweb.com/)

## 💡 Use Cases

- **AI Agents**: Autonomous API consumption without human intervention
- **Data Providers**: Monetize data feeds with micropayments
- **AI Model Providers**: Offer inference APIs with pay-per-token pricing
- **Computation Services**: Sell computing resources on-demand
- **Oracle Services**: Provide real-world data to smart contracts

## 🆘 Support

For questions and support, please open an issue on GitHub.
