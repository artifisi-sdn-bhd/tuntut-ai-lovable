"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { WaitlistButton } from "@/components/waitlist/waitlist-button"

export function MobileHeader() {
  return (
    <header className="border-b sticky top-0 bg-background z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">Tuntut</span>
        </Link>

        <div className="flex items-center gap-4">
          <Button asChild variant="outline" className="hidden md:flex">
            <a href="#about">About</a>
          </Button>
          <Button asChild variant="outline" className="hidden md:flex">
            <Link href="/how-it-works">How It Works</Link>
          </Button>
          <Button asChild variant="outline" className="hidden md:flex">
            <a href="#features">Features</a>
          </Button>

          <WaitlistButton className="hidden md:flex" />

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-10 w-10 rounded-full flex items-center justify-center"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="#about" className="text-lg font-medium">
                  About
                </Link>
                <Link href="/how-it-works" className="text-lg font-medium">
                  How It Works
                </Link>
                <Link href="#features" className="text-lg font-medium">
                  Features
                </Link>
                <WaitlistButton variant="default" className="mt-4" />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
