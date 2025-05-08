import { Card, CardContent } from "@/components/ui/card"
import {
  FileText,
  Database,
  ImageIcon,
  Calculator,
  Shield,
  Search,
  CheckCircle,
  CreditCard,
  BarChart,
} from "lucide-react"

export function ProcessFlow() {
  const steps = [
    {
      id: 1,
      title: "Incident Reporting",
      traditional: "Manual forms & calls",
      tuntut: "Mobile app reporting",
      icon: FileText,
    },
    {
      id: 2,
      title: "Data Intake",
      traditional: "Manual data entry",
      tuntut: "AI OCR extraction",
      icon: Database,
    },
    {
      id: 3,
      title: "Damage Documentation",
      traditional: "Manual photo review",
      tuntut: "Auto-tag & classify",
      icon: ImageIcon,
    },
    {
      id: 4,
      title: "Initial Assessment",
      traditional: "Human review",
      tuntut: "AI damage estimation",
      icon: Calculator,
    },
    {
      id: 5,
      title: "Fraud & Compliance",
      traditional: "Manual verification",
      tuntut: "AI pattern detection",
      icon: Shield,
    },
    {
      id: 6,
      title: "Human Investigation",
      traditional: "All claims",
      tuntut: "Flagged claims only",
      icon: Search,
    },
    {
      id: 7,
      title: "Report & Approval",
      traditional: "Manual reports",
      tuntut: "1-click approval",
      icon: CheckCircle,
    },
    {
      id: 8,
      title: "Payout & Communication",
      traditional: "Manual processing",
      tuntut: "Automated payments",
      icon: CreditCard,
    },
    {
      id: 9,
      title: "Post-Claim Analytics",
      traditional: "Periodic reports",
      tuntut: "Real-time insights",
      icon: BarChart,
    },
  ]

  return (
    <section className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Process Flow Comparison</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          See how each step in the claims process is transformed with tuntut.ai
        </p>
      </div>

      <div className="relative">
        {/* Process flow visualization */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-muted -translate-y-1/2 z-0"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 relative z-10">
          {steps.map((step) => (
            <Card key={step.id} className="border bg-card">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-2xl font-bold text-muted-foreground/50">{step.id}</span>
                </div>

                <h3 className="text-lg font-bold mb-4">{step.title}</h3>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Traditional</div>
                    <div className="p-3 bg-muted/50 rounded-md text-sm min-h-[60px] flex items-center">
                      {step.traditional}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-primary">tuntut.ai</div>
                    <div className="p-3 bg-primary/10 rounded-md text-sm min-h-[60px] flex items-center border-primary/20 border">
                      {step.tuntut}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
