import type { Metadata, Viewport } from "next";
import { Montserrat, Open_Sans, Lato } from "next/font/google";
import "./globals.css";
import Navigation from "./components/ui/Navbar";
import ToastProvider from "./providers/ToastProvider";
import PWAHead from "./components/icons/PWAHead";
import ServiceWorkerRegistration from "./components/ServiceWorkerRegistration";



// Headers fonts
const Headers = Montserrat({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: '--font-headers',
});

// Body fonts
const Body = Open_Sans({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  variable: '--font-body',
});

// Action fonts (ex: buttons) 
const Action = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: '--font-action',
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "The Owner",
  description: "The Owner - [Personal portfolio showcasing projects and skills]",
  keywords: ["the owner", "portfolio", "skills", "projects", "contact me", "vision"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "The Owner",
  },
  icons: {
    icon: [
      { url: "/icons/manifest-icon-192.maskable.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/manifest-icon-512.maskable.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-icon-180.png", sizes: "152x152", type: "image/png" },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <PWAHead />
      </head>
      <body
        className={`${Headers.variable} ${Body.variable} ${Action.variable} antialiased`}
      >
        <ServiceWorkerRegistration />
        <ToastProvider />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
