"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertTriangle, BarChart3, Clock, FileText, Filter, Search, SlidersHorizontal, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

// Mock data
const mockClaims = [
  {
    id: "TUN-2023-7845",
    claimantName: "John Smith",
    date: "2023-10-15",
    status: "under_review",
    riskScore: 32,
    estimatedReserve: "$2,450",
    aiAssisted: true,
    fraudFlags: [],
    complexity: "low",
    policyType: "auto",
    assignedTo: "current",
  },
  {
    id: "TUN-2023-6932",
    claimantName: "Sarah Johnson",
    date: "2023-10-12",
    status: "more_info",
    riskScore: 68,
    estimatedReserve: "$5,780",
    aiAssisted: true,
    fraudFlags: ["price_anomaly"],
    complexity: "medium",
    policyType: "auto",
    assignedTo: "current",
  },
  {
    id: "TUN-2023-5421",
    claimantName: "Michael Brown",
    date: "2023-10-08",
    status: "approved",
    riskScore: 12,
    estimatedReserve: "$1,250",
    aiAssisted: true,
    fraudFlags: [],
    complexity: "low",
    policyType: "auto",
    assignedTo: "current",
  },
  {
    id: "TUN-2023-4789",
    claimantName: "Emily Davis",
    date: "2023-10-05",
    status: "escalated",
    riskScore: 89,
    estimatedReserve: "$8,900",
    aiAssisted: false,
    fraudFlags: ["doc_mismatch", "photo_duplicate"],
    complexity: "high",
    policyType: "auto",
    assignedTo: "team",
  },
  {
    id: "TUN-2023-3654",
    claimantName: "Robert Wilson",
    date: "2023-10-03",
    status: "under_review",
    riskScore: 45,
    estimatedReserve: "$3,200",
    aiAssisted: true,
    fraudFlags: ["price_anomaly"],
    complexity: "medium",
    policyType: "property",
    assignedTo: "current",
  },
  {
    id: "TUN-2023-2987",
    claimantName: "Jennifer Lee",
    date: "2023-09-28",
    status: "under_review",
    riskScore: 22,
    estimatedReserve: "$1,800",
    aiAssisted: true,
    fraudFlags: [],
    complexity: "low",
    policyType: "property",
    assignedTo: "current",
  },
]

// Status mapping
const statusMap = {
  draft: { label: "Draft", color: "default" },
  submitted: { label: "Submitted", color: "default" },
  under_review: { label: "Under Review", color: "warning" },
  more_info: { label: "Needs Info", color: "warning" },
  approved: { label: "Approved", color: "success" },
  rejected: { label: "Rejected", color: "destructive" },
  escalated: { label: "Escalated", color: "destructive" },
}

// Risk score color mapping
const getRiskColor = (score: number) => {
  if (score < 30) return "text-green-600 bg-green-50"
  if (score < 70) return "text-amber-600 bg-amber-50"
  return "text-red-600 bg-red-50"
}

