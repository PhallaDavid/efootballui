"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/lib/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Key, Trash2, Loader2, CheckCircle, XCircle } from "lucide-react";

export default function Settings() {
  const { t } = useTranslation();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertVariant, setAlertVariant] = useState<"default" | "destructive">("default");

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdatePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setAlertMessage(t("settings.passwordsNotMatch"));
      setAlertVariant("destructive");
      return;
    }

    setIsLoading(true);
    setAlertMessage(null);

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("/api/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_password: passwordData.currentPassword,
          new_password: passwordData.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAlertMessage(t("settings.passwordUpdated"));
        setAlertVariant("default");
        setIsPasswordDialogOpen(false);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setAlertMessage(data.message || t("settings.failedToUpdatePassword"));
        setAlertVariant("destructive");
      }
    } catch (error) {
      console.error("Update password error:", error);
      setAlertMessage(t("settings.failedToUpdatePasswordConnection"));
      setAlertVariant("destructive");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    setAlertMessage(null);

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("/api/delete-account", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setAlertMessage(t("settings.accountDeleted"));
        setAlertVariant("default");
        // Redirect to home page or logout
        setTimeout(() => {
          localStorage.removeItem("access_token");
          window.location.href = "/";
        }, 2000);
      } else {
        setAlertMessage(data.message || t("settings.failedToDeleteAccount"));
        setAlertVariant("destructive");
      }
    } catch (error) {
      console.error("Delete account error:", error);
      setAlertMessage(t("settings.failedToDeleteAccountConnection"));
      setAlertVariant("destructive");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {alertMessage && (
        <Alert variant={alertVariant}>
          {alertVariant === "default" ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {/* Update Password */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-3">
            <Key className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">{t("settings.updatePassword")}</p>
              <p className="text-sm text-muted-foreground">
                {t("settings.changeAccountPassword")}
              </p>
            </div>
          </div>
          <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">{t("settings.update")}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("settings.updatePasswordTitle")}</DialogTitle>
                <DialogDescription>
                  {t("settings.updatePasswordDescription")}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">{t("settings.currentPassword")}</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                    placeholder={t("settings.enterCurrentPassword")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">{t("settings.newPassword")}</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                    placeholder={t("settings.enterNewPassword")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">{t("settings.confirmNewPassword")}</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                    placeholder={t("settings.confirmNewPasswordPlaceholder")}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsPasswordDialogOpen(false)}
                  disabled={isLoading}
                >
                  {t("auth.cancel")}
                </Button>
                <Button
                  onClick={handleUpdatePassword}
                  disabled={isLoading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("settings.updatingPassword")}
                    </>
                  ) : (
                    t("settings.updatePasswordButton")
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Delete Account */}
        <div className="flex items-center justify-between p-4 border rounded-lg border-destructive/20">
          <div className="flex items-center space-x-3">
            <Trash2 className="w-5 h-5 text-destructive" />
            <div>
              <p className="font-medium text-destructive">{t("settings.deleteAccount")}</p>
              <p className="text-sm text-muted-foreground">
                {t("settings.deleteAccountDescription")}
              </p>
            </div>
          </div>
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">{t("settings.delete")}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("settings.deleteAccountTitle")}</DialogTitle>
                <DialogDescription>
                  {t("settings.deleteAccountConfirm")}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                  disabled={isLoading}
                >
                  {t("auth.cancel")}
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("settings.deleting")}
                    </>
                  ) : (
                    t("settings.deleteAccountButton")
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
