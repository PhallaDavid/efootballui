"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Facebook, MessageCircle } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import AccountSkeleton from "@/components/AccountSkeleton";

type UserProfile = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  avatar: string;
  phone_number: string | null;
  facebook_link: string | null;
  telegram_link: string | null;
  country: string | null;
  bio: string | null;
};

type Product = {
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
  user: UserProfile | null;
};

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function AccountPage({ params }: Props) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const initializeParams = async () => {
      const resolvedParams = await params;
      setUserId(resolvedParams.id);
    };

    initializeParams();
  }, [params]);

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/user/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/product-by-user/${userId}`
        );
        if (!response.ok) {
          console.warn("Failed to fetch products");
          return;
        }
        const result = await response.json();
        // API returns paginated response with 'data' property
        const productsData = result.data || [];
        setProducts(Array.isArray(productsData) ? productsData : []);
      } catch (err) {
        console.warn("Error fetching products:", err);
        setProducts([]);
      }
    };

    fetchProfile();
    fetchProducts();
  }, [userId]);

  if (loading) {
    return <AccountSkeleton />;
  }

  if (error || !profile) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="text-center py-12">
          <p className="text-red-500">{error || "Profile not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Profile Header */}
      <div className="flex flex-col items-center space-y-4 mb-8">
        <Avatar className="h-32 w-32">
          <AvatarImage src={profile.avatar || undefined} alt={profile.name} />
          <AvatarFallback className="text-4xl">
            {profile.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="text-center space-y-1">
          <h1 className="text-xl font-semibold">{profile.name}</h1>
          {profile.bio && (
            <p className="text-sm text-muted-foreground">{profile.bio}</p>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="flex justify-center space-x-6 mb-8">
        {profile.phone_number && (
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-muted-foreground" />
          </div>
        )}
        {profile.facebook_link && (
          <a
            href={profile.facebook_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
          >
            <Facebook className="h-5 w-5" />
          </a>
        )}
        {profile.telegram_link && (
          <a
            href={profile.telegram_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-blue-500 transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
        )}
      </div>

      {/* Posts Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products yet</p>
        </div>
      )}
    </div>
  );
}
