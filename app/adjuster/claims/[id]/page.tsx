import { AiClaimAnalysis } from "@/components/adjuster/ai-claim-analysis"
import { Container } from "@/components/layout/container"

export default function ClaimDetailPage({ params }: { params: { id: string } }) {
  return (
    <Container size="xl">
      <div className="py-6 sm:py-8 md:py-10 lg:py-12">
        <AiClaimAnalysis claimId={params.id} />
      </div>
    </Container>
  )
}
