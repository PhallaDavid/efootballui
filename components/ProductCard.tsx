import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Facebook, MessageCircle } from "lucide-react";

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

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-4">
        {product.images && product.images.length > 0 ? (
          <div className="relative h-48 w-full rounded-lg overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-2 right-2 bg-white/90 text-gray-900 text-sm font-bold px-2 py-1 border shadow-sm">
              ${product.price}
            </Badge>
          </div>
        ) : (
          <div className="relative h-48 w-full bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">No Image</span>
            <Badge className="absolute top-2 right-2 bg-white/90 text-gray-900 text-sm font-bold px-2 py-1 border shadow-sm">
              ${product.price}
            </Badge>
          </div>
        )}
      </CardHeader>

      <CardContent className="pb-4">
        <CardTitle className="text-lg font-bold mb-3 line-clamp-2">
          {product.title}
        </CardTitle>

        {product.login_with && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Connect with: {product.login_with}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 flex-1">
            <Avatar className="h-8 w-8">
              <AvatarImage src={product.user.avatar} alt={product.user.name} />
              <AvatarFallback>
                {product.user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">{product.user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {product.user.country}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Badge variant="secondary" className="text-xs">
              {product.server}
            </Badge>
            <Badge
              variant="secondary"
              className={`text-xs ${
                product.status === "active"
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              {product.status}
            </Badge>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Chat to:</span>
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
        <Button variant="outline">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
