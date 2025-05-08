import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function EfficiencyMetrics() {
  const metrics = [
    {
      title: "Processing Time",
      traditional: "7-14 days",
      tuntut: "1-3 days",
      improvement: "80%",
      description: "Average time from claim submission to resolution",
    },
    {
      title: "Adjuster Workload",
      traditional: "25-30 claims/month",
      tuntut: "50-60 claims/month",
      improvement: "100%",
      description: "Number of claims an adjuster can handle per month",
    },
    {
      title: "Fraud Detection",
      traditional: "65% accuracy",
      tuntut: "92% accuracy",
      improvement: "42%",
      description: "Accuracy in identifying potentially fraudulent claims",
    },
    {
      title: "Customer Satisfaction",
      traditional: "72% satisfied",
      tuntut: "94% satisfied",
      improvement: "31%",
      description: "Percentage of customers satisfied with claims experience",
    },
  ]

  return (
    <section className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Efficiency Metrics</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Quantifiable improvements in key performance indicators
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{metric.title}</CardTitle>
              <CardDescription>{metric.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Traditional</div>
                    <div className="text-2xl font-bold">{metric.traditional}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-primary">tuntut.ai</div>
                    <div className="text-2xl font-bold">{metric.tuntut}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Improvement</span>
                    <span className="font-medium text-green-600">{metric.improvement}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: metric.improvement }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
