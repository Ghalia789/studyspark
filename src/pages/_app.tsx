import "../styles/globals.css"
import type { AppProps } from "next/app"
import Navbar from "@/components/Navbar"
  

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-bg text-text dark:bg-bg dark:text-text transition-colors">
      <Navbar />
      <main className="ml-0 p-8 transition-all duration-300 lg:ml-64">
        <Component {...pageProps} />
      </main>
    </div>
  )
}
