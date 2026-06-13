import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GeoVision Pro | Remote Sensing & GIS Consultancy",
  description:
    "Expert consultancy in Remote Sensing, LULC Mapping, and professional training in GEE, ArcGIS, AutoCAD, STAAD Pro & AI. Transforming earth data into actionable insights.",
  keywords:
    "Remote Sensing, LULC, GIS, Google Earth Engine, ArcGIS, AutoCAD, STAAD Pro, AI, Machine Learning, Geospatial Consultancy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
