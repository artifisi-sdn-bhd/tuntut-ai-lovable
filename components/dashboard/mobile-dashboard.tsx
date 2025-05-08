"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertTriangle, CheckCircle, Clock, FileText, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MobileCard, MobileCardContent, MobileCardHeader } from "@/components/layout/mobile-card"
import { MobileTabs, MobileTabsList, MobileTabsTrigger, MobileTabsContent } from "@/components/navigation/mobile-tabs"

// Mock data
const mockClaims = [
  {
    id: "TUN-2023-7845",
    claimantName: "John Smith",
    date: "2023-10-15",
    status: "under_review",
    riskLevel: "low",
    fraudFlags: [],
  },
  {
    id: "TUN-2023-6932",
    claimantName: "Sarah Johnson",
    date: "2023-10-12",
    status: "more_info",
    riskLevel: "medium",
    fraudFlags: ["price_anomaly"],
  },
  {
    id: "TUN-2023-5421",
    claimantName: "Michael Brown",
    date: "2023-10-08",
    status: "approved",
    riskLevel: "low",
    fraudFlags: [],
  },
  {
    id: "TUN-2023-4789",
    claimantName: "Emily Davis",
    date: "2023-10-05",
    status: "escalated",
    riskLevel: "high",
    fraudFlags: ["doc_mismatch", "photo_duplicate"],
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

export function MobileDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter claims based on search and tab
  const filteredClaims = mockClaims.filter((claim) => {
    const matchesSearch =
      claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.claimantName.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "pending")
      return matchesSearch && ["submitted", "under_review", "more_info"].includes(claim.status)
    if (activeTab === "approved") return matchesSearch && claim.status === "approved"
    if (activeTab === "flagged") return matchesSearch && claim.fraudFlags.length > 0

    return matchesSearch
  })

  // Count claims by status
  const pendingCount = mockClaims.filter((c) => ["submitted", "under_review", "more_info"].includes(c.status)).length
  const approvedCount = mockClaims.filter((c) => c.status === "approved").length
  const flaggedCount = mockClaims.filter((c) => c.fraudFlags.length > 0).length

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10">
      <div className="flex flex-col space-y-4 sm:space-y-6">
        <div className="flex items-center">
          <Input
            placeholder="Search claims..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 h-10 sm:h-12 md:h-14 text-sm sm:text-base"
          />
          <Button variant="ghost" size="icon" className="ml-2 h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </Button>
        </div>

        <div className="bg-muted p-4 rounded-lg mb-4 text-center">
          <p className="text-sm sm:text-base">Click on any claim below to view details and documents</p>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          <MobileCard className="p-3 sm:p-4 md:p-6">
            <div className="flex flex-col items-center text-center">
              <Clock className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-muted-foreground mb-1 sm:mb-2" />
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold">{pendingCount}</span>
              <span className="text-xs sm:text-sm md:text-base text-muted-foreground">Pending</span>
            </div>
          </MobileCard>

          <MobileCard className="p-3 sm:p-4 md:p-6">
            <div className="flex flex-col items-center text-center">
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-muted-foreground mb-1 sm:mb-2" />
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold">{approvedCount}</span>
              <span className="text-xs sm:text-sm md:text-base text-muted-foreground">Approved</span>
            </div>
          </MobileCard>

          <MobileCard className="p-3 sm:p-4 md:p-6">
            <div className="flex flex-col items-center text-center">
              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-muted-foreground mb-1 sm:mb-2" />
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold">{flaggedCount}</span>
              <span className="text-xs sm:text-sm md:text-base text-muted-foreground">Flagged</span>
            </div>
          </MobileCard>
        </div>
      </div>

      <MobileTabs value={activeTab} onValueChange={setActiveTab}>
        <MobileTabsList>
          <MobileTabsTrigger value="all">All</MobileTabsTrigger>
          <MobileTabsTrigger value="pending">Pending</MobileTabsTrigger>
          <MobileTabsTrigger value="approved">Approved</MobileTabsTrigger>
          <MobileTabsTrigger value="flagged">Flagged</MobileTabsTrigger>
        </MobileTabsList>

        <MobileTabsContent value="all">
          <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 xl:grid-cols-3">
            {filteredClaims.length === 0 ? (
              <div className="text-center py-8 sm:py-12 md:py-16 lg:col-span-2 xl:col-span-3">
                <p className="text-muted-foreground text-base sm:text-lg md:text-xl">No claims found</p>
              </div>
            ) : (
              filteredClaims.map((claim) => (
                <MobileCard key={claim.id} className="overflow-hidden">
                  <Link href={`/claims/${claim.id}`} className="block" prefetch={false}>
                    <MobileCardHeader className="pb-2 sm:pb-3 md:pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-base sm:text-lg md:text-xl">{claim.claimantName}</h4>
                          <p className="text-sm sm:text-base text-muted-foreground">{claim.id}</p>
                        </div>
                        <Badge variant={statusMap[claim.status].color} className="text-xs sm:text-sm">
                          {statusMap[claim.status].label}
                        </Badge>
                      </div>
                    </MobileCardHeader>

                    <MobileCardContent className="pb-3 sm:pb-4 md:pb-6">
                      <div className="flex justify-between items-center">
                        <div className="text-sm sm:text-base text-muted-foreground">
                          {new Date(claim.date).toLocaleDateString()}
                        </div>

                        <div className="flex items-center">
                          {claim.fraudFlags.length > 0 && (
                            <span className="mr-2 text-amber-500">
                              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
                            </span>
                          )}
                          <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                        </div>
                      </div>
                    </MobileCardContent>
                  </Link>
                </MobileCard>
              ))
            )}
          </div>
        </MobileTabsContent>

        <MobileTabsContent value="pending">
          <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 xl:grid-cols-3">
            {filteredClaims.filter((claim) => ["submitted", "under_review", "more_info"].includes(claim.status))
              .length === 0 ? (
              <div className="text-center py-8 sm:py-12 md:py-16 lg:col-span-2 xl:col-span-3">
                <p className="text-muted-foreground text-base sm:text-lg md:text-xl">No pending claims found</p>
              </div>
            ) : (
              filteredClaims
                .filter((claim) => ["submitted", "under_review", "more_info"].includes(claim.status))
                .map((claim) => (
                  <MobileCard key={claim.id} className="overflow-hidden">
                    <Link href={`/claims/${claim.id}`} className="block" prefetch={false}>
                      <MobileCardHeader className="pb-2 sm:pb-3 md:pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-base sm:text-lg md:text-xl">{claim.claimantName}</h4>
                            <p className="text-sm sm:text-base text-muted-foreground">{claim.id}</p>
                          </div>
                          <Badge variant={statusMap[claim.status].color} className="text-xs sm:text-sm">
                            {statusMap[claim.status].label}
                          </Badge>
                        </div>
                      </MobileCardHeader>

                      <MobileCardContent className="pb-3 sm:pb-4 md:pb-6">
                        <div className="flex justify-between items-center">
                          <div className="text-sm sm:text-base text-muted-foreground">
                            {new Date(claim.date).toLocaleDateString()}
                          </div>

                          <div className="flex items-center">
                            {claim.fraudFlags.length > 0 && (
                              <span className="mr-2 text-amber-500">
                                <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
                              </span>
                            )}
                            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                          </div>
                        </div>
                      </MobileCardContent>
                    </Link>
                  </MobileCard>
                ))
            )}
          </div>
        </MobileTabsContent>

        <MobileTabsContent value="approved">
          <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 xl:grid-cols-3">
            {filteredClaims.filter((claim) => claim.status === "approved").length === 0 ? (
              <div className="text-center py-8 sm:py-12 md:py-16 lg:col-span-2 xl:col-span-3">
                <p className="text-muted-foreground text-base sm:text-lg md:text-xl">No approved claims found</p>
              </div>
            ) : (
              filteredClaims
                .filter((claim) => claim.status === "approved")
                .map((claim) => (
                  <MobileCard key={claim.id} className="overflow-hidden">
                    <Link href={`/claims/${claim.id}`} className="block" prefetch={false}>
                      <MobileCardHeader className="pb-2 sm:pb-3 md:pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-base sm:text-lg md:text-xl">{claim.claimantName}</h4>
                            <p className="text-sm sm:text-base text-muted-foreground">{claim.id}</p>
                          </div>
                          <Badge variant={statusMap[claim.status].color} className="text-xs sm:text-sm">
                            {statusMap[claim.status].label}
                          </Badge>
                        </div>
                      </MobileCardHeader>

                      <MobileCardContent className="pb-3 sm:pb-4 md:pb-6">
                        <div className="flex justify-between items-center">
                          <div className="text-sm sm:text-base text-muted-foreground">
                            {new Date(claim.date).toLocaleDateString()}
                          </div>

                          <div className="flex items-center">
                            {claim.fraudFlags.length > 0 && (
                              <span className="mr-2 text-amber-500">
                                <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
                              </span>
                            )}
                            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                          </div>
                        </div>
                      </MobileCardContent>
                    </Link>
                  </MobileCard>
                ))
            )}
          </div>
        </MobileTabsContent>

        <MobileTabsContent value="flagged">
          <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 xl:grid-cols-3">
            {filteredClaims.filter((claim) => claim.fraudFlags.length > 0).length === 0 ? (
              <div className="text-center py-8 sm:py-12 md:py-16 lg:col-span-2 xl:col-span-3">
                <p className="text-muted-foreground text-base sm:text-lg md:text-xl">No flagged claims found</p>
              </div>
            ) : (
              filteredClaims
                .filter((claim) => claim.fraudFlags.length > 0)
                .map((claim) => (
                  <MobileCard key={claim.id} className="overflow-hidden">
                    <Link href={`/claims/${claim.id}`} className="block" prefetch={false}>
                      <MobileCardHeader className="pb-2 sm:pb-3 md:pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-base sm:text-lg md:text-xl">{claim.claimantName}</h4>
                            <p className="text-sm sm:text-base text-muted-foreground">{claim.id}</p>
                          </div>
                          <Badge variant={statusMap[claim.status].color} className="text-xs sm:text-sm">
                            {statusMap[claim.status].label}
                          </Badge>
                        </div>
                      </MobileCardHeader>

                      <MobileCardContent className="pb-3 sm:pb-4 md:pb-6">
                        <div className="flex justify-between items-center">
                          <div className="text-sm sm:text-base text-muted-foreground">
                            {new Date(claim.date).toLocaleDateString()}
                          </div>

                          <div className="flex items-center">
                            {claim.fraudFlags.length > 0 && (
                              <span className="mr-2 text-amber-500">
                                <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
                              </span>
                            )}
                            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                          </div>
                        </div>
                      </MobileCardContent>
                    </Link>
                  </MobileCard>
                ))
            )}
          </div>
        </MobileTabsContent>
      </MobileTabs>
    </div>
  )
}
