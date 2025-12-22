import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="backdrop-blur-md bg-background/80 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image
                src="/logo.png"
                alt="eFootball Store Logo"
                width={32}
                height={32}
                className="rounded-md"
              />
              <span className="text-lg font-bold">eFootball Store</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Get the latest football gear and accessories for your gaming needs.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-primary">
                About Us
              </Link>
              <Link href="/careers" className="block text-sm text-muted-foreground hover:text-primary">
                Careers
              </Link>
              <Link href="/press" className="block text-sm text-muted-foreground hover:text-primary">
                Press
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2025 Phalla David. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                Twitter
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                Facebook
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                Instagram
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
