import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { siteConfig } from "@/content/siteConfig";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollProgress } from "@/components/ScrollProgress";

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const DESCRIPTION =
  "Data enthusiast and engineering student specializing in Materials Science, AI, and predictive modeling.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Portfolio`,
    template: `%s | ${siteConfig.name}`,
  },
  description: DESCRIPTION,
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: `${siteConfig.name} | Portfolio`,
    title: `${siteConfig.name} | Portfolio`,
    description: DESCRIPTION,
    images: [{ url: "/images/profile-hero.jpg", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Portfolio`,
    description: DESCRIPTION,
    images: ["/images/profile-hero.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${fontMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <ScrollProgress />
        </ThemeProvider>
      </body>
    </html>
  );
}
