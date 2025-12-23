"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  phone_number: string;
  facebook_link: string;
  telegram_link: string;
  country: string;
  bio: string;
}

interface Product {
  id: number;
  title: string;
  price: string;
  images: string[];
  category_id: number;
  server: string;
  status: string;
  login_with: string | null;
  created_at: string;
  updated_at: string;
  user_id: number;
  user: User;
}

interface ApiResponse {
  current_page: number;
  data: Product[];
  // Add other pagination fields if needed
}

export default function NewProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/new-products?page=1&row_per_page=9")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: ApiResponse) => {
        setProducts(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching new products:", error);
        setError("Failed to load new products");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              New Products
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Check out the latest eFootball accounts
            </p>
          </div>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="w-full max-w-md mx-auto hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse"
            >
              <div className="pb-4">
                <div className="relative h-48 w-full rounded-lg overflow-hidden bg-gray-300 dark:bg-gray-700"></div>
              </div>
              <div className="pb-4 px-6">
                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded mb-3 w-3/4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-3 w-1/2"></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 flex-1">
                    <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-1 w-3/4"></div>
                      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-12"></div>
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-12"></div>
                  </div>
                </div>
              </div>
              <div className="pt-0 pb-6 px-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
                  <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                  <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                </div>
                <div className="h-9 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto py-8">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              New Products
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Check out the latest eFootball accounts
            </p>
          </div>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No new products available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            New Accounts
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Check out the latest accounts
          </p>
        </div>
        <Button variant="outline">See All</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
