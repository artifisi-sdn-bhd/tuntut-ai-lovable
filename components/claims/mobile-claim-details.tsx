"use client"

import { useState } from "react"
import {
  AlertCircle,
  AlertTriangle,
  ArrowUpRight,
  Calendar,
  DollarSign,
  Edit,
  FileText,
  HelpCircle,
  MapPin,
  MessageSquare,
  Save,
  ThumbsUp,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MobileCard, MobileCardContent, MobileCardHeader, MobileCardFooter } from "@/components/layout/mobile-card"
import { MobileTabs, MobileTabsList, MobileTabsTrigger, MobileTabsContent } from "@/components/navigation/mobile-tabs"
import { MobileForm, MobileFormField, MobileFormSection } from "@/components/forms/mobile-form"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"

// Mock claim data
const mockClaim = {
  id: "TUN-2023-7845",
  claimantName: "John Smith",
  claimantEmail: "john.smith@example.com",
  claimantPhone: "555-123-4567",
  date: "2023-10-15",
  status: "under_review",
  riskLevel: "medium",
  incidentDate: "April 11, 2023 at around 3:15 PM",
  location: "Intersection of Main Street and Park Avenue",
  description:
    "I was driving northbound when a pedestrian crossed against the light. I swerved to avoid them but hit another vehicle in the adjacent lane. The impact damaged the passenger side door of my car. The police were called and filed a report.",
  transcript:
    "The accident happened on April 11th, 2023 at around 3:15 PM. It occurred at the intersection of Main Street and Park Avenue. I was driving northbound when a pedestrian crossed against the light. I swerved to avoid them but hit another vehicle in the adjacent lane. The impact damaged the passenger side door of my car. The police were called and filed a report.",
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
      },
      {
        name: "Damage_Photo_2.jpg",
        type: "image/jpeg",
        url: "/slightly-dented-blue-sedan.png",
      },
    ],
    scenePhotos: [
      {
        name: "Scene_Photo_1.jpg",
        type: "image/jpeg",
        url: "/city-collision.png",
      },
      {
        name: "Scene_Photo_2.jpg",
        type: "image/jpeg",
        url: "/urban-intersection-incident.png",
      },
    ],
    mechanicQuote: {
      name: "Mechanic_Quote_10162023.pdf",
      type: "application/pdf",
      url: "/auto-repair-quote.png",
      amount: "$241.50",
    },
  },
  fraudFlags: [
    {
      type: "price_anomaly",
      description: "Repair quote is 35% higher than average for similar damage",
    },
    {
      type: "doc_mismatch",
      description: "Date on police report doesn't match claimed incident date",
    },
  ],
  notes: [
    {
      id: "note-1",
      author: "Jane Adjuster",
      date: "2023-10-16",
      content: "Initial review completed. Need to verify repair quote with trusted mechanic partners.",
    },
  ],
}

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

