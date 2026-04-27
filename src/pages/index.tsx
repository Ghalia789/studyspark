import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text mb-4">
          Welcome to StudySpark
        </h1>
        <p className="text-lg text-muted">
          Get started by editing the pages or navigating through the sidebar.
        </p>
      </div>
    </div>
  )
}
