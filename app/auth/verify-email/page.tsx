"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/layout/container"
import Link from "next/link"
import { Mail } from "lucide-react"

export default function VerifyEmailPage() {
  return (
    <Container size="sm" className="py-12">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Check your email</CardTitle>
          <CardDescription className="text-center">
            We&apos;ve sent you a verification link to your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          <p>
            Please check your email and click on the verification link to complete your registration. If you don&apos;t
            see the email, check your spam folder.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button asChild variant="outline" className="w-full">
            <Link href="/auth/sign-in">Back to sign in</Link>
          </Button>
        </CardFooter>
      </Card>
    </Container>
  )
}
