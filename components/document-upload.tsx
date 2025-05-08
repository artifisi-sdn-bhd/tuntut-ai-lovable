"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Camera, Upload, X, ArrowRight, ArrowLeft, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"

export function DocumentUpload({ onComplete, onBack }) {
  const [activeTab, setActiveTab] = useState("police")
  const [documents, setDocuments] = useState({
    policeReport: null,
    damagePhotos: [],
    scenePhotos: [],
    mechanicQuote: null,
  })
  const { toast } = useToast()

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0]
    if (!file) return

    // Check file type and size
    const isImage = file.type.startsWith("image/")
    const isPdf = file.type === "application/pdf"
    const isValidType = isImage || isPdf
    const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB limit

    if (!isValidType) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image or PDF file.",
        variant: "destructive",
      })
      return
    }

    if (!isValidSize) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      })
      return
    }

    // Create a preview URL
    const previewUrl = URL.createObjectURL(file)

    // Update state based on document type
    if (type === "damagePhotos" || type === "scenePhotos") {
      setDocuments((prev) => ({
        ...prev,
        [type]: [...prev[type], { file, previewUrl }],
      }))
    } else {
      setDocuments((prev) => ({
        ...prev,
        [type]: { file, previewUrl },
      }))
    }

    toast({
      title: "File uploaded",
      description: "Your document has been uploaded successfully.",
    })
  }

  const removeFile = (type, index) => {
    if (type === "damagePhotos" || type === "scenePhotos") {
      const newFiles = [...documents[type]]
      URL.revokeObjectURL(newFiles[index].previewUrl)
      newFiles.splice(index, 1)
      setDocuments((prev) => ({
        ...prev,
        [type]: newFiles,
      }))
    } else {
      URL.revokeObjectURL(documents[type]?.previewUrl)
      setDocuments((prev) => ({
        ...prev,
        [type]: null,
      }))
    }
  }

  const handleContinue = () => {
    // Validate required documents
    if (!documents.policeReport) {
      toast({
        title: "Missing document",
        description: "Please upload a police report.",
        variant: "destructive",
      })
      setActiveTab("police")
      return
    }

    if (documents.damagePhotos.length === 0) {
      toast({
        title: "Missing photos",
        description: "Please upload at least one damage photo.",
        variant: "destructive",
      })
      setActiveTab("damage")
      return
    }

    if (!documents.mechanicQuote) {
      toast({
        title: "Missing document",
        description: "Please upload a mechanic quote.",
        variant: "destructive",
      })
      setActiveTab("quote")
      return
    }

    onComplete(documents)
  }

  const renderFilePreview = (file, type, index) => {
    if (!file) return null

    const isPdf = file.file.type === "application/pdf"

    return (
      <div className="relative border rounded-md p-2 mt-4">
        <Button
          variant="destructive"
          size="icon"
          className="absolute -right-2 -top-2 h-6 w-6 rounded-full z-10"
          onClick={() => removeFile(type, index)}
        >
          <X className="h-4 w-4" />
        </Button>

        {isPdf ? (
          <div className="flex items-center gap-2 p-4">
            <FileText className="h-8 w-8 text-blue-500" />
            <div>
              <p className="font-medium">{file.file.name}</p>
              <p className="text-sm text-muted-foreground">{(file.file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
        ) : (
          <div className="relative h-40 w-full">
            <Image src={file.previewUrl || "/placeholder.svg"} alt="Preview" fill className="object-contain" />
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Document Upload</CardTitle>
        <CardDescription>Upload the required documents to support your claim.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="overflow-x-auto pb-1">
            <TabsList className="flex w-full min-w-max">
              <TabsTrigger value="police" className="relative flex-1 whitespace-nowrap px-1 sm:px-3">
                <span className="hidden sm:inline">Police</span> Report
                {documents.policeReport && (
                  <span className="absolute -top-1 -right-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="damage" className="relative flex-1 whitespace-nowrap px-1 sm:px-3">
                Damage <span className="hidden sm:inline">Photos</span>
                {documents.damagePhotos.length > 0 && (
                  <span className="absolute -top-1 -right-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="scene" className="relative flex-1 whitespace-nowrap px-1 sm:px-3">
                Scene <span className="hidden sm:inline">Photos</span>
                {documents.scenePhotos.length > 0 && (
                  <span className="absolute -top-1 -right-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="quote" className="relative flex-1 whitespace-nowrap px-1 sm:px-3">
                <span className="hidden sm:inline">Mechanic</span> Quote
                {documents.mechanicQuote && (
                  <span className="absolute -top-1 -right-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="police" className="mt-4 space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Police Report</h3>
              <p className="text-sm text-muted-foreground">
                Upload the official police report for your incident (PDF or image).
              </p>
            </div>

            {!documents.policeReport ? (
              <div className="flex justify-center">
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col items-center justify-center px-4 py-6 text-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                    <p className="mb-2 text-sm md:text-base text-muted-foreground">
                      <span className="font-semibold">Tap to upload</span>
                      <span className="hidden sm:inline"> or drag and drop</span>
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">PDF or image (max. 10MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,image/*"
                    onChange={(e) => handleFileUpload(e, "policeReport")}
                  />
                </label>
              </div>
            ) : (
              renderFilePreview(documents.policeReport, "policeReport")
            )}
          </TabsContent>

          <TabsContent value="damage" className="mt-4 space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Damage Photos</h3>
              <p className="text-sm text-muted-foreground">
                Upload photos showing the damage to your vehicle (up to 5 images).
              </p>
            </div>

            {documents.damagePhotos.length < 5 && (
              <div className="flex justify-center">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">Images only (max. 10MB each)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "damagePhotos")}
                  />
                </label>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
              {documents.damagePhotos.map((photo, index) => renderFilePreview(photo, "damagePhotos", index))}
            </div>
          </TabsContent>

          <TabsContent value="scene" className="mt-4 space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Scene Photos</h3>
              <p className="text-sm text-muted-foreground">
                Upload photos of the accident scene (optional, up to 5 images).
              </p>
            </div>

            {documents.scenePhotos.length < 5 && (
              <div className="flex justify-center">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">Images only (max. 10MB each)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "scenePhotos")}
                  />
                </label>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.scenePhotos.map((photo, index) => renderFilePreview(photo, "scenePhotos", index))}
            </div>
          </TabsContent>

          <TabsContent value="quote" className="mt-4 space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Mechanic Quote</h3>
              <p className="text-sm text-muted-foreground">
                Upload the repair quote from your mechanic (PDF or image).
              </p>
            </div>

            {!documents.mechanicQuote ? (
              <div className="flex justify-center">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">PDF or image (max. 10MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,image/*"
                    onChange={(e) => handleFileUpload(e, "mechanicQuote")}
                  />
                </label>
              </div>
            ) : (
              renderFilePreview(documents.mechanicQuote, "mechanicQuote")
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleContinue}>
          Continue to Review
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
