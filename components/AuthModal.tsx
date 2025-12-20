"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "signin" | "signup";
  onAuthSuccess?: () => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = "signin",
  onAuthSuccess,
}: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertVariant, setAlertVariant] = useState<"default" | "destructive">("default");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setAlertMessage(null);

    if (mode === "signin") {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('access_token', data.access_token);
          setAlertMessage('Sign in successful!');
          setAlertVariant('default');
          onAuthSuccess?.();
          setTimeout(() => onClose(), 2000);
        } else {
          setAlertMessage(data.message || 'Sign in failed');
          setAlertVariant('destructive');
        }
      } catch (error) {
        console.error('Sign in error:', error);
        setAlertMessage('An error occurred during sign in');
        setAlertVariant('destructive');
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        setAlertMessage("Passwords don't match");
        setAlertVariant('destructive');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Registration successful, switch to sign in mode
          setMode("signin");
          resetForm();
          setAlertMessage('User registered successfully! Please sign in.');
          setAlertVariant('default');
        } else {
          setAlertMessage(data.message || 'Sign up failed');
          setAlertVariant('destructive');
        }
      } catch (error) {
        console.error('Sign up error:', error);
        setAlertMessage('An error occurred during sign up');
        setAlertVariant('destructive');
      }
    }

    setIsLoading(false);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === "signin" ? "Sign In" : "Sign Up"}</DialogTitle>
          <DialogDescription>
            {mode === "signin"
              ? "Enter your credentials to sign in."
              : "Create an account to get started."}
          </DialogDescription>
        </DialogHeader>
        {alertMessage && (
          <Alert variant={alertVariant}>
            {alertVariant === 'default' ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            <AlertDescription>{alertMessage}</AlertDescription>
          </Alert>
        )}
        <div className="flex gap-2 mb-4">
          <Button
            variant={mode === "signin" ? "default" : "outline"}
            onClick={() => {
              setMode("signin");
              setAlertMessage(null);
            }}
            className="flex-1"
            disabled={isLoading}
          >
            Sign In
          </Button>
          <Button
            variant={mode === "signup" ? "default" : "outline"}
            onClick={() => {
              setMode("signup");
              setAlertMessage(null);
            }}
            className="flex-1"
            disabled={isLoading}
          >
            Sign Up
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
          {mode === "signup" && (
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
              />
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {mode === "signin" ? "Signing In..." : "Signing Up..."}
                </>
              ) : mode === "signin" ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
