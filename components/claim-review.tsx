"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, FileText, Check, Loader2 } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"

export function ClaimReview({ claimData, onUpdateData, onBack, onSubmit }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field, value) => {
    onUpdateData({
      ...claimData,
      [field]: value,
    })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await onSubmit()
    setIsSubmitting(false)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Review Your Claim</CardTitle>
        <CardDescription>Review and edit your claim details before submission.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Incident Details</h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="incidentDate" className="text-sm font-medium">
                Incident Date & Time
              </Label>
              <Input
                id="incidentDate"
                value={claimData.incidentDate}
                onChange={(e) => handleInputChange("incidentDate", e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium">
                Location
              </Label>
              <Input
                id="location"
                value={claimData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="h-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={claimData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="min-h-[120px]"
            />
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="transcript">
            <AccordionTrigger>Voice Transcript</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm whitespace-pre-wrap">{claimData.transcript}</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="documents">
            <AccordionTrigger>Uploaded Documents</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Police Report</h4>
                  {claimData.documents.policeReport ? (
                    <div className="flex items-center gap-2 p-2 border rounded-md">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <span>{claimData.documents.policeReport.file.name}</span>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No police report uploaded.</p>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Damage Photos ({claimData.documents.damagePhotos.length})</h4>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {claimData.documents.damagePhotos.map((photo, index) => (
                      <div key={index} className="relative aspect-square border rounded-md overflow-hidden">
                        <Image
                          src={photo.previewUrl || "/placeholder.svg"}
                          alt={`Damage photo ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {claimData.documents.scenePhotos.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Scene Photos ({claimData.documents.scenePhotos.length})</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {claimData.documents.scenePhotos.map((photo, index) => (
                        <div key={index} className="relative h-20 border rounded-md overflow-hidden">
                          <Image
                            src={photo.previewUrl || "/placeholder.svg"}
                            alt={`Scene photo ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="font-medium">Mechanic Quote</h4>
                  {claimData.documents.mechanicQuote ? (
                    <div className="flex items-center gap-2 p-2 border rounded-md">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <span>{claimData.documents.mechanicQuote.file.name}</span>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No mechanic quote uploaded.</p>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Submit Claim
              <Check className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
