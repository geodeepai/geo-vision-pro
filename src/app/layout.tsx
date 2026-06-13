import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://geovisionpro.com"),
  title: {
    default: "GeoVision Pro | AI-Powered Geospatial Intelligence & Remote Sensing",
    template: "%s | GeoVision Pro",
  },
  description:
    "GeoVision Pro is a premier AI-driven geospatial consultancy. Expert services in Remote Sensing, LULC Mapping, GIS Analysis, Drone Mapping, and professional training in GEE, ArcGIS, AutoCAD, STAAD Pro & AI.",
  keywords: [
    "Remote Sensing", "LULC Mapping", "GIS", "Google Earth Engine", "ArcGIS",
    "AutoCAD", "STAAD Pro", "AI Geospatial", "Satellite Image Analysis",
    "Drone Mapping", "Geospatial Consultancy", "India GIS", "SAR", "LiDAR",
  ],
  authors: [{ name: "GeoVision Pro" }],
  creator: "GeoVision Pro",
  publisher: "GeoVision Pro",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://geovisionpro.com",
    siteName: "GeoVision Pro",
    title: "GeoVision Pro | AI-Powered Geospatial Intelligence",
    description:
      "Premier AI-driven Remote Sensing, GIS, and Geospatial Consultancy transforming satellite data into strategic decisions for infrastructure, environment, and sustainable development.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GeoVision Pro — AI-Powered Geospatial Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GeoVision Pro | AI-Powered Geospatial Intelligence",
    description: "Premier AI-driven Remote Sensing, GIS & Geospatial Consultancy.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GeoVision Pro",
  url: "https://geovisionpro.com",
  logo: "https://geovisionpro.com/logo.png",
  description:
    "AI-powered geospatial consultancy specialising in Remote Sensing, LULC Mapping, GIS Analysis, and professional training.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "info@geovisionpro.com",
  },
  sameAs: [
    "https://www.linkedin.com/company/geovisionpro",
    "https://www.youtube.com/@geovisionpro",
  ],
  offers: {
    "@type": "AggregateOffer",
    offerCount: "6",
    itemOffered: [
      { "@type": "Service", name: "Remote Sensing Consultancy" },
      { "@type": "Service", name: "LULC Analysis & Mapping" },
      { "@type": "Service", name: "GIS & Spatial Analysis" },
      { "@type": "Service", name: "Drone & UAV Mapping" },
      { "@type": "Service", name: "AI-Powered Geo-Analytics" },
      { "@type": "Service", name: "Structural & Civil Consulting" },
    ],
  },
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          <SmoothScroll />
          {children}
        </Providers>
      </body>
    </html>
  );
}
