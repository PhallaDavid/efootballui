import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Hanuman } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/lib/LanguageContext";
import { FontProvider } from "@/components/FontProvider";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const hanuman = Hanuman({
  variable: "--font-hanuman",
  subsets: ["khmer"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "GamingNeed",
  description: "Create by Phalla David",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${hanuman.variable} antialiased lang-english`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <FontProvider>
              <Header />
              {children}
              <Footer />
              <ScrollToTop />
            </FontProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
