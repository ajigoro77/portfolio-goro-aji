import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// Load Inter font for non-Apple devices
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const siteTitle = "Goro Aji Ramadhan - Web Developer | UI/UX Designer | Automation Specialist";
const siteDescription = "Portofolio Goro Aji Ramadhan - Lulusan S1 Teknik Informatika UNINDRA yang berfokus pada Web Development, UI/UX Design, dan Sistem Otomatisasi.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Goro Aji Portfolio"
  },
  description: siteDescription,
  keywords: [
    "Goro Aji",
    "Web Developer",
    "UI/UX Designer",
    "Automation Specialist",
    "Junior Web Developer",
    "Software Engineer",
    "PHP",
    "MySQL",
    "n8n",
    "Telegram Bot",
    "Figma",
    "UNINDRA",
    "Portfolio",
    "Developer Portfolio",
    "Jakarta"
  ],
  authors: [
    {
      name: "Goro Aji",
      url: siteUrl,
    },
  ],
  creator: "Goro Aji",
  publisher: "Goro Aji",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: "Goro Aji Portfolio",
    images: [
      {
        url: `${siteUrl}/portfolio.png`,
        width: 1200,
        height: 630,
        alt: "Goro Aji - Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [{
      url: `${siteUrl}/portfolio.png`,
      alt: "Goro Aji Portfolio"
    }],
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      }
    ],
    shortcut: "/favicon.ico?v=2",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
  classification: "Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href={siteUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Goro Aji Ramadhan",
              "jobTitle": "Web Developer | UI/UX Designer | Automation Specialist",
              "url": siteUrl,
              "image": `${siteUrl}/profile.png`,
              "email": "goroaji6@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Jakarta Timur",
                "addressCountry": "ID"
              },
              "sameAs": [
                "https://github.com/ajigoro77",
                "https://www.linkedin.com/in/goroaji/"
              ],
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "Universitas Indraprasta PGRI (UNINDRA)"
              },
              "knowsAbout": [
                "Web Development",
                "UI/UX Design",
                "Automation",
                "PHP",
                "MySQL",
                "n8n",
                "Telegram Bot Integration"
              ],
              "description": "Lulusan S1 Teknik Informatika (S.Kom) UNINDRA yang berfokus pada Web Development, UI/UX Design, dan Sistem Otomatisasi."
            })
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <main className="flex min-h-screen flex-col">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}