export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      claim_submissions: {
        Row: {
          claim_id: string
          created_at: string
          id: string
          insurer_id: string
          link_sent_via: string | null
          status: string
          submission_link: string
          updated_at: string
        }
        Insert: {
          claim_id: string
          created_at?: string
          id?: string
          insurer_id: string
          link_sent_via?: string | null
          status?: string
          submission_link: string
          updated_at?: string
        }
        Update: {
          claim_id?: string
          created_at?: string
          id?: string
          insurer_id?: string
          link_sent_via?: string | null
          status?: string
          submission_link?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "claim_submissions_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: false
            referencedRelation: "claims"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "claim_submissions_insurer_id_fkey"
            columns: ["insurer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      claims: {
        Row: {
          claim_number: string
          created_at: string
          date_of_incident: string
          description: string | null
          fraud_score: number | null
          id: string
          location: string
          policy_id: string
          risk_level: string | null
          status: string
          updated_at: string
        }
        Insert: {
          claim_number: string
          created_at?: string
          date_of_incident: string
          description?: string | null
          fraud_score?: number | null
          id?: string
          location: string
          policy_id: string
          risk_level?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          claim_number?: string
          created_at?: string
          date_of_incident?: string
          description?: string | null
          fraud_score?: number | null
          id?: string
          location?: string
          policy_id?: string
          risk_level?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "claims_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
        ]
      }
      decisions: {
        Row: {
          claim_id: string
          created_at: string
          decided_by: string
          decision: string
          id: string
          reason: string | null
        }
        Insert: {
          claim_id: string
          created_at?: string
          decided_by: string
          decision: string
          id?: string
          reason?: string | null
        }
        Update: {
          claim_id?: string
          created_at?: string
          decided_by?: string
          decision?: string
          id?: string
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "decisions_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: false
            referencedRelation: "claims"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "decisions_decided_by_fkey"
            columns: ["decided_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          claim_id: string
          created_at: string
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          type: string
          uploaded_by: string
        }
        Insert: {
          claim_id: string
          created_at?: string
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          type: string
          uploaded_by: string
        }
        Update: {
          claim_id?: string
          created_at?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          type?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: false
            referencedRelation: "claims"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      investigations: {
        Row: {
          assigned_by: string
          claim_id: string
          created_at: string
          findings: string | null
          id: string
          investigator_id: string
          report_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          assigned_by: string
          claim_id: string
          created_at?: string
          findings?: string | null
          id?: string
          investigator_id: string
          report_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          assigned_by?: string
          claim_id?: string
          created_at?: string
          findings?: string | null
          id?: string
          investigator_id?: string
          report_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "investigations_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investigations_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: false
            referencedRelation: "claims"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investigations_investigator_id_fkey"
            columns: ["investigator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investigations_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      legal_cases: {
        Row: {
          claim_id: string
          created_at: string
          escalated_by: string
          id: string
          legal_officer_id: string | null
          notes: string | null
          status: string
          updated_at: string
        }
        Insert: {
          claim_id: string
          created_at?: string
          escalated_by: string
          id?: string
          legal_officer_id?: string | null
          notes?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          claim_id?: string
          created_at?: string
          escalated_by?: string
          id?: string
          legal_officer_id?: string | null
          notes?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "legal_cases_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: false
            referencedRelation: "claims"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "legal_cases_escalated_by_fkey"
            columns: ["escalated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "legal_cases_legal_officer_id_fkey"
            columns: ["legal_officer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      policies: {
        Row: {
          created_at: string
          details: Json | null
          end_date: string
          holder_id: string
          id: string
          insurer_id: string
          policy_number: string
          start_date: string
          status: string
        }
        Insert: {
          created_at?: string
          details?: Json | null
          end_date: string
          holder_id: string
          id?: string
          insurer_id: string
          policy_number: string
          start_date: string
          status?: string
        }
        Update: {
          created_at?: string
          details?: Json | null
          end_date?: string
          holder_id?: string
          id?: string
          insurer_id?: string
          policy_number?: string
          start_date?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "policies_holder_id_fkey"
            columns: ["holder_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policies_insurer_id_fkey"
            columns: ["insurer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          phone: string | null
          role: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          phone?: string | null
          role: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          role?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
