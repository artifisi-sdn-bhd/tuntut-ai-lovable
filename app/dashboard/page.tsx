"use client"

import { Container } from "@/components/layout/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { FileText, Clock, Shield, BarChart } from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <Container className="py-8">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome to your Dashboard</h1>
            <p className="text-muted-foreground">Manage your claims and view analytics</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Active Claims</CardDescription>
                <CardTitle className="text-3xl">12</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground flex items-center">
                  <FileText className="h-3 w-3 mr-1" />
                  <span>3 require attention</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Average Processing Time</CardDescription>
                <CardTitle className="text-3xl">1.2 days</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-green-600 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>45% faster than industry average</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Fraud Detection</CardDescription>
                <CardTitle className="text-3xl">98.2%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  <span>Accuracy rate</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Cost Savings</CardDescription>
                <CardTitle className="text-3xl">$24,500</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-green-600 flex items-center">
                  <BarChart className="h-3 w-3 mr-1" />
                  <span>32% increase this month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Claims</CardTitle>
              <CardDescription>Your most recent claim submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between py-3">
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
            </CardContent>
          </Card>
        </div>
      </Container>
    </ProtectedRoute>
  )
}
