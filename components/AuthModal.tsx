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
import { Loader2, CheckCircle, XCircle, Eye, EyeOff } from "lucide-react";
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
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = { name: "", email: "", password: "", confirmPassword: "" };
    let isValid = true;

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    // Signup specific validations
    if (mode === "signup") {
      if (!formData.name) {
        newErrors.name = "Name is required";
        isValid = false;
      } else if (formData.name.length < 2) {
        newErrors.name = "Name must be at least 2 characters";
        isValid = false;
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
        isValid = false;
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlertMessage(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

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
          setTimeout(() => onClose(), 3000);
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
    setErrors({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setShowPassword(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>{mode === "signin" ? "Sign In" : "Sign Up"}</DialogTitle>
          <DialogDescription>
            {mode === "signin"
              ? "Wellcome back! Sign in to your account."
              : "Create a new account to get started."}
          </DialogDescription>
        </DialogHeader>
        {alertMessage && (
          <Alert
            variant={alertVariant}
            className={alertVariant === 'default' ? 'bg-green-50 border-green-200 text-green-800' : ''}
          >
            {alertVariant === 'default' ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            <AlertDescription>{alertMessage}</AlertDescription>
          </Alert>
        )}
        <div className="flex gap-4 mb-4">
          <Button
            variant={mode === "signin" ? "default" : "outline"}
            onClick={() => {
              setMode("signin");
              setAlertMessage(null);
              setErrors({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
              });
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
              setErrors({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
              });
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
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>
          {mode === "signup" && (
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
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
