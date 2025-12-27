"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Clock, MapPin } from "lucide-react";

import { useTranslation } from "@/lib/LanguageContext";

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
      <main className="flex w-full max-w-7xl flex-col items-center justify-start p-4 sm:items-start space-y-8">
        {/* Header Section */}
        <div className="text-center w-full">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {t("about.title")}
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t("about.subtitle")}
          </p>
        </div>

        <Separator className="w-full" />

        {/* Mission Section */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">{t("about.mission.title")}</CardTitle>
            <CardDescription className="text-sm md:text-base">
              {t("about.mission.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              {t("about.mission.content")}
            </p>
          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                <Badge variant="secondary">Quality</Badge>
                {t("about.features.quality.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("about.features.quality.description")}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                <Badge variant="secondary">Support</Badge>
                {t("about.features.support.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("about.features.support.description")}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                <Badge variant="secondary">Fast</Badge>
                {t("about.features.delivery.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("about.features.delivery.description")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">{t("about.contact.title")}</CardTitle>
              <CardDescription className="text-sm md:text-base">
                {t("about.contact.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm md:text-base font-medium">{t("about.contact.form.name")}</Label>
                <Input id="name" placeholder="Your name" className="text-sm md:text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm md:text-base font-medium">{t("about.contact.form.email")}</Label>
                <Input id="email" type="email" placeholder="your@email.com" className="text-sm md:text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm md:text-base font-medium">{t("about.contact.form.subject")}</Label>
                <Input id="subject" placeholder="How can we help?" className="text-sm md:text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm md:text-base font-medium">{t("about.contact.form.message")}</Label>
                <textarea
                  id="message"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm md:text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 leading-relaxed"
                  placeholder="Tell us more about your inquiry..."
                  rows={4}
                />
              </div>
              <Button className="w-full text-sm md:text-base py-2 md:py-3">{t("about.contact.form.send")}</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">{t("about.contact.info.title")}</CardTitle>
              <CardDescription className="text-sm md:text-base">
                {t("about.contact.info.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-sm md:text-base">{t("about.contact.info.email")}</p>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">support@gamingneed.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-sm md:text-base">{t("about.contact.info.phone")}</p>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-sm md:text-base">{t("about.contact.info.hours")}</p>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">Mon-Fri 9AM-6PM EST</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-sm md:text-base">{t("about.contact.info.address")}</p>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    123 Gaming Street<br />
                    Game City, GC 12345<br />
                    United States
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
