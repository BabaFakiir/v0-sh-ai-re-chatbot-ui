"use client"

import { useRef, useEffect, useState } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, LogOutIcon, MenuIcon } from "lucide-react"
import Link from "next/link"
import { ChatSidebar } from "@/components/chat-sidebar"

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <ChatSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <header className="border-b border-gray-200">
          <div className="container flex items-center justify-between h-16 px-4 mx-auto">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <MenuIcon className="w-5 h-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
              <Link href="/">
                <h1 className="text-2xl font-bold">
                  sh<span className="text-black">AI</span>re
                </h1>
              </Link>
            </div>
            <Link href="/login">
              <Button variant="ghost" size="icon">
                <LogOutIcon className="w-5 h-5" />
                <span className="sr-only">Logout</span>
              </Button>
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-hidden">
          <Card className="flex flex-col h-full border-0 rounded-none">
            <CardHeader className="border-b">
              <CardTitle>Stock Analysis Assistant</CardTitle>
            </CardHeader>

            <CardContent className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="max-w-md p-6 mb-4 border rounded-lg bg-gray-50">
                      <h3 className="mb-2 text-lg font-medium">How to use shAIre</h3>
                      <p className="mb-4 text-sm text-gray-600">
                        Simply type a stock symbol (like AAPL, MSFT, TSLA) to get an AI-powered analysis of the stock.
                      </p>
                      <div className="p-3 text-sm text-left bg-gray-100 rounded">
                        <p className="font-medium">Example queries:</p>
                        <ul className="pl-5 mt-2 list-disc">
                          <li>Analyze AAPL stock</li>
                          <li>What do you think about TSLA?</li>
                          <li>Should I invest in MSFT?</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className="flex items-start max-w-3xl gap-3">
                        {message.role !== "user" && (
                          <Avatar className="mt-1">
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`p-3 rounded-lg ${
                            message.role === "user" ? "bg-black text-white" : "bg-gray-100 text-black"
                          }`}
                        >
                          {message.content}
                        </div>
                        {message.role === "user" && (
                          <Avatar className="mt-1">
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            <CardFooter className="p-4 border-t">
              <form onSubmit={handleSubmit} className="flex w-full gap-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Enter a stock symbol (e.g., AAPL, MSFT, TSLA)..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading}>
                  <ArrowUpIcon className="w-4 h-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  )
}
