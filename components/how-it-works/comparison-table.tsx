import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function ComparisonTable() {
  const steps = [
    {
      step: "Incident Reporting",
      traditional: {
        description: "Manual form filling, phone calls, or in-person reporting",
        time: "1-2 days",
        efficiency: "low",
      },
      tuntut: {
        description: "Mobile app with guided reporting and photo capture",
        time: "15-30 minutes",
        efficiency: "high",
      },
    },
    {
      step: "Data Intake",
      traditional: {
        description: "Manual data entry from forms and documents",
        time: "1-2 days",
        efficiency: "low",
      },
      tuntut: {
        description: "AI OCR automatically extracts data from documents and photos",
        time: "Minutes",
        efficiency: "high",
      },
    },
    {
      step: "Damage Documentation",
      traditional: {
        description: "Manual photo review and categorization",
        time: "1-2 hours",
        efficiency: "medium",
      },
      tuntut: {
        description: "Auto-tagging and classification of damage photos",
        time: "Seconds",
        efficiency: "high",
      },
    },
    {
      step: "Initial Assessment",
      traditional: {
        description: "Human adjuster reviews documents and photos",
        time: "1-3 days",
        efficiency: "medium",
      },
      tuntut: {
        description: "AI generates damage estimates based on photo analysis",
        time: "Minutes",
        efficiency: "high",
      },
    },
    {
      step: "Fraud & Compliance Check",
      traditional: {
        description: "Manual review against checklists and databases",
        time: "1-2 days",
        efficiency: "medium",
      },
      tuntut: {
        description: "AI scoring system flags potential fraud patterns",
        time: "Seconds",
        efficiency: "high",
      },
    },
    {
      step: "Human Investigation",
      traditional: {
        description: "Required for all claims regardless of complexity",
        time: "1-7 days",
        efficiency: "low",
      },
      tuntut: {
        description: "Only required for flagged or complex claims",
        time: "0-2 days",
        efficiency: "high",
      },
    },
    {
      step: "Report & Approval",
      traditional: {
        description: "Manual report writing and multi-level approval",
        time: "1-3 days",
        efficiency: "low",
      },
      tuntut: {
        description: "Auto-generated reports with 1-click approval",
        time: "Hours",
        efficiency: "high",
      },
    },
    {
      step: "Payout & Communication",
      traditional: {
        description: "Manual payment processing and customer updates",
        time: "1-3 days",
        efficiency: "medium",
      },
      tuntut: {
        description: "Automated payments and real-time status updates",
        time: "Hours",
        efficiency: "high",
      },
    },
    {
      step: "Post-Claim Analytics",
      traditional: {
        description: "Periodic manual reporting and retrospective analysis",
        time: "Weeks/Months",
        efficiency: "low",
      },
      tuntut: {
        description: "Real-time analytics dashboard with actionable insights",
        time: "Instant",
        efficiency: "high",
      },
    },
  ]

  return (
    <section className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Process Comparison</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A detailed comparison of each step in the claims adjustment process
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Process Step</TableHead>
              <TableHead className="min-w-[250px]">Traditional Approach</TableHead>
              <TableHead className="min-w-[250px]">tuntut.ai Approach</TableHead>
              <TableHead className="text-right">Time Savings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {steps.map((step, index) => {
              // Calculate time savings percentage (rough estimate for display)
              let timeSavings = "90%"
              if (step.traditional.time.includes("days") && step.tuntut.time.includes("Minutes")) {
                timeSavings = "99%"
              } else if (step.traditional.time.includes("days") && step.tuntut.time.includes("Hours")) {
                timeSavings = "90%"
              } else if (step.traditional.time.includes("hours") && step.tuntut.time.includes("Seconds")) {
                timeSavings = "95%"
              } else if (step.traditional.time.includes("Weeks")) {
                timeSavings = "99%"
              }

              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">{step.step}</TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <p>{step.traditional.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{step.traditional.time}</Badge>
                        <Badge
                          variant={
                            step.traditional.efficiency === "low"
                              ? "destructive"
                              : step.traditional.efficiency === "medium"
                                ? "secondary"
                                : "default"
                          }
                          className="capitalize"
                        >
                          {step.traditional.efficiency} efficiency
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <p>{step.tuntut.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{step.tuntut.time}</Badge>
                        <Badge variant="default" className="capitalize">
                          {step.tuntut.efficiency} efficiency
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-green-600 font-bold">{timeSavings}</span>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