export function AdjusterDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const router = useRouter()

  // Filter claims based on search and tab
  const filteredClaims = mockClaims.filter((claim) => {
    const matchesSearch =
      claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.claimantName.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "my_queue") return matchesSearch && claim.assignedTo === "current"
    if (activeTab === "team_queue") return matchesSearch && claim.assignedTo === "team"
    if (activeTab === "high_risk") return matchesSearch && claim.riskScore > 70
    if (activeTab === "auto_approved") return matchesSearch && claim.aiAssisted && claim.status === "approved"

    return matchesSearch
  })

  // Count claims by category
  const myQueueCount = mockClaims.filter((c) => c.assignedTo === "current").length
  const highRiskCount = mockClaims.filter((c) => c.riskScore > 70).length
  const autoApprovedCount = mockClaims.filter((c) => c.aiAssisted && c.status === "approved").length
  const flaggedCount = mockClaims.filter((c) => c.fraudFlags.length > 0).length

  // Calculate efficiency metrics
  const claimsProcessedToday = 12
  const averageProcessingTime = "1.2 hours"
  const aiAssistedPercentage = 75

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Adjuster Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and process claims with AI assistance. Today: {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => router.push("/adjuster/analytics")}>
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {showFilters && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Filter Claims</CardTitle>
            <CardDescription>Refine the claims list based on specific criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Policy Type</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      All Types
                      <Filter className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Select Policy Type</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>All Types</DropdownMenuItem>
                      <DropdownMenuItem>Auto</DropdownMenuItem>
                      <DropdownMenuItem>Property</DropdownMenuItem>
                      <DropdownMenuItem>Liability</DropdownMenuItem>
                      <DropdownMenuItem>Workers Comp</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Claim Status</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      All Statuses
                      <Filter className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Select Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>All Statuses</DropdownMenuItem>
                      <DropdownMenuItem>Under Review</DropdownMenuItem>
                      <DropdownMenuItem>Needs Info</DropdownMenuItem>
                      <DropdownMenuItem>Approved</DropdownMenuItem>
                      <DropdownMenuItem>Rejected</DropdownMenuItem>
                      <DropdownMenuItem>Escalated</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Risk Level</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      All Risk Levels
                      <Filter className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Select Risk Level</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>All Risk Levels</DropdownMenuItem>
                      <DropdownMenuItem>Low Risk (0-30)</DropdownMenuItem>
                      <DropdownMenuItem>Medium Risk (31-70)</DropdownMenuItem>
                      <DropdownMenuItem>High Risk (71-100)</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      Last 30 Days
                      <Filter className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Select Date Range</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Today</DropdownMenuItem>
                      <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
                      <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
                      <DropdownMenuItem>Last 90 Days</DropdownMenuItem>
                      <DropdownMenuItem>Custom Range</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowFilters(false)}>
              Cancel
            </Button>
            <Button>Apply Filters</Button>
          </CardFooter>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Queue</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myQueueCount}</div>
            <p className="text-xs text-muted-foreground">
              {myQueueCount > 0
                ? `${Math.round((myQueueCount / mockClaims.length) * 100)}% of total claims`
                : "No claims in queue"}
            </p>
            <Progress className="mt-2" value={(myQueueCount / mockClaims.length) * 100} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Claims</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highRiskCount}</div>
            <p className="text-xs text-muted-foreground">
              {highRiskCount > 0
                ? `${Math.round((highRiskCount / mockClaims.length) * 100)}% of total claims`
                : "No high risk claims"}
            </p>
            <Progress className="mt-2" value={(highRiskCount / mockClaims.length) * 100} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Approved</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{autoApprovedCount}</div>
            <p className="text-xs text-muted-foreground">
              {autoApprovedCount > 0
                ? `${Math.round((autoApprovedCount / mockClaims.length) * 100)}% of total claims`
                : "No AI approved claims"}
            </p>
            <Progress className="mt-2" value={(autoApprovedCount / mockClaims.length) * 100} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fraud Flagged</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{flaggedCount}</div>
            <p className="text-xs text-muted-foreground">
              {flaggedCount > 0
                ? `${Math.round((flaggedCount / mockClaims.length) * 100)}% of total claims`
                : "No flagged claims"}
            </p>
            <Progress className="mt-2" value={(flaggedCount / mockClaims.length) * 100} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Efficiency Metrics</CardTitle>
          <CardDescription>Your performance with AI assistance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center justify-center space-y-1 rounded-lg border p-4">
              <span className="text-sm font-medium text-muted-foreground">Claims Processed Today</span>
              <span className="text-3xl font-bold">{claimsProcessedToday}</span>
              <span className="text-xs text-green-600">+28% vs. manual average</span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1 rounded-lg border p-4">
              <span className="text-sm font-medium text-muted-foreground">Average Processing Time</span>
              <span className="text-3xl font-bold">{averageProcessingTime}</span>
              <span className="text-xs text-green-600">-45% vs. manual average</span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1 rounded-lg border p-4">
              <span className="text-sm font-medium text-muted-foreground">AI Assisted Claims</span>
              <span className="text-3xl font-bold">{aiAssistedPercentage}%</span>
              <span className="text-xs text-green-600">+15% from last week</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center">
          <Input
            placeholder="Search claims by ID or claimant name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 h-10"
          />
          <Button variant="ghost" size="icon" className="ml-2 h-10 w-10">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Claims</TabsTrigger>
            <TabsTrigger value="my_queue">My Queue</TabsTrigger>
            <TabsTrigger value="team_queue">Team Queue</TabsTrigger>
            <TabsTrigger value="high_risk">High Risk</TabsTrigger>
            <TabsTrigger value="auto_approved">AI Approved</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <div className="space-y-4">
              {filteredClaims.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No claims found</p>
                </div>
              ) : (
                filteredClaims.map((claim) => (
                  <Card key={claim.id} className="overflow-hidden">
                    <Link href={`/adjuster/claims/${claim.id}`} className="block">
                      <div className="flex flex-col sm:flex-row">
                        <div className="flex-1 p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <h4 className="font-medium text-base sm:text-lg">{claim.claimantName}</h4>
                              <p className="text-sm text-muted-foreground">{claim.id}</p>
                            </div>
                            <div className="flex items-center gap-2 mt-2 sm:mt-0">
                              <Badge variant={statusMap[claim.status].color} className="text-xs">
                                {statusMap[claim.status].label}
                              </Badge>
                              {claim.aiAssisted && (
                                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                  <Zap className="mr-1 h-3 w-3" />
                                  AI Assisted
                                </Badge>
                              )}
                            </div>
                          </div>

                          <Separator className="my-3" />

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div>
                              <p className="text-xs text-muted-foreground">Date</p>
                              <p className="text-sm font-medium">{claim.date}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Policy Type</p>
                              <p className="text-sm font-medium capitalize">{claim.policyType}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Complexity</p>
                              <p className="text-sm font-medium capitalize">{claim.complexity}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Est. Reserve</p>
                              <p className="text-sm font-medium">{claim.estimatedReserve}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 sm:w-48 sm:flex-col sm:items-center sm:justify-center sm:border-l sm:p-6">
                          <div className="flex flex-col items-center">
                            <div
                              className={`text-lg font-bold rounded-full h-12 w-12 flex items-center justify-center ${getRiskColor(
                                claim.riskScore,
                              )}`}
                            >
                              {claim.riskScore}
                            </div>
                            <span className="text-xs text-muted-foreground mt-1">Risk Score</span>
                          </div>

                          <div className="flex items-center sm:mt-4">
                            {claim.fraudFlags.length > 0 && (
                              <span className="mr-2 text-amber-500">
                                <AlertTriangle className="h-4 w-4" />
                              </span>
                            )}
                            <FileText className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="my_queue" className="mt-4">
            <div className="space-y-4">
              {filteredClaims.filter((claim) => claim.assignedTo === "current").length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No claims in your queue</p>
                </div>
              ) : (
                filteredClaims
                  .filter((claim) => claim.assignedTo === "current")
                  .map((claim) => (
                    <Card key={claim.id} className="overflow-hidden">
                      <Link href={`/adjuster/claims/${claim.id}`} className="block">
                        <div className="flex flex-col sm:flex-row">
                          <div className="flex-1 p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <h4 className="font-medium text-base sm:text-lg">{claim.claimantName}</h4>
                                <p className="text-sm text-muted-foreground">{claim.id}</p>
                              </div>
                              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                <Badge variant={statusMap[claim.status].color} className="text-xs">
                                  {statusMap[claim.status].label}
                                </Badge>
                                {claim.aiAssisted && (
                                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                    <Zap className="mr-1 h-3 w-3" />
                                    AI Assisted
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <Separator className="my-3" />

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                              <div>
                                <p className="text-xs text-muted-foreground">Date</p>
                                <p className="text-sm font-medium">{claim.date}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Policy Type</p>
                                <p className="text-sm font-medium capitalize">{claim.policyType}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Complexity</p>
                                <p className="text-sm font-medium capitalize">{claim.complexity}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Est. Reserve</p>
                                <p className="text-sm font-medium">{claim.estimatedReserve}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-4 sm:w-48 sm:flex-col sm:items-center sm:justify-center sm:border-l sm:p-6">
                            <div className="flex flex-col items-center">
                              <div
                                className={`text-lg font-bold rounded-full h-12 w-12 flex items-center justify-center ${getRiskColor(
                                  claim.riskScore,
                                )}`}
                              >
                                {claim.riskScore}
                              </div>
                              <span className="text-xs text-muted-foreground mt-1">Risk Score</span>
                            </div>

                            <div className="flex items-center sm:mt-4">
                              {claim.fraudFlags.length > 0 && (
                                <span className="mr-2 text-amber-500">
                                  <AlertTriangle className="h-4 w-4" />
                                </span>
                              )}
                              <FileText className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Card>
                  ))
              )}
            </div>
          </TabsContent>

          {/* Similar content for other tabs */}
          <TabsContent value="team_queue" className="mt-4">
            {/* Team queue content */}
          </TabsContent>

          <TabsContent value="high_risk" className="mt-4">
            {/* High risk content */}
          </TabsContent>

          <TabsContent value="auto_approved" className="mt-4">
            {/* AI approved content */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
