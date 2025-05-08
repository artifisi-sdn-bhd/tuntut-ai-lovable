"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { InteractiveFlowDiagram } from "./interactive-flow-diagram"
import { Clock, ArrowRight, CheckCircle, XCircle, FileText, Users, Calendar, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

type ComparisonTab = "overview" | "timeline" | "details"

export function VisualProcessComparison() {
  const [activeTab, setActiveTab] = useState<ComparisonTab>("overview")
  const [showDetails, setShowDetails] = useState(false)

  return (
    <section className="w-full">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg border overflow-hidden">
          <button
            onClick={() => setActiveTab("overview")}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              activeTab === "overview" ? "bg-primary text-white" : "bg-white hover:bg-gray-50",
            )}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("timeline")}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              activeTab === "timeline" ? "bg-primary text-white" : "bg-white hover:bg-gray-50",
            )}
          >
            Process Timeline
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              activeTab === "details" ? "bg-primary text-white" : "bg-white hover:bg-gray-50",
            )}
          >
            Detailed Comparison
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ProcessOverview />
          </motion.div>
        )}

        {activeTab === "timeline" && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <InteractiveFlowDiagram />
          </motion.div>
        )}

        {activeTab === "details" && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DetailedComparison />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-16 bg-slate-50 rounded-xl p-6 border border-slate-200"
      >
        <h3 className="text-xl font-bold mb-6 text-center">Key Process Improvements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-3xl font-bold text-primary mb-1">70%</div>
            <div className="text-sm text-slate-600">Faster Processing</div>
          </div>
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-3xl font-bold text-primary mb-1">50%</div>
            <div className="text-sm text-slate-600">Cost Reduction</div>
          </div>
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-3xl font-bold text-primary mb-1">92%</div>
            <div className="text-sm text-slate-600">Fraud Detection</div>
          </div>
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-3xl font-bold text-primary mb-1">99%</div>
            <div className="text-sm text-slate-600">Data Accuracy</div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function ProcessOverview() {
  return (
    <div className="space-y-12">
      {/* Split Screen Comparison */}
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 transform -translate-x-1/2 hidden md:block"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Traditional Process */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold">Traditional Process</h3>
            </div>

            <div className="bg-white rounded-xl border p-5 shadow-sm">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-slate-500" />
                Manual Document Processing
              </h4>
              <p className="text-slate-600 text-sm">
                Claims adjusters manually review all documents, including forms, photos, and reports, taking 2-3 hours
                per claim.
              </p>
            </div>

            <div className="bg-white rounded-xl border p-5 shadow-sm">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-slate-500" />
                Multiple Human Touchpoints
              </h4>
              <p className="text-slate-600 text-sm">
                Claims pass through 4-6 different employees, creating bottlenecks and inconsistent assessments.
              </p>
            </div>

            <div className="bg-white rounded-xl border p-5 shadow-sm">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-500" />
                Extended Timeline
              </h4>
              <p className="text-slate-600 text-sm">
                Average processing time of 7-14 days from initial report to final resolution, with limited visibility
                for claimants.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-2">
                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Prone to human error and inconsistency</span>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Limited scalability during peak periods</span>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Higher operational costs</span>
              </div>
            </div>
          </motion.div>

          {/* AI-Powered Process */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">tuntut.ai Process</h3>
            </div>

            <div className="bg-white rounded-xl border-2 border-primary/20 p-5 shadow-sm">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                AI Document Analysis
              </h4>
              <p className="text-slate-600 text-sm">
                Advanced OCR and machine learning automatically extract and categorize data from all documents in
                minutes.
              </p>
            </div>

            <div className="bg-white rounded-xl border-2 border-primary/20 p-5 shadow-sm">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Streamlined Workflow
              </h4>
              <p className="text-slate-600 text-sm">
                AI handles routine claims end-to-end, with human adjusters focusing only on complex or flagged cases.
              </p>
            </div>

            <div className="bg-white rounded-xl border-2 border-primary/20 p-5 shadow-sm">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Accelerated Resolution
              </h4>
              <p className="text-slate-600 text-sm">
                Average processing time of 1-3 days, with real-time status updates and transparent communication.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>99.2% accuracy in data extraction and analysis</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Infinitely scalable to handle volume fluctuations</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>50% reduction in operational expenses</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Process Time Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl border p-6 shadow-sm"
      >
        <h3 className="text-lg font-bold mb-6 text-center">Total Process Time Comparison</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="text-center">
            <div className="text-sm text-slate-500 mb-1">Traditional Process</div>
            <div className="text-2xl font-bold text-slate-800">7-14 days</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-0.5 w-12 bg-slate-200 hidden md:block"></div>
            <div className="flex flex-col items-center">
              <ArrowRight className="h-6 w-6 text-primary hidden md:block" />
              <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full mt-1">
                Up to 80% faster
              </div>
            </div>
            <div className="h-0.5 w-12 bg-slate-200 hidden md:block"></div>
          </div>

          <div className="text-center">
            <div className="text-sm text-slate-500 mb-1">tuntut.ai Process</div>
            <div className="text-2xl font-bold text-primary">1-3 days</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function DetailedComparison() {
  return (
    <div className="space-y-8">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50">
              <th className="border p-3 text-left">Process Aspect</th>
              <th className="border p-3 text-left">Traditional Approach</th>
              <th className="border p-3 text-left">tuntut.ai Approach</th>
              <th className="border p-3 text-left">Improvement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-3 font-medium">Document Processing</td>
              <td className="border p-3">Manual review and data entry</td>
              <td className="border p-3">AI-powered OCR and data extraction</td>
              <td className="border p-3 text-green-600">90% time reduction</td>
            </tr>
            <tr>
              <td className="border p-3 font-medium">Damage Assessment</td>
              <td className="border p-3">Human visual inspection</td>
              <td className="border p-3">Computer vision with damage recognition</td>
              <td className="border p-3 text-green-600">35% accuracy improvement</td>
            </tr>
            <tr>
              <td className="border p-3 font-medium">Fraud Detection</td>
              <td className="border p-3">Manual checks against known patterns</td>
              <td className="border p-3">ML algorithms analyzing multiple data points</td>
              <td className="border p-3 text-green-600">92% detection rate</td>
            </tr>
            <tr>
              <td className="border p-3 font-medium">Customer Communication</td>
              <td className="border p-3">Periodic manual updates</td>
              <td className="border p-3">Automated real-time status updates</td>
              <td className="border p-3 text-green-600">24/7 visibility</td>
            </tr>
            <tr>
              <td className="border p-3 font-medium">Adjuster Workload</td>
              <td className="border p-3">All claims require human review</td>
              <td className="border p-3">Only complex claims need human input</td>
              <td className="border p-3 text-green-600">60% workload reduction</td>
            </tr>
            <tr>
              <td className="border p-3 font-medium">Scalability</td>
              <td className="border p-3">Limited by staff availability</td>
              <td className="border p-3">Unlimited AI processing capacity</td>
              <td className="border p-3 text-green-600">No processing bottlenecks</td>
            </tr>
            <tr>
              <td className="border p-3 font-medium">Cost Per Claim</td>
              <td className="border p-3">$300-500 average</td>
              <td className="border p-3">$150-200 average</td>
              <td className="border p-3 text-green-600">50-60% cost savings</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <h3 className="text-lg font-bold mb-4">Traditional Process Challenges</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span>Manual document processing creates bottlenecks</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span>Inconsistent assessment criteria between adjusters</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span>Limited capacity during high-volume periods</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span>Fraud detection relies on adjuster experience</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span>Delayed communication with claimants</span>
            </li>
          </ul>
        </div>

        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
          <h3 className="text-lg font-bold mb-4">tuntut.ai Process Benefits</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Automated document analysis with AI OCR technology</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Consistent assessment using standardized AI algorithms</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Scalable processing regardless of claim volume</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Advanced pattern recognition for fraud detection</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Real-time updates and transparent communication</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
