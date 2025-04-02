
import Link from "next/link"
import { Bell, ChevronDown, User } from 'lucide-react'

import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-xl font-bold">
          PLANET X
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="text-sm font-medium">
            Home
          </Link>
          <div className="relative group">
            <button className="flex items-center text-sm font-medium">
              Properties <ChevronDown className="ml-1 h-4 w-4" />
            </button>
          </div>
          <Link href="/highlights" className="text-sm font-medium">
            Highlights
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span className="hidden md:inline">User</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}

