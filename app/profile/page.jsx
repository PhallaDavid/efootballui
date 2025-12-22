"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  User,
  Settings,
  Loader2,
  CheckCircle,
  XCircle,
  Camera,
  Trash2,
  BookOpen,
  Edit,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ImageUpload from "@/components/ImageUpload";
import ImageEditor from "@/components/ImageEditor";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertVariant, setAlertVariant] = useState("default");
  const [selectedImage, setSelectedImage] = useState(null);
  const [editedImage, setEditedImage] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
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

  useEffect(() => {
    if (activeTab === "posts") {
      fetchPosts();
    }
  }, [activeTab]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("/api/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
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
          avatar: data.avatar || "",
        });
      } else {
        setAlertMessage("Failed to load profile data.");
        setAlertVariant("destructive");
      }
    } catch (error) {
      console.error("Fetch profile error:", error);
      setAlertMessage("Failed to load profile data.");
      setAlertVariant("destructive");
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setAlertMessage("Profile updated successfully!");
        setAlertVariant("default");
      } else {
        setAlertMessage(
          data.message || "Failed to update profile. Please try again."
        );
        setAlertVariant("destructive");
      }
    } catch (error) {
      console.error("Update error:", error);
      setAlertMessage(
        "Failed to update profile. Please check your connection and try again."
      );
      setAlertVariant("destructive");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageSelect = (imageData) => {
    if (imageData) {
      setSelectedImage(imageData);
      setIsEditorOpen(true);
    } else {
      setSelectedImage(null);
      setEditedImage(null);
    }
  };

  const handleImageEdit = (editedData) => {
    setEditedImage(editedData);
    setSelectedImage(null);
  };

  const handleUploadAvatar = async () => {
    if (!editedImage) return;

    setIsLoading(true);
    setAlertMessage(null);

    try {
      const token = localStorage.getItem("access_token");
      const formDataToSend = new FormData();
      formDataToSend.append("avatar", editedImage.file);

      const response = await fetch("/api/profile/avatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setAlertMessage("Avatar updated successfully!");
        setAlertVariant("default");
        // Update the form data with the new avatar URL
        setFormData((prev) => ({ ...prev, avatar: data.avatar_url }));
        // Notify header to refresh avatar
        window.dispatchEvent(new Event("avatarUpdated"));
      } else {
        setAlertMessage(
          data.message || "Failed to upload avatar. Please try again."
        );
        setAlertVariant("destructive");
      }
    } catch (error) {
      console.error("Avatar upload error:", error);
      setAlertMessage(
        "Failed to upload avatar. Please check your connection and try again."
      );
      setAlertVariant("destructive");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAvatar = async () => {
    setIsLoading(true);
    setAlertMessage(null);

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("/api/delete-avatar", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setAlertMessage("Avatar deleted successfully!");
        setAlertVariant("default");
        // Update the form data to remove avatar URL
        setFormData((prev) => ({ ...prev, avatar: "" }));
        // Notify header to refresh avatar
        window.dispatchEvent(new Event("avatarUpdated"));
      } else {
        setAlertMessage(
          data.message || "Failed to delete avatar. Please try again."
        );
        setAlertVariant("destructive");
      }
    } catch (error) {
      console.error("Avatar delete error:", error);
      setAlertMessage(
        "Failed to delete avatar. Please check your connection and try again."
      );
      setAlertVariant("destructive");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPosts = async () => {
    setPostsLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://127.0.0.1:8000/api/our-products", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(data.data || []);
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Fetch posts error:", error);
    } finally {
      setPostsLoading(false);
    }
  };

  const handleEditPost = (post) => {
    alert(`Edit post: ${post.title}`);
  };

  const handleDeletePost = async (post) => {
    if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(`http://127.0.0.1:8000/api/delete-product/${post.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setPosts((prev) => prev.filter((p) => p.id !== post.id));
          alert("Post deleted successfully!");
        } else {
          alert("Failed to delete post.");
        }
      } catch (error) {
        console.error("Delete post error:", error);
        alert("Failed to delete post.");
      }
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Profile & Settings - Left Side */}
          <div className="md:col-span-1">
            <div className="bg-card rounded-lg border p-4">
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`flex items-center space-x-3 w-full text-left px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors ${
                    activeTab === "profile"
                      ? "bg-accent text-accent-foreground"
                      : ""
                  }`}
                >
                  <User className="w-5 h-5 text-primary" />
                  <span className="text-lg font-semibold">Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab("posts")}
                  className={`flex items-center space-x-3 w-full text-left px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors ${
                    activeTab === "posts"
                      ? "bg-accent text-accent-foreground"
                      : ""
                  }`}
                >
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="text-lg font-semibold">Posts</span>
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`flex items-center space-x-3 w-full text-left px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors ${
                    activeTab === "settings"
                      ? "bg-accent text-accent-foreground"
                      : ""
                  }`}
                >
                  <Settings className="w-5 h-5 text-primary" />
                  <span className="text-lg font-semibold">Settings</span>
                </button>
              </div>
            </div>
          </div>

          {/* Profile Info - Right Side */}
          <div className="md:col-span-2">
            {activeTab === "profile" && (
              <div>
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
                  {/* Hidden file input */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        handleImageSelect({
                          file,
                          preview: URL.createObjectURL(file),
                          name: file.name,
                        });
                      }
                      e.target.value = "";
                    }}
                    className="hidden"
                    id="avatar-file-input"
                  />

                  {/* Avatar Section */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        {editedImage ? (
                          <img
                            src={editedImage.preview}
                            alt="Avatar"
                            className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                          />
                        ) : formData.avatar && formData.avatar.trim() !== "" ? (
                          <img
                            src={formData.avatar}
                            alt="Avatar"
                            className="w-20 h-20 rounded-full object-cover border-2 border-muted-foreground/25"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                            <span className="text-2xl font-bold text-primary">
                              DP
                            </span>
                          </div>
                        )}
                        <div className="absolute -bottom-2 -right-2 flex gap-1">
                          {formData.avatar &&
                            formData.avatar.trim() !== "" &&
                            !editedImage && (
                              <Button
                                size="sm"
                                variant="destructive"
                                className="rounded-full w-8 h-8 p-0"
                                onClick={handleDeleteAvatar}
                                disabled={isLoading}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          <Button
                            size="sm"
                            className="rounded-full w-8 h-8 p-0"
                            onClick={() =>
                              document.getElementById("avatar-file-input").click()
                            }
                          >
                            <Camera className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">David Phalla</h3>
                        <p className="text-muted-foreground">demo1@gmail.com</p>
                        {editedImage && (
                          <div className="flex gap-2 mt-2">
                            <Button
                              size="sm"
                              onClick={handleUploadAvatar}
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <>
                                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                                  Saving...
                                </>
                              ) : (
                                "Save Avatar"
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditedImage(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                      </div>
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
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email</label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            placeholder="Enter your email address"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Phone</label>
                          <Input
                            type="tel"
                            value={formData.phone_number}
                            onChange={(e) =>
                              handleInputChange("phone_number", e.target.value)
                            }
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
                            onChange={(e) =>
                              handleInputChange("country", e.target.value)
                            }
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
                            onChange={(e) =>
                              handleInputChange("facebook_link", e.target.value)
                            }
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
                            onChange={(e) =>
                              handleInputChange("telegram_link", e.target.value)
                            }
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
                          onChange={(e) =>
                            handleInputChange("bio", e.target.value)
                          }
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
            )}
            {activeTab === "posts" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">My Posts</h2>
                  <Button>Create New Post</Button>
                </div>
                {postsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : posts.length === 0 ? (
                  <p className="text-muted-foreground">No posts found.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Server</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {posts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell>{post.id}</TableCell>
                          <TableCell>{post.title}</TableCell>
                          <TableCell>{post.price}</TableCell>
                          <TableCell>{post.server}</TableCell>
                          <TableCell>{post.status}</TableCell>
                          <TableCell>
                            {new Date(post.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditPost(post)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeletePost(post)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            )}
            {activeTab === "settings" && (
              <div>
                <h2 className="text-xl font-bold mb-6">Settings</h2>
                <p className="text-muted-foreground">Settings options will be displayed here.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Editor Dialog */}
      {selectedImage?.preview && (
        <ImageEditor
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          imageSrc={selectedImage.preview}
          onSave={handleImageEdit}
        />
      )}
    </div>
  );
}
