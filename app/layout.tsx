import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SkipLink } from "@/components/a11y/skip-link"
import { MobileHeader } from "@/components/navigation/mobile-header"
import { cn } from "@/lib/utils"
import { AuthProvider } from "@/contexts/auth-context"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Tuntut AI | Claims Adjustment Platform",
  description:
    "AI-powered platform for insurance claims adjusters. Reduce manual work by 50%, detect fraud, and process claims faster.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#020817" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <SkipLink />
            <div className="relative flex min-h-screen flex-col">
              <MobileHeader />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <footer className="border-t py-8">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                  <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    &copy; {new Date().getFullYear()} Tuntut AI. All rights reserved.
                  </p>
                  <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      Privacy
                    </a>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      Terms
                    </a>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      Contact
                    </a>
                  </div>
                </div>
              </footer>
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
