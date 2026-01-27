import HomePage from "./home/Home";
import Image from "next/image";

export const metadata = {
  title: "The Owner | Portify",
  description: "The Owner - Welcome to my portfolio. Explore projects, skills, and contact information.",
  keywords: ["The Owner", "profile", "projects", "skills", "portfolio"],
  openGraph: {
    title: "The Owner",
    description: "The Owner - Welcome to my portfolio. Explore projects, skills, and contact information.",
    url: "https://theowner.me",
    siteName: "The Owner",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://theowner.me",
        width: 1200,
        height: 630,
        alt: "The Owner Portfolio",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-icon-180.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portify | 3Ps",
    description: "Welcome to my portfolio. Explore projects, skills, and contact information.",
  },
  alternates: {
    canonical: "https://theowner.me",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
}

export default function Home() {
  return (
    <div>
      <HomePage />
    </div>

  );
}
