export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      address: {
        Row: {
          cep: string
          city: string
          complement: string | null
          id: number
          latitude: number | null
          longitude: number | null
          neighborhood: string
          number: number | null
          reference: string | null
          state: string
          street: string
        }
        Insert: {
          cep: string
          city: string
          complement?: string | null
          id?: number
          latitude?: number | null
          longitude?: number | null
          neighborhood: string
          number?: number | null
          reference?: string | null
          state: string
          street: string
        }
        Update: {
          cep?: string
          city?: string
          complement?: string | null
          id?: number
          latitude?: number | null
          longitude?: number | null
          neighborhood?: string
          number?: number | null
          reference?: string | null
          state?: string
          street?: string
        }
        Relationships: []
      }
      branch: {
        Row: {
          address_id: number | null
          email: string
          id: number
          name: string
          phone_number: string
          supermarket_chain_id: number | null
        }
        Insert: {
          address_id?: number | null
          email: string
          id?: number
          name: string
          phone_number: string
          supermarket_chain_id?: number | null
        }
        Update: {
          address_id?: number | null
          email?: string
          id?: number
          name?: string
          phone_number?: string
          supermarket_chain_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "branch_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "address"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "branch_supermarket_chain_id_fkey"
            columns: ["supermarket_chain_id"]
            isOneToOne: false
            referencedRelation: "supermarket_chain"
            referencedColumns: ["id"]
          },
        ]
      }
      branch_product: {
        Row: {
          branch_id: number | null
          buy_price: number
          current_earn: number | null
          expiration_date: string
          id: number
          initial_quantity: number
          is_available: boolean | null
          is_promotion: boolean | null
          min_quantity: number
          product_id: number | null
          profit: number
          sell_price: number
          stock_level: Database["public"]["Enums"]["stock_level"] | null
          stock_quantity: number
          total_cost: number | null
          total_to_earn: number | null
          wanted_quantity: number
        }
        Insert: {
          branch_id?: number | null
          buy_price: number
          current_earn?: number | null
          expiration_date: string
          id?: number
          initial_quantity: number
          is_available?: boolean | null
          is_promotion?: boolean | null
          min_quantity: number
          product_id?: number | null
          profit: number
          sell_price: number
          stock_level?: Database["public"]["Enums"]["stock_level"] | null
          stock_quantity: number
          total_cost?: number | null
          total_to_earn?: number | null
          wanted_quantity: number
        }
        Update: {
          branch_id?: number | null
          buy_price?: number
          current_earn?: number | null
          expiration_date?: string
          id?: number
          initial_quantity?: number
          is_available?: boolean | null
          is_promotion?: boolean | null
          min_quantity?: number
          product_id?: number | null
          profit?: number
          sell_price?: number
          stock_level?: Database["public"]["Enums"]["stock_level"] | null
          stock_quantity?: number
          total_cost?: number | null
          total_to_earn?: number | null
          wanted_quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "branch_product_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "branch_product_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "branch_product_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_with_inventory"
            referencedColumns: ["product_id"]
          },
        ]
      }
      category: {
        Row: {
          id: number
          title: string
        }
        Insert: {
          id?: number
          title: string
        }
        Update: {
          id?: number
          title?: string
        }
        Relationships: []
      }
      order_product: {
        Row: {
          id: number
          order_id: number | null
          product_id: number | null
          qtd: number
          subtotal: number
          unit_price: number
        }
        Insert: {
          id?: number
          order_id?: number | null
          product_id?: number | null
          qtd: number
          subtotal: number
          unit_price: number
        }
        Update: {
          id?: number
          order_id?: number | null
          product_id?: number | null
          qtd?: number
          subtotal?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_product_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_product_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_product_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_with_inventory"
            referencedColumns: ["product_id"]
          },
        ]
      }
      orders: {
        Row: {
          address_id: number | null
          branch_id: number | null
          d_at: string
          delivery_fee: number | null
          discount: number | null
          finished_at: string | null
          id: number
          order_number: number
          payment_status: Database["public"]["Enums"]["payment_status"]
          qtd_compras: number | null
          route_id: number | null
          status: Database["public"]["Enums"]["order_status"]
          total_price: number
          user_id: number | null
        }
        Insert: {
          address_id?: number | null
          branch_id?: number | null
          d_at: string
          delivery_fee?: number | null
          discount?: number | null
          finished_at?: string | null
          id?: number
          order_number: number
          payment_status: Database["public"]["Enums"]["payment_status"]
          qtd_compras?: number | null
          route_id?: number | null
          status: Database["public"]["Enums"]["order_status"]
          total_price: number
          user_id?: number | null
        }
        Update: {
          address_id?: number | null
          branch_id?: number | null
          d_at?: string
          delivery_fee?: number | null
          discount?: number | null
          finished_at?: string | null
          id?: number
          order_number?: number
          payment_status?: Database["public"]["Enums"]["payment_status"]
          qtd_compras?: number | null
          route_id?: number | null
          status?: Database["public"]["Enums"]["order_status"]
          total_price?: number
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "address"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "route"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payment: {
        Row: {
          amount: number
          canceled_at: string | null
          confirmed_at: string | null
          d_at: string
          id: number
          order_id: number | null
          status: Database["public"]["Enums"]["payment_status"]
        }
        Insert: {
          amount: number
          canceled_at?: string | null
          confirmed_at?: string | null
          d_at: string
          id?: number
          order_id?: number | null
          status: Database["public"]["Enums"]["payment_status"]
        }
        Update: {
          amount?: number
          canceled_at?: string | null
          confirmed_at?: string | null
          d_at?: string
          id?: number
          order_id?: number | null
          status?: Database["public"]["Enums"]["payment_status"]
        }
        Relationships: [
          {
            foreignKeyName: "payment_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: true
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_method: {
        Row: {
          active: boolean | null
          code: string
          config: Json | null
          display_name: string
          id: number
          payment_id: number | null
        }
        Insert: {
          active?: boolean | null
          code: string
          config?: Json | null
          display_name: string
          id?: number
          payment_id?: number | null
        }
        Update: {
          active?: boolean | null
          code?: string
          config?: Json | null
          display_name?: string
          id?: number
          payment_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_method_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payment"
            referencedColumns: ["id"]
          },
        ]
      }
      product: {
        Row: {
          brand: string | null
          category_id: number | null
          code: string
          description: string
          id: number
          image_url: string | null
          name: string
          unit: string
          units_sold: number | null
        }
        Insert: {
          brand?: string | null
          category_id?: number | null
          code: string
          description: string
          id?: number
          image_url?: string | null
          name: string
          unit: string
          units_sold?: number | null
        }
        Update: {
          brand?: string | null
          category_id?: number | null
          code?: string
          description?: string
          id?: number
          image_url?: string | null
          name?: string
          unit?: string
          units_sold?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
        ]
      }
      route: {
        Row: {
          actual_time: number | null
          estimated_distance: number
          estimated_time: number
          id: number
        }
        Insert: {
          actual_time?: number | null
          estimated_distance: number
          estimated_time: number
          id?: number
        }
        Update: {
          actual_time?: number | null
          estimated_distance?: number
          estimated_time?: number
          id?: number
        }
        Relationships: []
      }
      supermarket_chain: {
        Row: {
          cnpj: string
          deliveryEndTime: number | null
          id: number
          logoUrl: string | null
          minimumOrderValue: number | null
          name: string
        }
        Insert: {
          cnpj: string
          deliveryEndTime?: number | null
          id?: number
          logoUrl?: string | null
          minimumOrderValue?: number | null
          name: string
        }
        Update: {
          cnpj?: string
          deliveryEndTime?: number | null
          id?: number
          logoUrl?: string | null
          minimumOrderValue?: number | null
          name?: string
        }
        Relationships: []
      }
      user_address: {
        Row: {
          address_id: number | null
          id: number
          is_default: boolean | null
          label: string
          user_id: number | null
        }
        Insert: {
          address_id?: number | null
          id?: number
          is_default?: boolean | null
          label: string
          user_id?: number | null
        }
        Update: {
          address_id?: number | null
          id?: number
          is_default?: boolean | null
          label?: string
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_address_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "address"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_address_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_credentials: {
        Row: {
          email: string
          enabled: boolean
          id: number
          password: string
        }
        Insert: {
          email: string
          enabled?: boolean
          id?: number
          password: string
        }
        Update: {
          email?: string
          enabled?: boolean
          id?: number
          password?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          birth_date: string
          cpf: string
          email: string
          full_name: string
          id: number
          is_active: boolean | null
          is_blocked: boolean | null
          last_login: string | null
          phone_number: string
          registered: boolean | null
          supermarket_chain_id: number | null
          user_role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          birth_date: string
          cpf: string
          email: string
          full_name: string
          id?: number
          is_active?: boolean | null
          is_blocked?: boolean | null
          last_login?: string | null
          phone_number: string
          registered?: boolean | null
          supermarket_chain_id?: number | null
          user_role?: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          birth_date?: string
          cpf?: string
          email?: string
          full_name?: string
          id?: number
          is_active?: boolean | null
          is_blocked?: boolean | null
          last_login?: string | null
          phone_number?: string
          registered?: boolean | null
          supermarket_chain_id?: number | null
          user_role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: [
          {
            foreignKeyName: "users_supermarket_chain_id_fkey"
            columns: ["supermarket_chain_id"]
            isOneToOne: false
            referencedRelation: "supermarket_chain"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      product_with_inventory: {
        Row: {
          branch_id: number | null
          branch_product_id: number | null
          brand: string | null
          category_id: number | null
          category_title: string | null
          code: string | null
          description: string | null
          image_url: string | null
          is_available: boolean | null
          is_promotion: boolean | null
          name: string | null
          product_id: number | null
          sell_price: number | null
          stock_level: Database["public"]["Enums"]["stock_level"] | null
          stock_quantity: number | null
          unit: string | null
          units_sold: number | null
        }
        Relationships: [
          {
            foreignKeyName: "branch_product_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      get_products_for_branch: {
        Args: { bid: number }
        Returns: {
          branch_id: number | null
          branch_product_id: number | null
          brand: string | null
          category_id: number | null
          category_title: string | null
          code: string | null
          description: string | null
          image_url: string | null
          is_available: boolean | null
          is_promotion: boolean | null
          name: string | null
          product_id: number | null
          sell_price: number | null
          stock_level: Database["public"]["Enums"]["stock_level"] | null
          stock_quantity: number | null
          unit: string | null
          units_sold: number | null
        }[]
        SetofOptions: {
          from: "*"
          to: "product_with_inventory"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_supermarkets_with_users: { Args: never; Returns: Json }
      update_cart_item_quantity: {
        Args: {
          order_id_input: number
          product_id_input: number
          quantity_input: number
        }
        Returns: void
      }
      get_or_create_current_order: {
        Args: {
          user_id_input: number
          branch_id_input: number
        }
        Returns: number
      }
      get_order_items_by_id: {
        Args: {
          order_id_input: number
        }
        Returns: {
          order_id: number
          product_id: number
          quantity: number
          unit_price: number
          subtotal: number
          product_name: string
          product_image: string | null
          product_unit: string
        }[]
      }
      sync_cart: {
        Args: {
          order_id_input: number
          items_input: { product_id: number; quantity: number }[]
        }
        Returns: void
      }
    }
    Enums: {
      order_status: "PENDING" | "PAID" | "CANCELED" | "FINISHED" | "CURRENT"
      payment_status: "PENDING" | "CONFIRMED" | "CANCELED"
      product_category: "FOOD" | "DRINKS" | "CLEANING" | "HYGIENE" | "OTHER"
      stock_level: "LOW" | "MEDIUM" | "HIGH"
      user_role: "ADMIN" | "CUSTOMER" | "MANAGER"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      order_status: ["PENDING", "PAID", "CANCELED", "FINISHED", "CURRENT"],
      payment_status: ["PENDING", "CONFIRMED", "CANCELED"],
      product_category: ["FOOD", "DRINKS", "CLEANING", "HYGIENE", "OTHER"],
      stock_level: ["LOW", "MEDIUM", "HIGH"],
      user_role: ["ADMIN", "CUSTOMER", "MANAGER"],
    },
  },
} as const