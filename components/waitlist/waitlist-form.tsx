"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { GOOGLE_FORM_URL } from "@/lib/constants"
import { ExternalLink } from "lucide-react"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [isAdjuster, setIsAdjuster] = useState(true)
  const { toast } = useToast()

  const handleJoinWaitlist = () => {
    // Open Google Form in a new tab
    window.open(GOOGLE_FORM_URL, "_blank")

    // Show toast notification
    toast({
      title: "Opening waitlist form",
      description: "The waitlist form is opening in a new tab.",
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            placeholder="Your company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="h-12"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="is-adjuster"
          checked={isAdjuster}
          onCheckedChange={(checked) => setIsAdjuster(checked as boolean)}
        />
        <Label htmlFor="is-adjuster" className="text-sm text-muted-foreground">
          I'm involved in the claims adjustment process
        </Label>
      </div>

      <Button onClick={handleJoinWaitlist} className="w-full h-12 text-lg">
        Join the Waitlist <ExternalLink className="ml-2 h-4 w-4" />
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        You'll be redirected to our Google Form to complete your registration
      </p>
    </div>
  )
}
