import { Container } from "@/components/layout/container"
import { MobileClaimDetails } from "@/components/claims/mobile-claim-details"

export default function ClaimDetailsPage({ params }: { params: { id: string } }) {
  return (
    <Container size="lg">
      <div className="py-6 sm:py-8 md:py-10 lg:py-12">
        <MobileClaimDetails />
      </div>
    </Container>
  )
}
