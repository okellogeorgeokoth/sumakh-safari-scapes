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
      booking_requests: {
        Row: {
<<<<<<< HEAD
=======
          accommodation_type: string
          adults: string
          check_in_date: string
          check_out_date: string | null
          children: string
          created_at: string
          email: string
          first_name: string
>>>>>>> 9bb207adf3f408ffb2e4fe9fa948e966ae42d9a8
          id: string
          created_at: string
          first_name: string
          last_name: string
<<<<<<< HEAD
          email: string
=======
          notes: string | null
>>>>>>> 9bb207adf3f408ffb2e4fe9fa948e966ae42d9a8
          phone: string | null
          preferred_destination: string
          check_in_date: string
          check_out_date: string
          adults: number
          children: number | null
          accommodation_type: string
          special_requirements: string | null
        }
        Insert: {
<<<<<<< HEAD
=======
          accommodation_type: string
          adults?: string
          check_in_date: string
          check_out_date?: string | null
          children?: string
          created_at?: string
          email: string
          first_name: string
>>>>>>> 9bb207adf3f408ffb2e4fe9fa948e966ae42d9a8
          id?: string
          created_at?: string
          first_name: string
          last_name: string
<<<<<<< HEAD
          email: string
=======
          notes?: string | null
>>>>>>> 9bb207adf3f408ffb2e4fe9fa948e966ae42d9a8
          phone?: string | null
          preferred_destination: string
          check_in_date: string
          check_out_date: string
          adults: number
          children?: number | null
          accommodation_type: string
          special_requirements?: string | null
        }
        Update: {
<<<<<<< HEAD
=======
          accommodation_type?: string
          adults?: string
          check_in_date?: string
          check_out_date?: string | null
          children?: string
          created_at?: string
          email?: string
          first_name?: string
>>>>>>> 9bb207adf3f408ffb2e4fe9fa948e966ae42d9a8
          id?: string
          created_at?: string
          first_name?: string
          last_name?: string
<<<<<<< HEAD
          email?: string
=======
          notes?: string | null
>>>>>>> 9bb207adf3f408ffb2e4fe9fa948e966ae42d9a8
          phone?: string | null
          preferred_destination?: string
          check_in_date?: string
          check_out_date?: string
          adults?: number
          children?: number | null
          accommodation_type?: string
          special_requirements?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          group_size: string | null
          id: string
          message: string
          name: string
          phone: string | null
          travel_date: string | null
        }
        Insert: {
          created_at?: string
          email: string
          group_size?: string | null
          id?: string
          message: string
          name: string
          phone?: string | null
          travel_date?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          group_size?: string | null
          id?: string
          message?: string
          name?: string
          phone?: string | null
          travel_date?: string | null
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
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
