import type { Metadata } from "next";
import { Montserrat, Open_Sans, Lato } from "next/font/google";
import "./globals.css";
import Navigation from "./components/ui/Navbar";
import ToastProvider from "./providers/ToastProvider";
import PWAHead from "./components/icons/PWAHead";



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

export const metadata: Metadata = {
  title: "Portify",
  description: "Personal portfolio",
  keywords: ["portfolio", "Next.js", "Tailwind", "DaisyUI", "shadcn/ui"]
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
        <ToastProvider />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
