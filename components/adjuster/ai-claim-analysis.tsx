"use client"

import { useState } from "react"
import Image from "next/image"
import {
  AlertTriangle,
  ArrowRight,
  Brain,
  Check,
  CircleDollarSign,
  ClipboardCheck,
  FileText,
  ImageIcon,
  Lightbulb,
  Loader2,
  MessageSquare,
  Pencil,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  Wand2,
  X,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

interface AiClaimAnalysisProps {
  claimId: string
}

export function AiClaimAnalysis({ claimId }: AiClaimAnalysisProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [showFullImage, setShowFullImage] = useState<string | null>(null)
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, boolean>>({})
  const { toast } = useToast()

  // Mock claim data
  const claimData = {
    id: claimId,
    claimantName: "John Smith",
    claimantEmail: "john.smith@example.com",
    claimantPhone: "555-123-4567",
    date: "2023-10-15",
    status: "under_review",
    riskScore: 68,
    estimatedReserve: "$5,780",
    incidentDate: "April 11, 2023 at around 3:15 PM",
    location: "Intersection of Main Street and Park Avenue",
    description:
      "I was driving northbound when a pedestrian crossed against the light. I swerved to avoid them but hit another vehicle in the adjacent lane. The impact damaged the passenger side door of my car. The police were called and filed a report.",
    policyType: "auto",
    policyNumber: "POL-2023-45678",
    deductible: "$500",
    coverageLimit: "$50,000",
    documents: {
      policeReport: {
        name: "Police_Report_10152023.pdf",
        type: "application/pdf",
        url: "/police-report-document.png",
      },
      damagePhotos: [
        {
          name: "Damage_Photo_1.jpg",
          type: "image/jpeg",
          url: "/dented-blue-fender.png",
          aiTags: ["front fender", "minor dent", "blue sedan", "consistent with claim"],
        },
        {
          name: "Damage_Photo_2.jpg",
          type: "image/jpeg",
          url: "/slightly-dented-blue-sedan.png",
          aiTags: ["passenger side", "door damage", "blue sedan", "consistent with claim"],
        },
      ],
      scenePhotos: [
        {
          name: "Scene_Photo_1.jpg",
          type: "image/jpeg",
          url: "/city-collision.png",
          aiTags: ["intersection", "traffic light", "urban setting", "consistent with claim"],
        },
        {
          name: "Scene_Photo_2.jpg",
          type: "image/jpeg",
          url: "/urban-intersection-incident.png",
          aiTags: ["intersection", "traffic light", "urban setting", "consistent with claim"],
        },
      ],
      mechanicQuote: {
        name: "Mechanic_Quote_10162023.pdf",
        type: "application/pdf",
        url: "/auto-repair-quote.png",
        amount: "$5,780",
        aiAnalysis: "Quote appears to be 22% higher than average for similar damage in the area.",
      },
    },
    aiAnalysis: {
      summary: "Medium-risk auto claim with potential pricing anomaly in repair quote.",
      riskFactors: [
        {
          type: "price_anomaly",
          description: "Repair quote is 22% higher than average for similar damage",
          confidence: 85,
        },
        {
          type: "claim_consistency",
          description: "Damage photos are consistent with described incident",
          confidence: 92,
        },
        {
          type: "policy_coverage",
          description: "Claim is within policy coverage limits",
          confidence: 98,
        },
      ],
      recommendedReserve: "$4,750",
      recommendedAction: "Request additional quotes from approved repair shops",
      confidenceScore: 78,
      similarClaims: 12,
      automationPotential: "Medium - human review recommended for quote validation",
    },
    ocrResults: {
      policeReport: {
        date: "April 11, 2023",
        time: "3:20 PM",
        location: "Intersection of Main St and Park Ave",
        officerName: "Officer J. Wilson",
        badgeNumber: "BDG-45678",
        narrative:
          "Vehicle 1 swerved to avoid pedestrian and collided with Vehicle 2. Minor damage to both vehicles. No injuries reported.",
        confidence: 92,
      },
      mechanicQuote: {
        shopName: "AutoFix Repairs",
        date: "April 13, 2023",
        totalAmount: "$5,780",
        lineItems: [
          { description: "Replace passenger door", amount: "$2,450" },
          { description: "Paint matching", amount: "$850" },
          { description: "Labor (8 hours)", amount: "$1,200" },
          { description: "Parts and materials", amount: "$1,280" },
        ],
        confidence: 88,
      },
    },
  }

  const handleRunAnalysis = () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      toast({
        title: "Analysis Complete",
        description: "AI has analyzed all claim documents and photos",
      })
    }, 2500)
  }

  const handleGenerateReport = () => {
    setIsGeneratingReport(true)
    // Simulate report generation
    setTimeout(() => {
      setIsGeneratingReport(false)
      toast({
        title: "Report Generated",
        description: "Claim adjustment report has been created",
      })
    }, 3000)
  }

  const handleFeedback = (itemId: string, isPositive: boolean) => {
    setFeedbackGiven((prev) => ({ ...prev, [itemId]: true }))
    toast({
      title: isPositive ? "Positive Feedback Recorded" : "Negative Feedback Recorded",
      description: "Thank you for helping improve our AI system",
    })
  }

  const handleShowFullImage = (url: string) => {
    setShowFullImage(url)
  }

  const handleCloseFullImage = () => {
    setShowFullImage(null)
  }

  return (
    <div className="space-y-6">
      {showFullImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={handleCloseFullImage}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                handleCloseFullImage()
              }}
            >
              <X className="h-5 w-5" />
            </Button>
            <div className="bg-white rounded-lg overflow-hidden">
              <Image
                src={showFullImage || "/placeholder.svg"}
                alt="Document preview"
                width={1200}
                height={800}
                className="object-contain max-h-[80vh] w-full"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Claim Analysis: {claimData.id}</h2>
          <p className="text-muted-foreground">
            AI-powered analysis and recommendations for {claimData.claimantName}&apos;s claim
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleRunAnalysis} disabled={isAnalyzing}>
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Run Analysis
              </>
            )}
          </Button>
          <Button onClick={handleGenerateReport} disabled={isGeneratingReport}>
            {isGeneratingReport ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Claim Summary</CardTitle>
                <CardDescription>AI-generated overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      <Zap className="mr-1 h-3 w-3" />
                      AI Assisted
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleFeedback("summary-positive", true)}
                        disabled={feedbackGiven["summary-positive"]}
                      >
                        <ThumbsUp className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleFeedback("summary-negative", false)}
                        disabled={feedbackGiven["summary-negative"]}
                      >
                        <ThumbsDown className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm">{claimData.aiAnalysis.summary}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Risk Score:</span>
                      <span className="font-medium">{claimData.riskScore}/100</span>
                    </div>
                    <Progress value={claimData.riskScore} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Confidence:</span>
                      <span className="font-medium">{claimData.aiAnalysis.confidenceScore}%</span>
                    </div>
                    <Progress value={claimData.aiAnalysis.confidenceScore} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Estimated Reserve:</span>
                      <span className="font-medium">{claimData.estimatedReserve}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">AI Recommended:</span>
                      <span className="font-medium">{claimData.aiAnalysis.recommendedReserve}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Policy Information</CardTitle>
                <CardDescription>Coverage details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Policy Type</p>
                      <p className="text-sm font-medium capitalize">{claimData.policyType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Policy Number</p>
                      <p className="text-sm font-medium">{claimData.policyNumber}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Deductible</p>
                      <p className="text-sm font-medium">{claimData.deductible}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Coverage Limit</p>
                      <p className="text-sm font-medium">{claimData.coverageLimit}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-xs text-muted-foreground">Coverage Analysis</p>
                    <div className="flex items-center mt-1">
                      <Check className="h-4 w-4 text-green-600 mr-2" />
                      <p className="text-sm">Claim is within policy coverage</p>
                    </div>
                    <div className="flex items-center mt-1">
                      <Check className="h-4 w-4 text-green-600 mr-2" />
                      <p className="text-sm">Deductible applies to this claim</p>
                    </div>
                    <div className="flex items-center mt-1">
                      <Check className="h-4 w-4 text-green-600 mr-2" />
                      <p className="text-sm">Policy was active at time of incident</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Claimant Information</CardTitle>
                <CardDescription>Contact details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Name</p>
                    <p className="text-sm font-medium">{claimData.claimantName}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">{claimData.claimantEmail}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium">{claimData.claimantPhone}</p>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-xs text-muted-foreground">Claim History</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm">Previous Claims</p>
                      <Badge variant="outline">2</Badge>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm">Last Claim</p>
                      <p className="text-sm">18 months ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Incident Details</CardTitle>
              <CardDescription>Information extracted from claim documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Claimant Description</h4>
                    <div className="rounded-md border p-3 bg-muted/30">
                      <p className="text-sm">{claimData.description}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Police Report Extract</h4>
                    <div className="rounded-md border p-3 bg-muted/30">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          <Zap className="mr-1 h-3 w-3" />
                          OCR Extracted
                        </Badge>
                        <Badge variant="outline">{claimData.ocrResults.policeReport.confidence}% Confidence</Badge>
                      </div>
                      <p className="text-sm">{claimData.ocrResults.policeReport.narrative}</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Date & Time</p>
                    <p className="text-sm font-medium">
                      {claimData.ocrResults.policeReport.date} at {claimData.ocrResults.policeReport.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium">{claimData.ocrResults.policeReport.location}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Reporting Officer</p>
                    <p className="text-sm font-medium">
                      {claimData.ocrResults.policeReport.officerName} (Badge:{" "}
                      {claimData.ocrResults.policeReport.badgeNumber})
                    </p>
                  </div>
                </div>

                <div className="rounded-md border p-3 bg-green-50">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-green-800">Consistency Check</h4>
                      <p className="text-sm text-green-700">
                        AI analysis confirms the claimant&apos;s description is consistent with the police report and
                        photos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Damage Assessment</CardTitle>
              <CardDescription>AI analysis of damage photos and repair quote</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Damage Photos Analysis</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {claimData.documents.damagePhotos.map((photo, index) => (
                        <div
                          key={index}
                          className="border rounded-md overflow-hidden cursor-pointer"
                          onClick={() => handleShowFullImage(photo.url)}
                        >
                          <div className="relative aspect-square">
                            <Image
                              src={photo.url || "/placeholder.svg"}
                              alt={`Damage photo ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 50vw, 33vw"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1">
                              <div className="flex flex-wrap gap-1">
                                {photo.aiTags.map((tag, tagIndex) => (
                                  <Badge key={tagIndex} variant="outline" className="bg-white/20 text-white text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Repair Quote Analysis</h4>
                    <div className="rounded-md border p-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          <Zap className="mr-1 h-3 w-3" />
                          OCR Extracted
                        </Badge>
                        <Badge variant="outline">{claimData.ocrResults.mechanicQuote.confidence}% Confidence</Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Shop Name:</span>
                          <span className="font-medium">{claimData.ocrResults.mechanicQuote.shopName}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Quote Date:</span>
                          <span className="font-medium">{claimData.ocrResults.mechanicQuote.date}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total Amount:</span>
                          <span className="font-medium">{claimData.ocrResults.mechanicQuote.totalAmount}</span>
                        </div>
                      </div>

                      <Separator className="my-3" />

                      <h5 className="text-xs font-medium text-muted-foreground mb-2">Line Items</h5>
                      <div className="space-y-1">
                        {claimData.ocrResults.mechanicQuote.lineItems.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.description}</span>
                            <span className="font-medium">{item.amount}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 rounded-md bg-amber-50 p-2">
                        <div className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-amber-600 mr-2 mt-0.5" />
                          <div>
                            <p className="text-xs font-medium text-amber-800">Pricing Anomaly Detected</p>
                            <p className="text-xs text-amber-700">{claimData.documents.mechanicQuote.aiAnalysis}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border p-3 bg-blue-50">
                  <div className="flex items-start">
                    <Lightbulb className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">AI Recommendation</h4>
                      <p className="text-sm text-blue-700">{claimData.aiAnalysis.recommendedAction}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4 mt-4">
          {/* Documents tab content */}
          <Card>
            <CardHeader>
              <CardTitle>Document Analysis</CardTitle>
              <CardDescription>AI-powered extraction and verification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="police-report">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <FileText className="mr-2 h-5 w-5" />
                        <span>Police Report</span>
                        <Badge className="ml-2" variant="outline">
                          OCR Processed
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <div
                            className="relative aspect-[3/4] border rounded-md overflow-hidden cursor-pointer"
                            onClick={() => handleShowFullImage(claimData.documents.policeReport.url)}
                          >
                            <Image
                              src={claimData.documents.policeReport.url || "/placeholder.svg"}
                              alt="Police Report"
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                          <div className="flex justify-center mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleShowFullImage(claimData.documents.policeReport.url)}
                            >
                              <ImageIcon className="mr-2 h-4 w-4" />
                              View Full Document
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">OCR Extracted Data</h4>
                            <Badge variant="outline">{claimData.ocrResults.policeReport.confidence}% Confidence</Badge>
                          </div>

                          <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <p className="text-xs text-muted-foreground">Date</p>
                                <p className="text-sm font-medium">{claimData.ocrResults.policeReport.date}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Time</p>
                                <p className="text-sm font-medium">{claimData.ocrResults.policeReport.time}</p>
                              </div>
                            </div>

                            <div>
                              <p className="text-xs text-muted-foreground">Location</p>
                              <p className="text-sm font-medium">{claimData.ocrResults.policeReport.location}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <p className="text-xs text-muted-foreground">Officer Name</p>
                                <p className="text-sm font-medium">{claimData.ocrResults.policeReport.officerName}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Badge Number</p>
                                <p className="text-sm font-medium">{claimData.ocrResults.policeReport.badgeNumber}</p>
                              </div>
                            </div>

                            <div>
                              <p className="text-xs text-muted-foreground">Narrative</p>
                              <p className="text-sm">{claimData.ocrResults.policeReport.narrative}</p>
                            </div>
                          </div>

                          <div className="rounded-md bg-green-50 p-3">
                            <div className="flex items-start">
                              <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                              <div>
                                <h4 className="text-sm font-medium text-green-800">Verification</h4>
                                <p className="text-sm text-green-700">
                                  Document appears to be authentic. Date and location match claim details.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">AI Feedback</h4>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleFeedback("police-report-positive", true)}
                                disabled={feedbackGiven["police-report-positive"]}
                              >
                                <ThumbsUp className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleFeedback("police-report-negative", false)}
                                disabled={feedbackGiven["police-report-negative"]}
                              >
                                <ThumbsDown className="h-4 w-4 text-red-600" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="mechanic-quote">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <FileText className="mr-2 h-5 w-5" />
                        <span>Mechanic Quote</span>
                        <Badge className="ml-2" variant="outline">
                          OCR Processed
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <div
                            className="relative aspect-[3/4] border rounded-md overflow-hidden cursor-pointer"
                            onClick={() => handleShowFullImage(claimData.documents.mechanicQuote.url)}
                          >
                            <Image
                              src={claimData.documents.mechanicQuote.url || "/placeholder.svg"}
                              alt="Mechanic Quote"
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                          <div className="flex justify-center mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleShowFullImage(claimData.documents.mechanicQuote.url)}
                            >
                              <ImageIcon className="mr-2 h-4 w-4" />
                              View Full Document
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">OCR Extracted Data</h4>
                            <Badge variant="outline">{claimData.ocrResults.mechanicQuote.confidence}% Confidence</Badge>
                          </div>

                          <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <p className="text-xs text-muted-foreground">Shop Name</p>
                                <p className="text-sm font-medium">{claimData.ocrResults.mechanicQuote.shopName}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Date</p>
                                <p className="text-sm font-medium">{claimData.ocrResults.mechanicQuote.date}</p>
                              </div>
                            </div>

                            <div>
                              <p className="text-xs text-muted-foreground">Total Amount</p>
                              <p className="text-sm font-medium">{claimData.ocrResults.mechanicQuote.totalAmount}</p>
                            </div>

                            <div>
                              <p className="text-xs text-muted-foreground">Line Items</p>
                              <div className="space-y-1 mt-1">
                                {claimData.ocrResults.mechanicQuote.lineItems.map((item, index) => (
                                  <div key={index} className="flex justify-between text-sm">
                                    <span>{item.description}</span>
                                    <span className="font-medium">{item.amount}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="rounded-md bg-amber-50 p-3">
                            <div className="flex items-start">
                              <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                              <div>
                                <h4 className="text-sm font-medium text-amber-800">Pricing Anomaly</h4>
                                <p className="text-sm text-amber-700">{claimData.documents.mechanicQuote.aiAnalysis}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">AI Feedback</h4>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleFeedback("mechanic-quote-positive", true)}
                                disabled={feedbackGiven["mechanic-quote-positive"]}
                              >
                                <ThumbsUp className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleFeedback("mechanic-quote-negative", false)}
                                disabled={feedbackGiven["mechanic-quote-negative"]}
                              >
                                <ThumbsDown className="h-4 w-4 text-red-600" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Photo Analysis</CardTitle>
              <CardDescription>AI-powered damage detection and verification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Damage Photos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {claimData.documents.damagePhotos.map((photo, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="relative aspect-video">
                          <Image
                            src={photo.url || "/placeholder.svg"}
                            alt={`Damage photo ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            onClick={() => handleShowFullImage(photo.url)}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-black/20 hover:bg-black/40 text-white rounded-full"
                            onClick={() => handleShowFullImage(photo.url)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              <Zap className="mr-1 h-3 w-3" />
                              AI Analyzed
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleFeedback(`damage-photo-${index}-positive`, true)}
                                disabled={feedbackGiven[`damage-photo-${index}-positive`]}
                              >
                                <ThumbsUp className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleFeedback(`damage-photo-${index}-negative`, false)}
                                disabled={feedbackGiven[`damage-photo-${index}-negative`]}
                              >
                                <ThumbsDown className="h-4 w-4 text-red-600" />
                              </Button>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-3">
                            {photo.aiTags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="rounded-md bg-green-50 p-2">
                            <div className="flex items-start">
                              <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                              <div>
                                <p className="text-xs text-green-700">
                                  Damage is consistent with the described incident
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Scene Photos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {claimData.documents.scenePhotos.map((photo, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="relative aspect-video">
                          <Image
                            src={photo.url || "/placeholder.svg"}
                            alt={`Scene photo ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            onClick={() => handleShowFullImage(photo.url)}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-black/20 hover:bg-black/40 text-white rounded-full"
                            onClick={() => handleShowFullImage(photo.url)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              <Zap className="mr-1 h-3 w-3" />
                              AI Analyzed
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleFeedback(`scene-photo-${index}-positive`, true)}
                                disabled={feedbackGiven[`scene-photo-${index}-positive`]}
                              >
                                <ThumbsUp className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleFeedback(`scene-photo-${index}-negative`, false)}
                                disabled={feedbackGiven[`scene-photo-${index}-negative`]}
                              >
                                <ThumbsDown className="h-4 w-4 text-red-600" />
                              </Button>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-3">
                            {photo.aiTags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="rounded-md bg-green-50 p-2">
                            <div className="flex items-start">
                              <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                              <div>
                                <p className="text-xs text-green-700">
                                  Scene matches the location described in the claim
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Analysis</CardTitle>
              <CardDescription>AI-powered risk assessment and fraud detection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Risk Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center">
                        <div
                          className={`text-3xl font-bold rounded-full h-24 w-24 flex items-center justify-center ${
                            claimData.riskScore < 30
                              ? "bg-green-50 text-green-700"
                              : claimData.riskScore < 70
                                ? "bg-amber-50 text-amber-700"
                                : "bg-red-50 text-red-700"
                          }`}
                        >
                          {claimData.riskScore}
                        </div>
                        <span className="text-sm text-muted-foreground mt-2">out of 100</span>
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Low</span>
                          <span className="text-muted-foreground">High</span>
                        </div>
                        <Progress value={claimData.riskScore} className="h-2" />
                      </div>

                      <div className="mt-4 text-center">
                        <p className="text-sm">
                          {claimData.riskScore < 30
                            ? "Low risk claim - suitable for automated processing"
                            : claimData.riskScore < 70
                              ? "Medium risk - human review recommended"
                              : "High risk - detailed investigation required"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Similar Claims</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center">
                        <div className="text-3xl font-bold rounded-full h-24 w-24 flex items-center justify-center bg-blue-50 text-blue-700">
                          {claimData.aiAnalysis.similarClaims}
                        </div>
                        <span className="text-sm text-muted-foreground mt-2">matching patterns</span>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="text-sm">
                          AI has identified {claimData.aiAnalysis.similarClaims} claims with similar characteristics in
                          our database.
                        </p>
                      </div>

                      <div className="mt-4">
                        <Button variant="outline" className="w-full">
                          <Sparkles className="mr-2 h-4 w-4" />
                          View Similar Claims
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Confidence Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center">
                        <div className="text-3xl font-bold rounded-full h-24 w-24 flex items-center justify-center bg-green-50 text-green-700">
                          {claimData.aiAnalysis.confidenceScore}%
                        </div>
                        <span className="text-sm text-muted-foreground mt-2">AI confidence</span>
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Low</span>
                          <span className="text-muted-foreground">High</span>
                        </div>
                        <Progress value={claimData.aiAnalysis.confidenceScore} className="h-2" />
                      </div>

                      <div className="mt-4 text-center">
                        <p className="text-sm">
                          {claimData.aiAnalysis.confidenceScore > 80
                            ? "High confidence in AI analysis"
                            : claimData.aiAnalysis.confidenceScore > 60
                              ? "Moderate confidence - review recommended"
                              : "Low confidence - manual review required"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Risk Factors</CardTitle>
                    <CardDescription>Detailed breakdown of identified risk factors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {claimData.aiAnalysis.riskFactors.map((factor, index) => (
                        <div key={index} className="rounded-md border p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              {factor.type === "price_anomaly" ? (
                                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                              ) : factor.type === "claim_consistency" ? (
                                <Check className="h-5 w-5 text-green-500 mr-2" />
                              ) : (
                                <Check className="h-5 w-5 text-green-500 mr-2" />
                              )}
                              <h4 className="font-medium">
                                {factor.type === "price_anomaly"
                                  ? "Price Anomaly"
                                  : factor.type === "claim_consistency"
                                    ? "Claim Consistency"
                                    : "Policy Coverage"}
                              </h4>
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                factor.type === "price_anomaly"
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : "bg-green-50 text-green-700 border-green-200"
                              }
                            >
                              {factor.confidence}% Confidence
                            </Badge>
                          </div>
                          <p className="text-sm">{factor.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Automation Potential</CardTitle>
                    <CardDescription>AI assessment of claim automation potential</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Automation Assessment</h4>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            <Zap className="mr-1 h-3 w-3" />
                            AI Recommendation
                          </Badge>
                        </div>
                        <p className="text-sm">{claimData.aiAnalysis.automationPotential}</p>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Automation Settings</h4>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label htmlFor="auto-approve">Auto-approve low-risk claims</Label>
                                <p className="text-xs text-muted-foreground">
                                  Automatically approve claims with risk score below threshold
                                </p>
                              </div>
                              <Switch id="auto-approve" />
                            </div>
                            <div>
                              <Label htmlFor="risk-threshold">Risk threshold</Label>
                              <div className="flex items-center mt-2">
                                <Slider defaultValue={[30]} max={100} step={1} className="flex-1" />
                                <span className="ml-2 text-sm font-medium">30</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">Human Review Triggers</h4>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Check className="h-4 w-4 text-green-600 mr-2" />
                              <p className="text-sm">Risk score above threshold</p>
                            </div>
                            <div className="flex items-center">
                              <Check className="h-4 w-4 text-green-600 mr-2" />
                              <p className="text-sm">Fraud flags detected</p>
                            </div>
                            <div className="flex items-center">
                              <Check className="h-4 w-4 text-green-600 mr-2" />
                              <p className="text-sm">Pricing anomalies identified</p>
                            </div>
                            <div className="flex items-center">
                              <Check className="h-4 w-4 text-green-600 mr-2" />
                              <p className="text-sm">Document inconsistencies found</p>
                            </div>
                            <div className="flex items-center">
                              <Check className="h-4 w-4 text-green-600 mr-2" />
                              <p className="text-sm">AI confidence below 70%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
              <CardDescription>Suggested actions based on claim analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-md border p-4 bg-blue-50">
                  <div className="flex items-start">
                    <Lightbulb className="h-6 w-6 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="text-base font-medium text-blue-800 mb-1">Primary Recommendation</h4>
                      <p className="text-sm text-blue-700">{claimData.aiAnalysis.recommendedAction}</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Reserve Recommendation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Claimant Quote</p>
                            <p className="text-xl font-bold">{claimData.documents.mechanicQuote.amount}</p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">AI Recommended</p>
                            <p className="text-xl font-bold">{claimData.aiAnalysis.recommendedReserve}</p>
                          </div>
                        </div>

                        <div className="rounded-md bg-amber-50 p-3">
                          <div className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                            <div>
                              <p className="text-sm text-amber-700">
                                Recommended reserve is 17.8% lower than the submitted quote due to pricing anomalies.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <Button variant="outline">
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Reserve
                          </Button>
                          <Button>
                            <Check className="mr-2 h-4 w-4" />
                            Accept Recommendation
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Next Steps</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-md border p-3">
                          <div className="flex items-center mb-2">
                            <CircleDollarSign className="h-5 w-5 text-muted-foreground mr-2" />
                            <h4 className="font-medium">Request Additional Quotes</h4>
                          </div>
                          <p className="text-sm">
                            Current quote appears to be 22% higher than average. Request quotes from approved repair
                            shops.
                          </p>
                          <Button variant="outline" className="w-full mt-2">
                            <Wand2 className="mr-2 h-4 w-4" />
                            Auto-generate Request
                          </Button>
                        </div>

                        <div className="rounded-md border p-3">
                          <div className="flex items-center mb-2">
                            <ClipboardCheck className="h-5 w-5 text-muted-foreground mr-2" />
                            <h4 className="font-medium">Verify Repair Details</h4>
                          </div>
                          <p className="text-sm">
                            Confirm that all repair line items are necessary and related to the reported incident.
                          </p>
                          <Button variant="outline" className="w-full mt-2">
                            <Wand2 className="mr-2 h-4 w-4" />
                            Generate Verification Checklist
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Generate Communication</CardTitle>
                    <CardDescription>AI-assisted communication with claimant</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Communication Type</h4>
                        <Select defaultValue="request-info">
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="request-info">Request Information</SelectItem>
                            <SelectItem value="status-update">Status Update</SelectItem>
                            <SelectItem value="approval">Approval Notice</SelectItem>
                            <SelectItem value="denial">Denial Notice</SelectItem>
                            <SelectItem value="custom">Custom Message</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">AI Generated Message</h4>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            <Zap className="mr-1 h-3 w-3" />
                            AI Generated
                          </Badge>
                        </div>
                        <Textarea
                          className="min-h-[150px]"
                          defaultValue={`Dear ${claimData.claimantName},

Thank you for submitting your claim (${claimData.id}). We're currently reviewing the details of your case.

To help us process your claim more efficiently, we would like to request additional repair quotes from our network of approved repair shops. This is a standard part of our process to ensure fair pricing.

Please let us know if you have any questions or concerns.

Best regards,
Your Claims Adjuster`}
                        />
                        <div className="flex justify-end mt-3">
                          <Button variant="outline" className="mr-2">
                            <Wand2 className="mr-2 h-4 w-4" />
                            Regenerate
                          </Button>
                          <Button>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Send Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Decision Support</CardTitle>
                    <CardDescription>AI-assisted claim decision</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-md border p-4 bg-green-50">
                          <div className="flex flex-col items-center text-center">
                            <Check className="h-8 w-8 text-green-600 mb-2" />
                            <h4 className="font-medium text-green-800">Approve</h4>
                            <p className="text-sm text-green-700 mt-1">
                              Approve claim with recommended reserve of {claimData.aiAnalysis.recommendedReserve}
                            </p>
                            <Button className="mt-3 bg-green-600 hover:bg-green-700">Approve Claim</Button>
                          </div>
                        </div>

                        <div className="rounded-md border p-4">
                          <div className="flex flex-col items-center text-center">
                            <AlertTriangle className="h-8 w-8 text-amber-500 mb-2" />
                            <h4 className="font-medium">Request Info</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Request additional information or documentation from claimant
                            </p>
                            <Button variant="outline" className="mt-3">
                              Request Info
                            </Button>
                          </div>
                        </div>

                        <div className="rounded-md border p-4">
                          <div className="flex flex-col items-center text-center">
                            <X className="h-8 w-8 text-red-500 mb-2" />
                            <h4 className="font-medium">Deny</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Deny claim based on policy terms or investigation findings
                            </p>
                            <Button variant="outline" className="mt-3">
                              Deny Claim
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">Decision Notes</h4>
                          <Badge variant="outline">Required</Badge>
                        </div>
                        <Textarea placeholder="Enter your decision rationale here..." className="min-h-[100px]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
