"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileText,
  Database,
  ImageIcon,
  Calculator,
  Shield,
  Search,
  CheckCircle,
  CreditCard,
  BarChart,
  ArrowRight,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"

type ProcessStep = {
  id: number
  title: string
  traditional: {
    description: string
    time: string
    icon: React.ReactNode
  }
  tuntut: {
    description: string
    time: string
    icon: React.ReactNode
  }
  color: string
}

export function InteractiveFlowDiagram() {
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<"traditional" | "tuntut">("tuntut")

  const steps: ProcessStep[] = [
    {
      id: 1,
      title: "Incident Reporting",
      traditional: {
        description: "Manual form filling, phone calls, or in-person reporting",
        time: "1-2 days",
        icon: <FileText className="h-6 w-6 text-slate-600" />,
      },
      tuntut: {
        description: "Mobile app with guided reporting and photo capture",
        time: "15-30 minutes",
        icon: <FileText className="h-6 w-6 text-white" />,
      },
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Data Intake",
      traditional: {
        description: "Manual data entry from forms and documents",
        time: "1-2 days",
        icon: <Database className="h-6 w-6 text-slate-600" />,
      },
      tuntut: {
        description: "AI OCR automatically extracts data from documents and photos",
        time: "Minutes",
        icon: <Database className="h-6 w-6 text-white" />,
      },
      color: "bg-indigo-500",
    },
    {
      id: 3,
      title: "Damage Documentation",
      traditional: {
        description: "Manual photo review and categorization",
        time: "1-2 hours",
        icon: <ImageIcon className="h-6 w-6 text-slate-600" />,
      },
      tuntut: {
        description: "Auto-tagging and classification of damage photos",
        time: "Seconds",
        icon: <ImageIcon className="h-6 w-6 text-white" />,
      },
      color: "bg-purple-500",
    },
    {
      id: 4,
      title: "Initial Assessment",
      traditional: {
        description: "Human adjuster reviews documents and photos",
        time: "1-3 days",
        icon: <Calculator className="h-6 w-6 text-slate-600" />,
      },
      tuntut: {
        description: "AI generates damage estimates based on photo analysis",
        time: "Minutes",
        icon: <Calculator className="h-6 w-6 text-white" />,
      },
      color: "bg-green-500",
    },
    {
      id: 5,
      title: "Fraud & Compliance",
      traditional: {
        description: "Manual review against checklists and databases",
        time: "1-2 days",
        icon: <Shield className="h-6 w-6 text-slate-600" />,
      },
      tuntut: {
        description: "AI scoring system flags potential fraud patterns",
        time: "Seconds",
        icon: <Shield className="h-6 w-6 text-white" />,
      },
      color: "bg-yellow-500",
    },
    {
      id: 6,
      title: "Human Investigation",
      traditional: {
        description: "Required for all claims regardless of complexity",
        time: "1-7 days",
        icon: <Search className="h-6 w-6 text-slate-600" />,
      },
      tuntut: {
        description: "Only required for flagged or complex claims",
        time: "0-2 days",
        icon: <Search className="h-6 w-6 text-white" />,
      },
      color: "bg-orange-500",
    },
    {
      id: 7,
      title: "Report & Approval",
      traditional: {
        description: "Manual report writing and multi-level approval",
        time: "1-3 days",
        icon: <CheckCircle className="h-6 w-6 text-slate-600" />,
      },
      tuntut: {
        description: "Auto-generated reports with 1-click approval",
        time: "Hours",
        icon: <CheckCircle className="h-6 w-6 text-white" />,
      },
      color: "bg-red-500",
    },
    {
      id: 8,
      title: "Payout & Communication",
      traditional: {
        description: "Manual payment processing and customer updates",
        time: "1-3 days",
        icon: <CreditCard className="h-6 w-6 text-slate-600" />,
      },
      tuntut: {
        description: "Automated payments and real-time status updates",
        time: "Hours",
        icon: <CreditCard className="h-6 w-6 text-white" />,
      },
      color: "bg-pink-500",
    },
    {
      id: 9,
      title: "Post-Claim Analytics",
      traditional: {
        description: "Periodic manual reporting and retrospective analysis",
        time: "Weeks/Months",
        icon: <BarChart className="h-6 w-6 text-slate-600" />,
      },
      tuntut: {
        description: "Real-time analytics dashboard with actionable insights",
        time: "Instant",
        icon: <BarChart className="h-6 w-6 text-white" />,
      },
      color: "bg-teal-500",
    },
  ]

  return (
    <div className="w-full">
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setViewMode("traditional")}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-l-lg",
              viewMode === "traditional" ? "bg-slate-800 text-white" : "bg-white text-slate-700 hover:bg-slate-100",
            )}
          >
            Traditional Process
          </button>
          <button
            type="button"
            onClick={() => setViewMode("tuntut")}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-r-lg",
              viewMode === "tuntut" ? "bg-slate-800 text-white" : "bg-white text-slate-700 hover:bg-slate-100",
            )}
          >
            tuntut.ai Process
          </button>
        </div>
      </div>

      <div className="relative mb-12">
        {/* Timeline connector */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-200 transform -translate-x-1/2 hidden md:block"></div>

        {/* Process steps */}
        <div className="space-y-12 relative">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: step.id * 0.1 }}
              className={cn(
                "relative flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8",
                step.id % 2 === 0 ? "md:flex-row-reverse" : "",
              )}
            >
              {/* Timeline node */}
              <div className="flex-shrink-0 z-10">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center cursor-pointer shadow-lg",
                    step.color,
                  )}
                >
                  {viewMode === "traditional" ? step.traditional.icon : step.tuntut.icon}
                </motion.div>
              </div>

              {/* Content card */}
              <motion.div
                layout
                className={cn(
                  "bg-white rounded-xl shadow-md p-6 md:w-[calc(50%-3rem)] relative",
                  activeStep === step.id ? "border-2" : "border",
                  activeStep === step.id ? `border-${step.color.replace("bg-", "")}` : "border-slate-200",
                )}
              >
                {/* Arrow connector for desktop */}
                <div
                  className={cn(
                    "hidden md:block absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rotate-45 bg-white border",
                    step.id % 2 === 0 ? "-left-2 border-l border-b" : "-right-2 border-r border-t",
                    activeStep === step.id ? `border-${step.color.replace("bg-", "")}` : "border-slate-200",
                  )}
                ></div>

                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Clock className="h-4 w-4" />
                    <span>{viewMode === "traditional" ? step.traditional.time : step.tuntut.time}</span>
                  </div>
                </div>

                <p className="text-slate-600 mb-4">
                  {viewMode === "traditional" ? step.traditional.description : step.tuntut.description}
                </p>

                <AnimatePresence>
                  {activeStep === step.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className={cn(
                            "w-3 h-3 rounded-full",
                            viewMode === "traditional" ? "bg-red-500" : "bg-green-500",
                          )}
                        ></div>
                        <h4 className="font-medium">{viewMode === "traditional" ? "Pain Points" : "Benefits"}</h4>
                      </div>
                      <ul className="space-y-2 pl-5 list-disc text-sm text-slate-600">
                        {viewMode === "traditional" ? (
                          <>
                            <li>Time-consuming manual processes</li>
                            <li>Prone to human error and inconsistency</li>
                            <li>Limited scalability during peak periods</li>
                          </>
                        ) : (
                          <>
                            <li>Automated processing saves significant time</li>
                            <li>Consistent AI-powered analysis improves accuracy</li>
                            <li>Scalable solution handles volume fluctuations</li>
                          </>
                        )}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Time comparison summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-8"
      >
        <h3 className="text-xl font-bold mb-4 text-center">Total Process Time Comparison</h3>
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-slate-200 w-full md:w-auto">
            <div className="text-slate-500 mb-1">Traditional Process</div>
            <div className="text-3xl font-bold text-red-500">7-14 days</div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <ArrowRight className="h-6 w-6 text-slate-400" />
            <div className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">80% faster</div>
            <ArrowRight className="h-6 w-6 text-slate-400" />
          </div>

          <div className="md:hidden flex items-center gap-2 my-2">
            <div className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">80% faster</div>
          </div>

          <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-green-200 w-full md:w-auto">
            <div className="text-slate-500 mb-1">tuntut.ai Process</div>
            <div className="text-3xl font-bold text-green-500">1-3 days</div>
          </div>
        </div>
      </motion.div>

      {/* Interactive elements explanation */}
      <div className="text-center text-sm text-slate-500 mb-8">
        <p>Click on any step icon to see more details about that process stage</p>
      </div>
    </div>
  )
}