export function MobileClaimDetails() {
  const [claim, setClaim] = useState(mockClaim)
  const [isEditing, setIsEditing] = useState(false)
  const [editedClaim, setEditedClaim] = useState(claim)
  const [activeTab, setActiveTab] = useState("details")
  const [newNote, setNewNote] = useState("")
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)
  const { toast } = useToast()

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setClaim(editedClaim)
      toast({
        title: "Changes saved",
        description: "The claim details have been updated.",
      })
    }
    setIsEditing(!isEditing)
  }

  const handleInputChange = (field: string, value: string) => {
    setEditedClaim((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddNote = () => {
    if (!newNote.trim()) return

    const newNoteObj = {
      id: `note-${Date.now()}`,
      author: "Jane Adjuster",
      date: new Date().toISOString().split("T")[0],
      content: newNote,
    }

    setClaim((prev) => ({
      ...prev,
      notes: [...prev.notes, newNoteObj],
    }))

    setNewNote("")

    toast({
      title: "Note added",
      description: "Your note has been added to the claim.",
    })
  }

  const handleStatusChange = (newStatus: string) => {
    setClaim((prev) => ({
      ...prev,
      status: newStatus,
    }))

    toast({
      title: "Status updated",
      description: `Claim status changed to ${statusMap[newStatus].label}.`,
    })
  }

  const openFullscreenImage = (url: string) => {
    setFullscreenImage(url)
  }

  const closeFullscreenImage = () => {
    setFullscreenImage(null)
  }

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeFullscreenImage}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                closeFullscreenImage()
              }}
            >
              <X className="h-5 w-5" />
            </Button>
            <div className="bg-white rounded-lg overflow-hidden">
              <Image
                src={fullscreenImage || "/placeholder.svg"}
                alt="Document preview"
                width={1200}
                height={800}
                className="object-contain max-h-[80vh] w-full"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Claim {claim.id}</h2>
            <Badge variant={statusMap[claim.status].color} className="text-xs sm:text-sm md:text-base">
              {statusMap[claim.status].label}
            </Badge>
          </div>

          <Button
            variant={isEditing ? "default" : "outline"}
            size="sm"
            onClick={handleEditToggle}
            className="h-9 sm:h-10 md:h-11"
          >
            {isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Save
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Edit
              </>
            )}
          </Button>
        </div>

        <p className="text-sm sm:text-base text-muted-foreground">
          Submitted by {claim.claimantName} on {new Date(claim.date).toLocaleDateString()}
        </p>
      </div>

      {claim.fraudFlags.length > 0 && (
        <MobileCard className="border-orange-200 bg-orange-50">
          <MobileCardHeader>
            <div className="flex items-center gap-2 sm:gap-3 text-orange-700">
              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6" />
              <h3 className="font-medium text-base sm:text-lg md:text-xl">Fraud Flags Detected</h3>
            </div>
          </MobileCardHeader>

          <MobileCardContent>
            <div className="space-y-3 sm:space-y-4">
              {claim.fraudFlags.map((flag, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3">
                  <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-orange-700 text-sm sm:text-base md:text-lg">
                      {flag.type === "price_anomaly" && "Price Anomaly"}
                      {flag.type === "doc_mismatch" && "Document Mismatch"}
                      {flag.type === "photo_duplicate" && "Photo Duplicate"}
                    </p>
                    <p className="text-sm sm:text-base text-orange-600">{flag.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </MobileCardContent>
        </MobileCard>
      )}

      <MobileTabs value={activeTab} onValueChange={setActiveTab}>
        <MobileTabsList>
          <MobileTabsTrigger value="details">Details</MobileTabsTrigger>
          <MobileTabsTrigger value="documents">Documents</MobileTabsTrigger>
          <MobileTabsTrigger value="transcript">Transcript</MobileTabsTrigger>
          <MobileTabsTrigger value="notes">Notes</MobileTabsTrigger>
        </MobileTabsList>

        <MobileTabsContent value="details">
          <div className="lg:grid lg:grid-cols-3 lg:gap-6">
            <MobileCard className="lg:col-span-2">
              <MobileCardHeader>
                <h3 className="text-lg sm:text-xl md:text-2xl font-medium">Incident Information</h3>
              </MobileCardHeader>

              <MobileCardContent>
                {isEditing ? (
                  <MobileForm>
                    <MobileFormSection>
                      <MobileFormField label="Claimant Name" htmlFor="claimantName">
                        <Input
                          id="claimantName"
                          value={editedClaim.claimantName}
                          onChange={(e) => handleInputChange("claimantName", e.target.value)}
                          className="h-10 sm:h-12 md:h-14"
                        />
                      </MobileFormField>

                      <MobileFormField label="Claimant Email" htmlFor="claimantEmail">
                        <Input
                          id="claimantEmail"
                          value={editedClaim.claimantEmail}
                          onChange={(e) => handleInputChange("claimantEmail", e.target.value)}
                          className="h-10 sm:h-12 md:h-14"
                        />
                      </MobileFormField>

                      <MobileFormField label="Incident Date & Time" htmlFor="incidentDate">
                        <Input
                          id="incidentDate"
                          value={editedClaim.incidentDate}
                          onChange={(e) => handleInputChange("incidentDate", e.target.value)}
                          className="h-10 sm:h-12 md:h-14"
                        />
                      </MobileFormField>

                      <MobileFormField label="Location" htmlFor="location">
                        <Input
                          id="location"
                          value={editedClaim.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          className="h-10 sm:h-12 md:h-14"
                        />
                      </MobileFormField>

                      <MobileFormField label="Description" htmlFor="description">
                        <Textarea
                          id="description"
                          value={editedClaim.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          className="min-h-[120px] sm:min-h-[150px] md:min-h-[200px]"
                        />
                      </MobileFormField>
                    </MobileFormSection>
                  </MobileForm>
                ) : (
                  <div className="space-y-4 sm:space-y-6 md:space-y-8">
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <h4 className="text-sm sm:text-base md:text-lg font-medium text-muted-foreground">Claimant</h4>
                        <p className="text-base sm:text-lg md:text-xl">{claim.claimantName}</p>
                      </div>

                      <div>
                        <h4 className="text-sm sm:text-base md:text-lg font-medium text-muted-foreground">Contact</h4>
                        <p className="text-base sm:text-lg">{claim.claimantEmail}</p>
                        <p className="text-base sm:text-lg">{claim.claimantPhone}</p>
                      </div>

                      <div className="flex items-start gap-2 sm:gap-3">
                        <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground mt-0.5" />
                        <div>
                          <h4 className="text-sm sm:text-base md:text-lg font-medium">Incident Date & Time</h4>
                          <p className="text-base sm:text-lg">{claim.incidentDate}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 sm:gap-3">
                        <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground mt-0.5" />
                        <div>
                          <h4 className="text-sm sm:text-base md:text-lg font-medium">Location</h4>
                          <p className="text-base sm:text-lg">{claim.location}</p>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4 sm:my-6" />

                    <div>
                      <h4 className="text-sm sm:text-base md:text-lg font-medium mb-2 sm:mb-3">Description</h4>
                      <p className="text-sm sm:text-base md:text-lg">{claim.description}</p>
                    </div>

                    <Separator className="my-4 sm:my-6" />

                    <div className="flex items-start gap-2 sm:gap-3">
                      <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground mt-0.5" />
                      <div>
                        <h4 className="text-sm sm:text-base md:text-lg font-medium">Repair Quote</h4>
                        <p className="text-base sm:text-lg md:text-xl font-semibold">
                          {claim.documents.mechanicQuote.amount}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </MobileCardContent>
            </MobileCard>

            <div className="mt-4 lg:mt-0">
              <MobileCard>
                <MobileCardHeader>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-medium">Actions</h3>
                </MobileCardHeader>

                <MobileCardContent>
                  <div className="grid grid-cols-1 gap-2 sm:gap-3 md:gap-4">
                    <Button
                      onClick={() => handleStatusChange("approved")}
                      className="bg-green-600 hover:bg-green-700 h-11 sm:h-12 md:h-14 text-base sm:text-lg"
                    >
                      <ThumbsUp className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Approve
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => handleStatusChange("more_info")}
                      className="h-11 sm:h-12 md:h-14 text-base sm:text-lg"
                    >
                      <HelpCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Request Info
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => handleStatusChange("escalated")}
                      className="h-11 sm:h-12 md:h-14 text-base sm:text-lg"
                    >
                      <ArrowUpRight className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Escalate
                    </Button>
                  </div>
                </MobileCardContent>
              </MobileCard>
            </div>
          </div>
        </MobileTabsContent>

        <MobileTabsContent value="documents">
          <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:grid lg:grid-cols-2 lg:gap-6">
            <MobileCard>
              <MobileCardHeader>
                <h3 className="text-lg sm:text-xl md:text-2xl font-medium">Police Report</h3>
              </MobileCardHeader>

              <MobileCardContent>
                <div className="flex flex-col items-center">
                  <div
                    className="relative w-full aspect-[3/4] border rounded-md overflow-hidden cursor-pointer"
                    onClick={() => openFullscreenImage(claim.documents.policeReport.url)}
                  >
                    <Image
                      src={claim.documents.policeReport.url || "/placeholder.svg"}
                      alt="Police Report"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>

                  <div className="mt-3 sm:mt-4 md:mt-6 text-center">
                    <p className="font-medium text-base sm:text-lg">{claim.documents.policeReport.name}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 sm:mt-3 h-9 sm:h-10 md:h-11"
                      onClick={() => openFullscreenImage(claim.documents.policeReport.url)}
                    >
                      <FileText className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      View Full Document
                    </Button>
                  </div>
                </div>
              </MobileCardContent>
            </MobileCard>

            <MobileCard>
              <MobileCardHeader>
                <h3 className="text-lg sm:text-xl md:text-2xl font-medium">Damage Photos</h3>
              </MobileCardHeader>

              <MobileCardContent>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {claim.documents.damagePhotos.map((photo, index) => (
                    <div
                      key={index}
                      className="border rounded-md overflow-hidden aspect-square cursor-pointer"
                      onClick={() => openFullscreenImage(photo.url)}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={photo.url || "/placeholder.svg"}
                          alt={`Damage Photo ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </MobileCardContent>
            </MobileCard>

            {claim.documents.scenePhotos.length > 0 && (
              <MobileCard>
                <MobileCardHeader>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-medium">Scene Photos</h3>
                </MobileCardHeader>

                <MobileCardContent>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {claim.documents.scenePhotos.map((photo, index) => (
                      <div
                        key={index}
                        className="border rounded-md overflow-hidden aspect-square cursor-pointer"
                        onClick={() => openFullscreenImage(photo.url)}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={photo.url || "/placeholder.svg"}
                            alt={`Scene Photo ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 33vw"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </MobileCardContent>
              </MobileCard>
            )}

            <MobileCard>
              <MobileCardHeader>
                <h3 className="text-lg sm:text-xl md:text-2xl font-medium">Mechanic Quote</h3>
              </MobileCardHeader>

              <MobileCardContent>
                <div className="flex flex-col items-center">
                  <div
                    className="relative w-full aspect-[3/4] border rounded-md overflow-hidden cursor-pointer"
                    onClick={() => openFullscreenImage(claim.documents.mechanicQuote.url)}
                  >
                    <Image
                      src={claim.documents.mechanicQuote.url || "/placeholder.svg"}
                      alt="Mechanic Quote"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  <div className="mt-3 sm:mt-4 md:mt-6 text-center">
                    <p className="font-medium text-base sm:text-lg">{claim.documents.mechanicQuote.name}</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold mt-1 sm:mt-2">
                      {claim.documents.mechanicQuote.amount}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 sm:mt-3 h-9 sm:h-10 md:h-11"
                      onClick={() => openFullscreenImage(claim.documents.mechanicQuote.url)}
                    >
                      <FileText className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      View Full Document
                    </Button>
                  </div>
                </div>
              </MobileCardContent>
            </MobileCard>
          </div>
        </MobileTabsContent>

        <MobileTabsContent value="transcript">
          <MobileCard>
            <MobileCardHeader>
              <h3 className="text-lg sm:text-xl md:text-2xl font-medium">Voice Transcript</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Transcript from the claimant's voice recording
              </p>
            </MobileCardHeader>

            <MobileCardContent>
              <div className="p-4 sm:p-6 md:p-8 bg-muted rounded-md">
                <p className="text-sm sm:text-base md:text-lg whitespace-pre-wrap">{claim.transcript}</p>
              </div>
            </MobileCardContent>
          </MobileCard>
        </MobileTabsContent>

        <MobileTabsContent value="notes">
          <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:grid lg:grid-cols-2 lg:gap-6">
            <MobileCard>
              <MobileCardHeader>
                <h3 className="text-lg sm:text-xl md:text-2xl font-medium">Add Note</h3>
              </MobileCardHeader>

              <MobileCardContent>
                <Textarea
                  placeholder="Add a note about this claim..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="min-h-[120px] sm:min-h-[150px] md:min-h-[180px] text-base sm:text-lg"
                />
              </MobileCardContent>

              <MobileCardFooter>
                <Button
                  onClick={handleAddNote}
                  disabled={!newNote.trim()}
                  className="h-10 sm:h-11 md:h-12 text-base sm:text-lg"
                >
                  <MessageSquare className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Add Note
                </Button>
              </MobileCardFooter>
            </MobileCard>

            <MobileCard>
              <MobileCardHeader>
                <h3 className="text-lg sm:text-xl md:text-2xl font-medium">Notes & History</h3>
              </MobileCardHeader>

              <MobileCardContent>
                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                  {claim.notes.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4 sm:py-6 md:py-8 text-base sm:text-lg">
                      No notes have been added to this claim yet.
                    </p>
                  ) : (
                    claim.notes.map((note) => (
                      <div key={note.id} className="border rounded-md p-3 sm:p-4 md:p-6">
                        <div className="flex justify-between items-start mb-2 sm:mb-3">
                          <div>
                            <p className="font-medium text-base sm:text-lg">{note.author}</p>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {new Date(note.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm sm:text-base md:text-lg whitespace-pre-wrap">{note.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </MobileCardContent>
            </MobileCard>
          </div>
        </MobileTabsContent>
      </MobileTabs>
    </div>
  )
}
