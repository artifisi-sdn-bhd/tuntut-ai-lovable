import { Container } from "@/components/layout/container"
import { MobileClaimForm } from "@/components/claims/mobile-claim-form"

export default function NewClaimPage() {
  return (
    <Container size="lg">
      <div className="py-6 sm:py-8 md:py-10 lg:py-12">
        <h1 className="mb-6 sm:mb-8 md:mb-10">Submit New Claim</h1>
        <MobileClaimForm />
      </div>
    </Container>
  )
}
