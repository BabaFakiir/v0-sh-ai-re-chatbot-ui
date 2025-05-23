import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <h1 className="text-2xl font-bold">
            sh<span className="text-black">AI</span>re
          </h1>
          <div className="space-x-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container flex flex-col items-center justify-center max-w-4xl px-4 py-16 mx-auto text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Intelligent Stock Analysis with AI</h2>
          <p className="mt-4 text-lg text-gray-600">
            Get instant AI-powered insights on any stock. Just enter a symbol and our AI will analyze it for you.
          </p>
          <div className="mt-8">
            <Link href="/chat">
              <Button size="lg" className="px-8">
                Try Now
              </Button>
            </Link>
          </div>

          <div className="p-6 mt-16 border rounded-lg shadow-lg bg-gray-50">
            <h3 className="mb-4 text-xl font-semibold">How it Wworks</h3>
            <ol className="space-y-2 text-left">
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 mr-2 text-sm font-bold text-white bg-black rounded-full">
                  1
                </span>
                <span>Sign up for a free account</span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 mr-2 text-sm font-bold text-white bg-black rounded-full">
                  2
                </span>
                <span>Enter any stock symbol in the chat</span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 mr-2 text-sm font-bold text-white bg-black rounded-full">
                  3
                </span>
                <span>Get instant AI-powered analysis and insights</span>
              </li>
            </ol>
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-gray-200">
        <div className="container px-4 mx-auto text-center text-gray-500">
          &copy; {new Date().getFullYear()} shAIre. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
