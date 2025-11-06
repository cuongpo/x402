"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "@/lib/thirdweb";
import { polygonAmoy } from "thirdweb/chains";
import { createWallet } from "thirdweb/wallets";

export default function Navigation() {
  const pathname = usePathname();
  const account = useActiveAccount();

  const isActive = (path: string) => pathname === path;

  // Supported wallets
  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
    createWallet("io.zerion.wallet"),
  ];

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              x402 Marketplace
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              href="/marketplace"
              className={`hover:text-blue-400 transition-colors ${
                isActive("/marketplace") ? "text-blue-400" : "text-gray-300"
              }`}
            >
              Browse APIs
            </Link>
            <Link
              href="/provider"
              className={`hover:text-purple-400 transition-colors ${
                isActive("/provider") ? "text-purple-400" : "text-gray-300"
              }`}
            >
              Provider Dashboard
            </Link>

            {account ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-400">
                  {account.address.slice(0, 6)}...{account.address.slice(-4)}
                </span>
                <ConnectButton
                  client={client}
                  wallets={wallets}
                  chain={polygonAmoy}
                  connectButton={{
                    label: "Connect Wallet",
                  }}
                  detailsButton={{
                    displayBalanceToken: {
                      [polygonAmoy.id]: "0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582", // USDC on Amoy
                    },
                  }}
                  theme="dark"
                />
              </div>
            ) : (
              <ConnectButton
                client={client}
                wallets={wallets}
                chain={polygonAmoy}
                connectButton={{
                  label: "Connect Wallet",
                }}
                theme="dark"
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

