"use client"

import Link from "next/link"
import { CheckCircle, FileText, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileCard, MobileCardContent, MobileCardFooter, MobileCardHeader } from "@/components/layout/mobile-card"

interface MobileClaimConfirmationProps {
  claimId: string
}

export function MobileClaimConfirmation({ claimId }: MobileClaimConfirmationProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <MobileCard className="w-full max-w-md">
        <MobileCardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold">Claim Submitted Successfully</h2>
          <p className="text-muted-foreground">Your claim has been received and is being processed.</p>
        </MobileCardHeader>

        <MobileCardContent>
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Tracking ID:</span>
                <span className="text-sm font-bold">{claimId}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span className="text-sm font-medium">Status:</span>
                <span className="text-sm font-medium text-orange-500">Under Review</span>
              </div>

              <div className="flex justify-between mt-2">
                <span className="text-sm font-medium">Submitted:</span>
                <span className="text-sm">{new Date().toLocaleDateString()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">What happens next?</h3>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Our team will review your claim within 1-2 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>You'll receive email updates as your claim progresses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>You can check your claim status anytime in "My Claims"</span>
                </li>
              </ul>
            </div>
          </div>
        </MobileCardContent>

        <MobileCardFooter>
          <div className="w-full space-y-3">
            <Button asChild className="w-full h-12">
              <Link href="/my-claims">
                <FileText className="mr-2 h-5 w-5" />
                View My Claims
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full h-12">
              <Link href="/dashboard">
                <Home className="mr-2 h-5 w-5" />
                Go to Dashboard
              </Link>
            </Button>
          </div>
        </MobileCardFooter>
      </MobileCard>
    </div>
  )
}
