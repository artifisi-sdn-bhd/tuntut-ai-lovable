"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Container } from "@/components/layout/container"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { supabase } from "@/lib/supabase"

export default function ProfilePage() {
  const { user } = useAuth()
  const [email, setEmail] = useState(user?.email || "")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
  const { toast } = useToast()

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdatingEmail(true)

    try {
      const { error } = await supabase.auth.updateUser({ email })

      if (error) {
        toast({
          title: "Error updating email",
          description: error.message,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Verification email sent",
        description: "Please check your email to verify your new email address.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsUpdatingEmail(false)
    }
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    setIsUpdatingPassword(true)

    try {
      const { error } = await supabase.auth.updateUser({ password })

      if (error) {
        toast({
          title: "Error updating password",
          description: error.message,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Success",
        description: "Your password has been updated successfully.",
      })

      setPassword("")
      setConfirmPassword("")
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  return (
    <ProtectedRoute>
      <Container size="md" className="py-12">
        <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Email Address</CardTitle>
              <CardDescription>Update your email address</CardDescription>
            </CardHeader>
            <form onSubmit={handleUpdateEmail}>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isUpdatingEmail || email === user?.email}>
                  {isUpdatingEmail ? "Updating..." : "Update email"}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Update your password</CardDescription>
            </CardHeader>
            <form onSubmit={handleUpdatePassword}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isUpdatingPassword || !password}>
                  {isUpdatingPassword ? "Updating..." : "Update password"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </Container>
    </ProtectedRoute>
  )
}
