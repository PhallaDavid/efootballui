"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Facebook, MessageCircle, Loader2, ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";

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
  user: User | null;
}

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8000/api/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/">
            <Button>Go Back Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/store">Store</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div
              className="relative aspect-square rounded-lg overflow-hidden bg-white dark:bg-gray-800 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setIsImageDialogOpen(true)}
            >
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Image Available
                </div>
              )}
            </div>

            {/* Thumbnail Carousel */}
            {product.images && product.images.length > 1 && (
              <Carousel className="w-full">
                <CarouselContent className="-ml-2">
                  {product.images.map((image, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-2 basis-1/4 md:basis-1/5 lg:basis-1/6"
                    >
                      <button
                        onMouseEnter={() => setSelectedImageIndex(index)}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative w-full aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          selectedImageIndex === index
                            ? "border-primary "
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.title} - Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </Carousel>
            )}

            {/* Seller Information */}
            {product.user && (
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Seller Information</h3>
                  <div className="flex items-center space-x-3 mb-3">
                    <Link href={`/account/${product.user.id}`}>
                      <Avatar className="h-12 w-12 cursor-pointer">
                        <AvatarImage
                          src={product.user.avatar}
                          alt={product.user.name}
                        />
                        <AvatarFallback>
                          {product.user.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                    <div>
                      <Link href={`/account/${product.user.id}`}>
                        <p className="font-medium hover:text-primary cursor-pointer">
                          {product.user.name}
                        </p>
                      </Link>
                      {product.user.country && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {product.user.country}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Contact Links */}
                  <div className="flex items-center space-x-2">
                    {product.user.facebook_link && (
                      <a
                        href={product.user.facebook_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Facebook className="h-5 w-5 text-blue-600" />
                      </a>
                    )}
                    {product.user.telegram_link && (
                      <a
                        href={product.user.telegram_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <MessageCircle className="h-5 w-5 text-blue-500" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">
                      {product.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className="text-lg px-3 py-1 bg-green-500 text-white">
                        ${product.price}
                      </Badge>
                      <Badge
                        className={`${
                          product.status === "active"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {product.status}
                      </Badge>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button
                        className="flex-1"
                        onClick={() => console.log("Buy clicked", product.id)}
                      >
                        Buy Now
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() =>
                          console.log("Exchange clicked", product.id)
                        }
                      >
                        Exchange
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {product.login_with && (
                  <div>
                    <h3 className="font-semibold mb-2">Connect With</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {product.login_with}
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold mb-2">Server</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {product.server}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Posted</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {new Date(product.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>

              </CardContent>
            </Card>
          </div>
        </div>

        {/* Full Screen Image Dialog */}
        {isImageDialogOpen && (
          <div
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            onClick={() => setIsImageDialogOpen(false)}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white h-12 w-12 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsImageDialogOpen(false);
                }}
              >
                <X className="h-6 w-6" />
              </Button>

              {product.images && product.images.length > 0 && (
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.title}
                  className="max-w-full max-h-full object-contain"
                />
              )}

              {/* Navigation Buttons */}
              {product.images && product.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white h-12 w-12"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex((prev) =>
                        prev > 0 ? prev - 1 : product.images.length - 1
                      );
                    }}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white h-12 w-12"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex((prev) =>
                        prev < product.images.length - 1 ? prev + 1 : 0
                      );
                    }}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}

              {/* Image Counter */}
              {product.images && product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {selectedImageIndex + 1} / {product.images.length}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
