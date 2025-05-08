import { Container } from "@/components/layout/container"
import { FeatureCard } from "@/components/waitlist/feature-card"
import { Testimonial } from "@/components/waitlist/testimonial"
import { CheckCircle, FileText, Clock, Shield, BarChart } from "lucide-react"
import { WaitlistButton } from "@/components/waitlist/waitlist-button"

export default function Home() {
  return (
    <Container>
      <div className="flex flex-col items-center gap-16 md:gap-24 py-12 md:py-20">
        {/* Hero Section */}
        <section className="w-full text-center space-y-6 md:space-y-8">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Coming Soon
          </div>
          <h1 className="text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            AI-Powered Claims Adjustment
          </h1>
          <p className="text-balance text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Reduce manual work by 50%, detect fraud, and process claims faster with our AI-powered platform for
            insurance adjusters.
          </p>

          {/* Waitlist Button (replacing form) */}
          <div className="max-w-md mx-auto w-full mt-8">
            <WaitlistButton size="lg" className="w-full py-6 text-xl" />
          </div>

          <div className="pt-6 text-sm text-muted-foreground">
            <p>🚀 Early access coming Q3 2025. Join the waitlist to be first in line.</p>
          </div>
        </section>

        {/* Product Preview */}
        <section className="w-full relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10"></div>
          <div className="relative rounded-xl overflow-hidden border shadow-xl bg-white">
            <div className="flex flex-col">
              {/* Mock Dashboard Header */}
              <div className="bg-primary/10 p-4 border-b">
                <div className="flex justify-between items-center">
                  <div className="font-bold text-xl">Tuntut AI Claims Dashboard</div>
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-full bg-primary/20"></div>
                    <div className="h-8 w-8 rounded-full bg-primary/20"></div>
                  </div>
                </div>
              </div>

              {/* Mock Dashboard Content */}
              <div className="grid grid-cols-12 gap-4 p-6">
                {/* Sidebar */}
                <div className="col-span-3 hidden md:block">
                  <div className="space-y-2">
                    <div className="h-10 bg-muted rounded w-full"></div>
                    <div className="h-10 bg-primary/20 rounded w-full"></div>
                    <div className="h-10 bg-muted rounded w-full"></div>
                    <div className="h-10 bg-muted rounded w-full"></div>
                    <div className="h-10 bg-muted rounded w-full"></div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="col-span-12 md:col-span-9 space-y-6">
                  {/* Stats Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg border">
                      <div className="text-sm text-muted-foreground">Claims Processed</div>
                      <div className="text-2xl font-bold">247</div>
                      <div className="text-xs text-green-500">+12% from last week</div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg border">
                      <div className="text-sm text-muted-foreground">Avg. Processing Time</div>
                      <div className="text-2xl font-bold">1.2 days</div>
                      <div className="text-xs text-green-500">-45% with AI</div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg border">
                      <div className="text-sm text-muted-foreground">Fraud Detected</div>
                      <div className="text-2xl font-bold">18 claims</div>
                      <div className="text-xs text-green-500">$240K saved</div>
                    </div>
                  </div>

                  {/* Claims Table */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted/50 p-3 border-b">
                      <div className="font-medium">Recent Claims</div>
                    </div>
                    <div className="divide-y">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center justify-between p-3 hover:bg-muted/20">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">Claim #{1000 + i}</div>
                              <div className="text-sm text-muted-foreground">Auto Collision</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-sm font-medium">${Math.floor(Math.random() * 5000) + 1000}</div>
                            <div
                              className={`px-2 py-1 rounded-full text-xs ${
                                i % 3 === 0
                                  ? "bg-yellow-100 text-yellow-800"
                                  : i % 2 === 0
                                    ? "bg-green-100 text-green-800"
                                    : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {i % 3 === 0 ? "Review" : i % 2 === 0 ? "Approved" : "Processing"}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Analysis Preview */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-muted/50 p-3 border-b">
                        <div className="font-medium">AI Document Analysis</div>
                      </div>
                      <div className="p-4">
                        <div className="space-y-2">
                          <div className="h-4 bg-muted rounded w-full"></div>
                          <div className="h-4 bg-muted rounded w-3/4"></div>
                          <div className="h-4 bg-muted rounded w-5/6"></div>
                          <div className="h-4 bg-muted rounded w-2/3"></div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <div className="h-20 bg-muted rounded"></div>
                          <div className="h-20 bg-muted rounded"></div>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-muted/50 p-3 border-b">
                        <div className="font-medium">Risk Assessment</div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="font-medium">Fraud Score</div>
                          <div className="text-green-500 font-bold">Low Risk</div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "15%" }}></div>
                        </div>
                        <div className="mt-6 space-y-2">
                          <div className="flex justify-between">
                            <div className="text-sm">Document Consistency</div>
                            <div className="text-sm font-medium">98%</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="text-sm">Photo Verification</div>
                            <div className="text-sm font-medium">100%</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="text-sm">Claim Pattern</div>
                            <div className="text-sm font-medium">Normal</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Supercharge Your Adjustment Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI platform handles the tedious work so adjusters can focus on what matters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FileText className="h-10 w-10 text-primary" />}
              title="Automated Document Analysis"
              description="OCR technology extracts key information from reports, quotes, and forms automatically."
            />

            <FeatureCard
              icon={<Shield className="h-10 w-10 text-primary" />}
              title="Fraud Detection"
              description="AI algorithms flag suspicious patterns and inconsistencies with confidence scoring."
            />

            <FeatureCard
              icon={<BarChart className="h-10 w-10 text-primary" />}
              title="Smart Reserve Estimation"
              description="Get AI-recommended reserve amounts based on damage assessment and historical data."
            />

            <FeatureCard
              icon={<CheckCircle className="h-10 w-10 text-primary" />}
              title="Intelligent Photo Analysis"
              description="Automatically detect, classify, and tag damage in photos for faster assessment."
            />

            <FeatureCard
              icon={<Clock className="h-10 w-10 text-primary" />}
              title="50% Time Savings"
              description="Reduce routine work by up to 50% through intelligent automation."
            />

            <FeatureCard
              icon={<FileText className="h-10 w-10 text-primary" />}
              title="Enterprise Integration"
              description="Seamless integration with Guidewire, Duck Creek, and custom REST APIs."
            />
          </div>
        </section>

        {/* Testimonials/Social Proof */}
        <section className="w-full py-12 bg-muted/50 rounded-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Early Testers Are Saying</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Industry professionals who've previewed our technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            <Testimonial
              quote="This technology could revolutionize how we handle claims. The time savings alone would transform our department."
              author="Sarah J."
              role="Claims Director, Major Insurance Provider"
            />

            <Testimonial
              quote="The fraud detection capabilities are impressive. We caught patterns we would have missed in our manual review process."
              author="Michael T."
              role="Risk Assessment Manager"
            />

            <Testimonial
              quote="Integration was seamless with our existing systems. The AI recommendations were surprisingly accurate."
              author="David L."
              role="IT Director, Insurance Services"
            />
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full text-center space-y-8 py-12">
          <h2 className="text-3xl md:text-4xl font-bold">Be Among the First to Transform Your Claims Process</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Early access partners will receive premium onboarding, custom integration support, and preferential pricing.
          </p>

          <div className="max-w-md mx-auto w-full mt-8">
            <WaitlistButton size="lg" className="w-full py-6 text-xl" />
          </div>

          <div className="pt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4" />
            <span>No credit card required</span>
            <span className="mx-2">•</span>
            <CheckCircle className="h-4 w-4" />
            <span>Cancel anytime</span>
          </div>
        </section>
      </div>
    </Container>
  )
}
