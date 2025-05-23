"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { XIcon, MessageSquareIcon, BarChartIcon, UserIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={onClose} aria-hidden="true" />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out transform lg:translate-x-0 lg:static lg:w-64",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">
            sh<span className="text-black">AI</span>re
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
            <XIcon className="w-5 h-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          <Link href="/chat" onClick={onClose}>
            <Button variant="ghost" className="w-full justify-start">
              <MessageSquareIcon className="w-5 h-5 mr-2" />
              Chat
            </Button>
          </Link>
          <Link href="/portfolio" onClick={onClose}>
            <Button variant="ghost" className="w-full justify-start">
              <BarChartIcon className="w-5 h-5 mr-2" />
              Portfolio
            </Button>
          </Link>
          <Link href="/profile" onClick={onClose}>
            <Button variant="ghost" className="w-full justify-start">
              <UserIcon className="w-5 h-5 mr-2" />
              Profile
            </Button>
          </Link>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500">&copy; {new Date().getFullYear()} shAIre</div>
        </div>
      </div>
    </>
  )
}
