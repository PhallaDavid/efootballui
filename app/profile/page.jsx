"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Settings, Loader2, CheckCircle, XCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertVariant, setAlertVariant] = useState("default");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    country: "",
    facebook_link: "",
    telegram_link: "",
    bio: "",
    avatar: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("/api/profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone_number: data.phone_number || "",
          country: data.country || "",
          facebook_link: data.facebook_link || "",
          telegram_link: data.telegram_link || "",
          bio: data.bio || "",
          // avatar: data.avatar || "",
        });
      } else {
        setAlertMessage("Failed to load profile data.");
        setAlertVariant("destructive");
      }
    } catch (error) {
      console.error("Fetch profile error:", error);
      setAlertMessage("Failed to load profile data.");
      setAlertVariant("destructive");
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    setAlertMessage(null);

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setAlertMessage("Profile updated successfully!");
        setAlertVariant("default");
      } else {
        setAlertMessage(data.message || "Failed to update profile. Please try again.");
        setAlertVariant("destructive");
      }
    } catch (error) {
      console.error("Update error:", error);
      setAlertMessage("Failed to update profile. Please check your connection and try again.");
      setAlertVariant("destructive");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Profile & Settings - Left Side */}
          <div className="md:col-span-1">
            <div className="bg-card rounded-lg border p-6">
              <div className="space-y-2">
                <button className="flex items-center space-x-3 w-full text-left px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                  <User className="w-5 h-5 text-primary" />
                  <span className="text-lg font-semibold">Profile</span>
                </button>
                <button className="flex items-center space-x-3 w-full text-left px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Settings className="w-5 h-5 text-primary" />
                  <span className="text-lg font-semibold">Settings</span>
                </button>
              </div>
            </div>
          </div>

          {/* Profile Info - Right Side */}
          <div className="md:col-span-2">
            <div className="bg-card rounded-lg border p-6">
              <h2 className="text-xl font-bold mb-6">Profile Information</h2>
              {alertMessage && (
                <Alert variant={alertVariant} className="mb-4">
                  {alertVariant === "default" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  <AlertDescription>{alertMessage}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">DP</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">David Phalla</h3>
                    <p className="text-muted-foreground">demo1@gmail.com</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="Enter your email address"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Phone</label>
                        <Input
                          type="tel"
                          value={formData.phone_number}
                          onChange={(e) => handleInputChange("phone_number", e.target.value)}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Country</label>
                        <Input
                          type="text"
                          value={formData.country}
                          onChange={(e) => handleInputChange("country", e.target.value)}
                          placeholder="Enter your country"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Facebook Link
                        </label>
                        <Input
                          type="url"
                          value={formData.facebook_link}
                          onChange={(e) => handleInputChange("facebook_link", e.target.value)}
                          placeholder="https://www.facebook.com/yourusername"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Telegram Link
                        </label>
                        <Input
                          type="url"
                          value={formData.telegram_link}
                          onChange={(e) => handleInputChange("telegram_link", e.target.value)}
                          placeholder="https://t.me/yourusername"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Bio</label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        placeholder="Tell us about yourself..."
                        rows={3}
                        className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleUpdate} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
