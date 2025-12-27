import type { Metadata } from "next";
import { Hanuman, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/lib/LanguageContext";
import { FontProvider } from "@/components/FontProvider";
import { CategoryProvider } from "@/lib/CategoryContext";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const hanuman = Hanuman({
  variable: "--font-hanuman",
  subsets: ["khmer"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
        className={`${hanuman.variable} ${inter.variable} antialiased lang-english`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <CategoryProvider>
              <FontProvider>
                <Header />
                {children}
                <Footer />
                <ScrollToTop />
              </FontProvider>
            </CategoryProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
