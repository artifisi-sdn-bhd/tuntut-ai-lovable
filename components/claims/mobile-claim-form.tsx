"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Check, Loader2, Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { MobileFormField, MobileForm, MobileFormSection } from "@/components/forms/mobile-form"
import { MobileInput } from "@/components/ui/mobile-input"
import { MobileDocumentUpload } from "@/components/forms/mobile-document-upload"
import { MobileTabs, MobileTabsList, MobileTabsTrigger, MobileTabsContent } from "@/components/navigation/mobile-tabs"
import { MobileCard, MobileCardContent, MobileCardFooter, MobileCardHeader } from "@/components/layout/mobile-card"

const STEPS = ["voice", "documents", "review"]

export function MobileClaimForm() {
  const [activeStep, setActiveStep] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingProgress, setRecordingProgress] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [claimData, setClaimData] = useState({
    incidentDate: "",
    location: "",
    description: "",
    transcript: "",
    policeReport: null as File | null,
    damagePhotos: [] as File[],
    scenePhotos: [] as File[],
    mechanicQuote: null as File | null,
  })

  const router = useRouter()
  const { toast } = useToast()

  // Mock recording functionality
  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  const startRecording = () => {
    setIsRecording(true)
    setRecordingProgress(0)

    // Simulate recording progress
    const interval = setInterval(() => {
      setRecordingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          stopRecording()
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  const stopRecording = () => {
    setIsRecording(false)

    // Simulate transcription result and extract information
    setTimeout(() => {
      // Mock transcript that contains all the information
      const transcript =
        "The accident happened on October 15th, 2023 at around 2:30 PM. It occurred at the intersection of Main Street and 5th Avenue in Springfield. I was stopped at a red light when a vehicle rear-ended me. The impact was moderate and caused damage to my rear bumper and trunk. The other driver admitted fault and we exchanged insurance information. There were no injuries, but my car needs repair."

      // Extract date and time from transcript
      const incidentDate = "October 15, 2023 at 2:30 PM"

      // Extract location from transcript
      const location = "Intersection of Main Street and 5th Avenue in Springfield"

      // Extract description from transcript (everything after the location)
      const description =
        "I was stopped at a red light when a vehicle rear-ended me. The impact was moderate and caused damage to my rear bumper and trunk. The other driver admitted fault and we exchanged insurance information. There were no injuries, but my car needs repair."

      // Update all form fields with extracted information
      setClaimData((prev) => ({
        ...prev,
        incidentDate,
        location,
        description,
        transcript,
      }))

      // Show success toast
      toast({
        title: "Voice transcription complete",
        description: "We've filled in the details based on your recording.",
        duration: 3000,
      })
    }, 500)
  }

  const handleInputChange = (field: string, value: string) => {
    setClaimData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePoliceReportChange = (files: File[]) => {
    setClaimData((prev) => ({
      ...prev,
      policeReport: files[0] || null,
    }))
  }

  const handleDamagePhotosChange = (files: File[]) => {
    setClaimData((prev) => ({
      ...prev,
      damagePhotos: files,
    }))
  }

  const handleScenePhotosChange = (files: File[]) => {
    setClaimData((prev) => ({
      ...prev,
      scenePhotos: files,
    }))
  }

  const handleMechanicQuoteChange = (files: File[]) => {
    setClaimData((prev) => ({
      ...prev,
      mechanicQuote: files[0] || null,
    }))
  }

  const handleNext = () => {
    if (activeStep < STEPS.length - 1) {
      setActiveStep((prev) => prev + 1)
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Claim submitted successfully",
      description: "Your claim has been received. Tracking ID: TUN-2023-7845",
    })

    setIsSubmitting(false)
    router.push("/claim-confirmation?id=TUN-2023-7845")
  }

  const validateStep = () => {
    if (activeStep === 0) {
      return claimData.incidentDate && claimData.location && claimData.description
    }

    if (activeStep === 1) {
      return claimData.policeReport && claimData.damagePhotos.length > 0 && claimData.mechanicQuote
    }

    return true
  }

  return (
    <div className="space-y-6">
      <MobileTabs value={STEPS[activeStep]}>
        <MobileTabsList>
          <MobileTabsTrigger
            value="voice"
            active={activeStep === 0}
            onClick={() => activeStep >= 0 && setActiveStep(0)}
          >
            <span className="hidden sm:inline">1. </span>Voice Details
          </MobileTabsTrigger>
          <MobileTabsTrigger
            value="documents"
            active={activeStep === 1}
            onClick={() => activeStep >= 1 && setActiveStep(1)}
          >
            <span className="hidden sm:inline">2. </span>Documents
          </MobileTabsTrigger>
          <MobileTabsTrigger
            value="review"
            active={activeStep === 2}
            onClick={() => activeStep >= 2 && setActiveStep(2)}
          >
            <span className="hidden sm:inline">3. </span>Review
          </MobileTabsTrigger>
        </MobileTabsList>

        <MobileTabsContent value="voice">
          <MobileCard>
            <MobileCardHeader>
              <h3 className="text-lg font-medium">Voice Details</h3>
              <p className="text-sm text-muted-foreground">
                Tell us about your claim by speaking or typing the details
              </p>
            </MobileCardHeader>

            <MobileCardContent>
              <MobileForm>
                <MobileFormSection>
                  <div className="flex items-center gap-3 mb-6">
                    <Button
                      type="button"
                      variant={isRecording ? "destructive" : "outline"}
                      size="icon"
                      onClick={toggleRecording}
                      className="h-12 w-12 rounded-full flex-shrink-0"
                    >
                      {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </Button>

                    {isRecording ? (
                      <div className="flex-1">
                        <Progress value={recordingProgress} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          Recording... Tell us when, where, and what happened
                        </p>
                      </div>
                    ) : (
                      <div className="flex-1">
                        <p className="text-sm">
                          {claimData.transcript
                            ? "Recording complete! Details filled in below."
                            : "Tap the microphone and describe your incident"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Include when and where it happened, and describe the incident
                        </p>
                      </div>
                    )}
                  </div>

                  <MobileFormField label="When did the incident occur?" htmlFor="incidentDate">
                    <MobileInput
                      id="incidentDate"
                      placeholder="e.g., October 15, 2023 at 2:30 PM"
                      value={claimData.incidentDate}
                      onChange={(e) => handleInputChange("incidentDate", e.target.value)}
                    />
                  </MobileFormField>

                  <MobileFormField label="Where did the incident take place?" htmlFor="location">
                    <MobileInput
                      id="location"
                      placeholder="e.g., Intersection of Main St and 5th Ave"
                      value={claimData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                    />
                  </MobileFormField>

                  <MobileFormField label="Describe what happened">
                    <Textarea
                      placeholder="Describe the incident in detail..."
                      value={claimData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="min-h-[150px]"
                    />
                  </MobileFormField>
                </MobileFormSection>
              </MobileForm>
            </MobileCardContent>

            <MobileCardFooter>
              <div className="w-full flex justify-end">
                <Button onClick={handleNext} disabled={!validateStep()}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </MobileCardFooter>
          </MobileCard>
        </MobileTabsContent>

        <MobileTabsContent value="documents">
          <MobileCard>
            <MobileCardHeader>
              <h3 className="text-lg font-medium">Document Upload</h3>
              <p className="text-sm text-muted-foreground">Upload the required documents to support your claim</p>
            </MobileCardHeader>

            <MobileCardContent>
              <MobileForm>
                <MobileFormSection title="Police Report" description="Upload the official police report (required)">
                  <MobileDocumentUpload
                    accept="image/*,application/pdf"
                    maxFiles={1}
                    onFilesChange={handlePoliceReportChange}
                  />
                </MobileFormSection>

                <MobileFormSection title="Damage Photos" description="Upload photos showing the damage (required)">
                  <MobileDocumentUpload
                    accept="image/*"
                    maxFiles={5}
                    onFilesChange={handleDamagePhotosChange}
                    allowCamera={true}
                  />
                </MobileFormSection>

                <MobileFormSection title="Scene Photos" description="Upload photos of the accident scene (optional)">
                  <MobileDocumentUpload
                    accept="image/*"
                    maxFiles={5}
                    onFilesChange={handleScenePhotosChange}
                    allowCamera={true}
                  />
                </MobileFormSection>

                <MobileFormSection title="Mechanic Quote" description="Upload the repair quote (required)">
                  <MobileDocumentUpload
                    accept="image/*,application/pdf"
                    maxFiles={1}
                    onFilesChange={handleMechanicQuoteChange}
                  />
                </MobileFormSection>
              </MobileForm>
            </MobileCardContent>

            <MobileCardFooter>
              <div className="w-full flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!validateStep()}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </MobileCardFooter>
          </MobileCard>
        </MobileTabsContent>

        <MobileTabsContent value="review">
          <MobileCard>
            <MobileCardHeader>
              <h3 className="text-lg font-medium">Review & Submit</h3>
              <p className="text-sm text-muted-foreground">Review your claim details before submission</p>
            </MobileCardHeader>

            <MobileCardContent>
              <div className="space-y-6">
                <MobileFormSection title="Incident Details">
                  <div className="space-y-3">
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Date & Time</span>
                      <span className="font-medium">{claimData.incidentDate}</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Location</span>
                      <span className="font-medium">{claimData.location}</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Description</span>
                      <p className="text-sm">{claimData.description}</p>
                    </div>
                  </div>
                </MobileFormSection>

                <MobileFormSection title="Documents">
                  <div className="space-y-3">
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Police Report</span>
                      <span className="font-medium">
                        {claimData.policeReport ? claimData.policeReport.name : "Not uploaded"}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Damage Photos</span>
                      <span className="font-medium">{claimData.damagePhotos.length} photos uploaded</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Scene Photos</span>
                      <span className="font-medium">{claimData.scenePhotos.length} photos uploaded</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Mechanic Quote</span>
                      <span className="font-medium">
                        {claimData.mechanicQuote ? claimData.mechanicQuote.name : "Not uploaded"}
                      </span>
                    </div>
                  </div>
                </MobileFormSection>
              </div>
            </MobileCardContent>

            <MobileCardFooter>
              <div className="w-full flex justify-between">
                <Button variant="outline" onClick={handleBack}>
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
              </div>
            </MobileCardFooter>
          </MobileCard>
        </MobileTabsContent>
      </MobileTabs>
    </div>
  )
}
