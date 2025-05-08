"use client"

import Link from "next/link"
import { Menu, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { WaitlistButton } from "@/components/waitlist/waitlist-button"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

export function MobileHeader() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.email) return "U"
    return user.email.charAt(0).toUpperCase()
  }

  return (
    <header className="border-b sticky top-0 bg-background z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">Tuntut</span>
        </Link>

        <div className="flex items-center gap-4">
          <Button asChild variant="outline" className="hidden md:flex">
            <Link href="/how-it-works">How It Works</Link>
          </Button>

          {user ? (
            <div className="hidden md:flex items-center gap-4">
              <Button asChild variant="outline">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Button asChild variant="outline">
                <Link href="/auth/sign-in">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/sign-up">Sign up</Link>
              </Button>
            </div>
          )}

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
                <Link href="/how-it-works" className="text-lg font-medium">
                  How It Works
                </Link>

                {user ? (
                  <>
                    <Link href="/dashboard" className="text-lg font-medium">
                      Dashboard
                    </Link>
                    <Link href="/profile" className="text-lg font-medium">
                      Profile
                    </Link>
                    <Button variant="outline" onClick={handleSignOut} className="mt-4">
                      Sign out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/sign-in" className="text-lg font-medium">
                      Sign in
                    </Link>
                    <Link href="/auth/sign-up" className="text-lg font-medium">
                      Sign up
                    </Link>
                    <WaitlistButton variant="default" className="mt-4" />
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
