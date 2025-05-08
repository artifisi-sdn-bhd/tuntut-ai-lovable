import { Container } from "@/components/layout/container"
import { MobileClaimConfirmation } from "@/components/claims/mobile-claim-confirmation"

export default function ClaimConfirmationPage({
  searchParams,
}: {
  searchParams: { id?: string }
}) {
  const claimId = searchParams.id || "TUN-2023-7845" // Fallback ID

  return (
    <Container size="md">
      <div className="py-6 sm:py-8 md:py-10 lg:py-12">
        <MobileClaimConfirmation claimId={claimId} />
      </div>
    </Container>
  )
}
