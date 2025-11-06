"use client";

/**
 * Provider Dashboard - List and manage APIs
 */

import { useState } from "react";
import { APICategory } from "@/types/api";

export default function ProviderPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    endpoint: "",
    category: APICategory.DATA_FEED,
    price: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API registration
    console.log("Registering API:", formData);
    alert("API registration will be implemented with smart contract integration");
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Provider Dashboard</h1>
            <p className="text-gray-400">
              List and manage your APIs on the marketplace
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            {showForm ? "Cancel" : "+ List New API"}
          </button>
        </div>

        {/* Registration Form */}
        {showForm && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Register New API</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  API Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                  placeholder="e.g., Real-time Weather Data"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                  rows={3}
                  placeholder="Describe what your API does..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  API Endpoint URL
                </label>
                <input
                  type="url"
                  required
                  value={formData.endpoint}
                  onChange={(e) =>
                    setFormData({ ...formData, endpoint: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                  placeholder="https://api.example.com/v1/endpoint"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as APICategory,
                      })
                    }
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                  >
                    <option value={APICategory.DATA_FEED}>Data Feed</option>
                    <option value={APICategory.AI_MODEL}>AI Model</option>
                    <option value={APICategory.COMPUTATION}>Computation</option>
                    <option value={APICategory.STORAGE}>Storage</option>
                    <option value={APICategory.ORACLE}>Oracle</option>
                    <option value={APICategory.OTHER}>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Price (USD)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                    placeholder="$0.01"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Register API
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Provider Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-400 mb-2">0</div>
            <div className="text-gray-400">Active APIs</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="text-3xl font-bold text-green-400 mb-2">$0</div>
            <div className="text-gray-400">Total Revenue</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="text-3xl font-bold text-purple-400 mb-2">0</div>
            <div className="text-gray-400">Total Calls</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="text-3xl font-bold text-yellow-400 mb-2">100</div>
            <div className="text-gray-400">Reputation</div>
          </div>
        </div>

        {/* My APIs */}
        <div>
          <h2 className="text-2xl font-bold mb-4">My APIs</h2>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
            <p className="text-gray-400">
              You haven&apos;t listed any APIs yet. Click &quot;List New API&quot; to get
              started.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

