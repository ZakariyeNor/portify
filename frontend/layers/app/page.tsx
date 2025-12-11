import HomePage from "./home/Home";
import Image from "next/image";

export const metadata = {
  title: "Home | Portfolio",
  description: "Welcome to my portfolio. Explore projects, skills, and contact information.",
  openGraph: {
    title: "Home | Portfolio",
    description: "Welcome to my portfolio. Explore projects, skills, and contact information.",
    url: "https://example.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | Portfolio",
    description: "Welcome to my portfolio. Explore projects, skills, and contact information.",
  },
}

export default function Home() {
  return (
    <div>
      <HomePage />
    </div>

  );
}
