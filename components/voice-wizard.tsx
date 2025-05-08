"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, MicOff, ArrowRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"

const QUESTIONS = [
  "When did the incident occur? Please provide the date and approximate time.",
  "Where did the incident take place? Please provide the address or location.",
  "Please describe what happened in detail.",
]

export function VoiceWizard({ onComplete }) {
  const [isRecording, setIsRecording] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState(["", "", ""])
  const [transcript, setTranscript] = useState("")
  const [progress, setProgress] = useState(0)
  const [isAllInOne, setIsAllInOne] = useState(false)
  const [fullTranscript, setFullTranscript] = useState("")

  // Mock speech recognition - in a real app, you'd use the Web Speech API or a service like OpenAI Whisper
  const mockRecognition = useRef(null)

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  const startRecording = () => {
    setIsRecording(true)
    setProgress(0)

    // Simulate recording with progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          stopRecording()
          return 100
        }
        return prev + 5
      })
    }, 200)

    mockRecognition.current = interval
  }

  const stopRecording = () => {
    setIsRecording(false)
    clearInterval(mockRecognition.current)

    if (isAllInOne) {
      // Process the all-in-one recording
      const completeTranscript =
        "The accident happened on October 15th, 2023 at around 2:30 PM. It occurred at the intersection of Main Street and 5th Avenue in Springfield. I was stopped at a red light when a vehicle rear-ended me. The impact was moderate and caused damage to my rear bumper and trunk. The other driver admitted fault and we exchanged insurance information. There were no injuries, but my car needs repair."

      setFullTranscript(completeTranscript)

      // Extract information for each question
      const newAnswers = [
        "October 15th, 2023 at around 2:30 PM",
        "Intersection of Main Street and 5th Avenue in Springfield",
        "I was stopped at a red light when a vehicle rear-ended me. The impact was moderate and caused damage to my rear bumper and trunk. The other driver admitted fault and we exchanged insurance information. There were no injuries, but my car needs repair.",
      ]

      setAnswers(newAnswers)
      setProgress(0)
      return
    }

    // Simulate transcription result for individual questions
    const mockResults = [
      "The accident happened on October 15th, 2023 at around 2:30 PM.",
      "It occurred at the intersection of Main Street and 5th Avenue in Springfield.",
      "I was stopped at a red light when a vehicle rear-ended me. The impact was moderate and caused damage to my rear bumper and trunk. The other driver admitted fault and we exchanged insurance information. There were no injuries, but my car needs repair.",
    ]

    // Update the current answer
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = mockResults[currentQuestion]
    setAnswers(newAnswers)

    // Add to full transcript
    setTranscript((prev) => prev + " " + mockResults[currentQuestion])

    // Reset progress
    setProgress(0)
  }

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      // Process and extract data from answers
      const extractedData = {
        incidentDate: answers[0],
        location: answers[1],
        description: answers[2],
        transcript: isAllInOne ? fullTranscript : transcript.trim(),
      }

      onComplete(extractedData)
    }
  }

  const handleTextChange = (e) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = e.target.value
    setAnswers(newAnswers)
  }

  const toggleMode = () => {
    setIsAllInOne(!isAllInOne)
    setCurrentQuestion(0)
    setAnswers(["", "", ""])
    setTranscript("")
    setFullTranscript("")
  }

  const isLastQuestion = currentQuestion === QUESTIONS.length - 1
  const canProceed = answers[currentQuestion].trim().length > 0

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Voice Details</CardTitle>
        <CardDescription>
          Tell us about your claim by answering a few questions. You can speak or type your answers.
        </CardDescription>
        <div className="flex items-center mt-2">
          <Button variant="outline" size="sm" onClick={toggleMode} className="text-xs">
            {isAllInOne ? "Switch to Step-by-Step" : "Switch to All-in-One Recording"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 px-4 sm:px-6">
        {isAllInOne ? (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Tell us everything about your incident</h3>
            <p className="text-base">Describe when and where the incident occurred, and what happened in detail.</p>

            <div className="flex items-center gap-4">
              <Button
                variant={isRecording ? "destructive" : "secondary"}
                size="icon"
                onClick={toggleRecording}
                className="h-12 w-12 rounded-full flex-shrink-0"
              >
                {isRecording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
              </Button>

              {isRecording && (
                <div className="flex-1">
                  <Progress value={progress} className="h-3" />
                  <p className="text-sm text-muted-foreground mt-1">Recording...</p>
                </div>
              )}
            </div>

            <Textarea
              placeholder="Your complete incident description will appear here..."
              value={fullTranscript}
              onChange={(e) => setFullTranscript(e.target.value)}
              className="min-h-[150px] text-base p-3"
            />

            {fullTranscript && (
              <div className="space-y-3 border rounded-md p-3 bg-muted/20">
                <div>
                  <h4 className="font-medium text-sm">We extracted the following information:</h4>
                </div>
                <div>
                  <span className="text-sm font-medium">When: </span>
                  <span className="text-sm">{answers[0]}</span>
                </div>
                <div>
                  <span className="text-sm font-medium">Where: </span>
                  <span className="text-sm">{answers[1]}</span>
                </div>
                <div>
                  <span className="text-sm font-medium">What happened: </span>
                  <span className="text-sm">{answers[2]}</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="text-lg font-medium">
              Question {currentQuestion + 1} of {QUESTIONS.length}
            </h3>
            <p className="text-base">{QUESTIONS[currentQuestion]}</p>

            <div className="flex items-center gap-4">
              <Button
                variant={isRecording ? "destructive" : "secondary"}
                size="icon"
                onClick={toggleRecording}
                className="h-12 w-12 rounded-full flex-shrink-0"
              >
                {isRecording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
              </Button>

              {isRecording && (
                <div className="flex-1">
                  <Progress value={progress} className="h-3" />
                  <p className="text-sm text-muted-foreground mt-1">Recording...</p>
                </div>
              )}
            </div>

            <Textarea
              placeholder="You can also type your answer here..."
              value={answers[currentQuestion]}
              onChange={handleTextChange}
              className="min-h-[150px] text-base p-3"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between px-4 sm:px-6 pb-4 pt-2">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0 || isAllInOne}
          className="h-11 px-4"
        >
          Back
        </Button>
        <Button onClick={handleNext} disabled={isAllInOne ? !fullTranscript : !canProceed} className="h-11 px-4">
          {isLastQuestion || isAllInOne ? "Continue to Documents" : "Next Question"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
