import { AdjusterDashboard } from "@/components/adjuster/adjuster-dashboard"
import { Container } from "@/components/layout/container"

export default function AdjusterPage() {
  return (
    <Container size="xl">
      <div className="py-6 sm:py-8 md:py-10 lg:py-12">
        <AdjusterDashboard />
      </div>
    </Container>
  )
}
