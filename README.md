
# Claims Management System

A modern claims management system built with React, Next.js, and Supabase for insurance companies to streamline the claims process from submission to resolution.

## Overview

This application helps insurance companies manage the complete lifecycle of insurance claims:

- Insurers can create new claims and send submission links to policy holders
- Policy holders can easily submit claims with required information and documents
- Claims are automatically analyzed for potential fraud
- Low-risk claims can be auto-approved while higher risk claims are escalated
- Investigators can be assigned to claims for further review
- Legal escalation path for rejected claims

## Features

- **User Authentication**: Secure email-based authentication via Supabase
- **Role-Based Access Control**: Different interfaces for insurers, investigators, and legal teams
- **Mobile-Optimized Interface**: Responsive design works across devices
- **Document Upload**: Support for various file types needed for claim documentation
- **Fraud Detection**: Risk scoring system to identify potentially fraudulent claims
- **Dashboard Analytics**: Real-time metrics and status tracking

## Technical Stack

- **Frontend**: React, Next.js, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (Authentication, Database, Storage)
- **State Management**: React Context API
- **Styling**: Tailwind CSS for responsive design

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or pnpm
- Supabase account

### Environment Setup

1. Clone the repository
2. Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Install dependencies:

```
npm install
# or
pnpm install
```

4. Run the development server:

```
npm run dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

## Database Schema

The application uses the following database tables:
- `users` - User information and role management
- `policies` - Insurance policy details
- `claims` - Core claim information
- `claim_submissions` - Tracks submission links sent to policy holders
- `documents` - Files uploaded as part of claims
- `investigations` - Investigation assignments and reports
- `decisions` - Claim approval/rejection decisions
- `legal_cases` - Escalated rejected claims

## Workflow

1. Insurer creates a new claim and sends a submission link
2. Policy holder receives the link and submits claim details
3. System analyzes the claim for fraud risk
4. Based on risk level, claims are auto-approved or escalated
5. Investigators review escalated claims and submit reports
6. Insurers make final decisions based on investigation findings
7. Rejected claims can be escalated to legal for further review

## Project Status

This project is currently under development.
