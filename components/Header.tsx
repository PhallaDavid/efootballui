"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import AuthModal from "@/components/AuthModal";
import { useTranslation } from "@/lib/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CreatePostDialog } from "@/components/CreatePostDialog";
import { User, LogOut, Menu, Plus } from "lucide-react";

export default function Header() {
  const { t } = useTranslation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);

    if (token) {
      fetchUserProfile(token);
    }

    // Listen for avatar update events
    const handleAvatarUpdate = () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        fetchUserProfile(token);
      }
    };

    window.addEventListener('avatarUpdated', handleAvatarUpdate);

    return () => {
      window.removeEventListener('avatarUpdated', handleAvatarUpdate);
    };
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch("/api/profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserAvatar(data.avatar || "");
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  const openAuthModal = (mode: "signin" | "signup") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
    setIsSheetOpen(false); // Close the sheet when opening auth modal
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <header className="backdrop-blur-md bg-background/80 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4 sm:space-x-8">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="eFootball Store Logo"
                  className="rounded-md cursor-pointer"
                  width={32}
                  height={32}
                />
              </Link>
              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/"
                        className="text-lg font-medium hover:text-primary"
                      >
                        {t('nav.home')}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/store"
                        className="text-lg font-medium hover:text-primary"
                      >
                        {t('nav.store')}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/about"
                        className="text-lg font-medium hover:text-primary"
                      >
                        {t('nav.about')}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              {isLoggedIn ? (
                <CreatePostDialog>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </CreatePostDialog>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openAuthModal("signin")}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              )}
              <LanguageSwitcher />
              <ThemeToggle />
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full"
                    >
                      <Avatar>
                        <AvatarImage src={userAvatar} alt="@user" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-34" align="end" forceMount>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center">
                        <User className=" h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden sm:flex items-center space-x-2 ">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openAuthModal("signin")}
                  >
                    Sign In
                  </Button>
                  <Button size="sm" onClick={() => openAuthModal("signup")}>
                    Sign Up
                  </Button>
                </div>
              )}
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-80">
                  <SheetHeader>
                    <SheetTitle>eFootball Store</SheetTitle>
                    <SheetDescription>
                      Navigate through our store
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex flex-col space-y-4 p-4">
                    <Link
                      href="/"
                      className="text-lg font-medium hover:text-primary"
                    >
                      HOME
                    </Link>
                    <Link
                      href="/store"
                      className="text-lg font-medium hover:text-primary"
                    >
                      STORE
                    </Link>
                    <Link
                      href="/about"
                      className="text-lg font-medium hover:text-primary"
                    >
                      ABOUT US
                    </Link>
                    <div className="border-t pt-4">
                      {isLoggedIn ? (
                        <div className="space-y-2">
                          <Link
                            href="/profile"
                            className="flex items-center text-lg font-medium hover:text-primary"
                          >
                            <User className=" h-4 w-4" />
                            Profile
                          </Link>
                          <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className="w-full hover:bg-accent justify-start text-lg font-medium"
                          >
                            <LogOut className="mr-2  h-4 w-4" />
                            Log out
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            onClick={() => openAuthModal("signin")}
                            className="w-full"
                          >
                            Sign In
                          </Button>
                          <Button
                            onClick={() => openAuthModal("signup")}
                            className="w-full"
                          >
                            Sign Up
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
}
