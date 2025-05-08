// User Types
export type UserRole = "claimant" | "adjuster"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: Date
}

// Claim Types
export type ClaimStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "more_info_requested"
  | "approved"
  | "denied"
  | "escalated"

export type FraudFlag = "price_anomaly" | "doc_mismatch" | "photo_duplicate"

export interface Claim {
  id: string
  trackingId: string
  claimantId: string
  adjusterId?: string
  status: ClaimStatus
  incidentDate: Date
  incidentLocation: string
  description: string
  transcriptText: string
  transcriptAudioUrl?: string
  policeReportUrl?: string
  mechanicQuoteUrl?: string
  estimatedAmount?: number
  fraudFlags: FraudFlag[]
  riskScore: number
  createdAt: Date
  updatedAt: Date
}

// Photo Types
export interface ClaimPhoto {
  id: string
  claimId: string
  url: string
  type: "vehicle_damage" | "scene"
  hash: string // For duplicate detection
  createdAt: Date
}

// Note Types
export interface ClaimNote {
  id: string
  claimId: string
  authorId: string
  text: string
  createdAt: Date
}

// Notification Types
export type NotificationType =
  | "claim_submitted"
  | "status_updated"
  | "more_info_requested"
  | "claim_approved"
  | "claim_denied"

export interface Notification {
  id: string
  userId: string
  claimId: string
  type: NotificationType
  read: boolean
  createdAt: Date
}
