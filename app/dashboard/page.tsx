import { Container } from "@/components/layout/container"
import { MobileDashboard } from "@/components/dashboard/mobile-dashboard"

export default function DashboardPage() {
  return (
    <Container size="lg">
      <div className="py-6 sm:py-8 md:py-10 lg:py-12">
        <h1 className="mb-6 sm:mb-8 md:mb-10">Dashboard</h1>
        <MobileDashboard />
      </div>
    </Container>
  )
}
