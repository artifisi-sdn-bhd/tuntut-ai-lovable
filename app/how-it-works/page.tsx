import { Container } from "@/components/layout/container"
import { VisualProcessComparison } from "@/components/how-it-works/visual-process-comparison"
import { EfficiencyMetrics } from "@/components/how-it-works/efficiency-metrics"
import { Button } from "@/components/ui/button"
import { Clock, FileCheck, Shield } from "lucide-react"
import Link from "next/link"
import { WaitlistButton } from "@/components/waitlist/waitlist-button"

export default function HowItWorks() {
  return (
    <Container>
      <div className="flex flex-col items-center gap-16 md:gap-24 py-12 md:py-20">
        {/* Hero Section */}
        <section className="w-full text-center space-y-6 md:space-y-8">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Process Comparison
          </div>
          <h1 className="text-balance text-4xl sm:text-5xl md:text-6xl font-bold">How It Works</h1>
          <p className="text-balance text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            See how tuntut.ai transforms the traditional claims adjustment process, reducing manual work and
            accelerating claim resolution.
          </p>
        </section>

        {/* Visual Process Comparison - Removing the duplicate heading */}
        <VisualProcessComparison />

        {/* Efficiency Metrics */}
        <EfficiencyMetrics />

        {/* Key Benefits */}
        <section className="w-full py-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Benefits</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The tuntut.ai platform delivers significant improvements across the entire claims process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-muted/30 rounded-xl p-6 border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Time Efficiency</h3>
              <p className="text-muted-foreground">
                Reduce claim processing time by up to 70% with automated document analysis and AI-powered assessments.
              </p>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Accuracy</h3>
              <p className="text-muted-foreground">
                Improve assessment accuracy by 35% through consistent AI analysis and standardized evaluation criteria.
              </p>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fraud Prevention</h3>
              <p className="text-muted-foreground">
                Detect potential fraud with 92% accuracy using advanced pattern recognition and anomaly detection.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full text-center space-y-8 py-12 bg-muted/30 rounded-3xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Your Claims Process?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join our waitlist to be among the first to experience the future of claims adjustment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <WaitlistButton size="lg" className="px-8" />
            <Button asChild variant="outline" size="lg">
              <Link href="/features">Explore Features</Link>
            </Button>
          </div>
        </section>
      </div>
    </Container>
  )
}
