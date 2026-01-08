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
      address: {
        Row: {
          id: number
          street: string
          number: string | null
          neighborhood: string
          city: string
          state: string
          cep: string
          complement: string | null
          reference: string | null
          latitude: number | null
          longitude: number | null
          created_at: string
        }
        Insert: {
          id?: number
          street: string
          number?: string | null
          neighborhood: string
          city: string
          state: string
          cep: string
          complement?: string | null
          reference?: string | null
          latitude?: number | null
          longitude?: number | null
          created_at?: string
        }
        Update: {
          id?: number
          street?: string
          number?: string | null
          neighborhood?: string
          city?: string
          state?: string
          cep?: string
          complement?: string | null
          reference?: string | null
          latitude?: number | null
          longitude?: number | null
          created_at?: string
        }
        Relationships: []
      }
      branch: {
        Row: {
          id: number
          public_id: string
          supermarket_chain_id: number | null
          address_id: number | null
          name: string
          email: string | null
          phone_number: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          public_id?: string
          supermarket_chain_id?: number | null
          address_id?: number | null
          name: string
          email?: string | null
          phone_number?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          public_id?: string
          supermarket_chain_id?: number | null
          address_id?: number | null
          name?: string
          email?: string | null
          phone_number?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
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
          }
        ]
      }
      branch_product_config: {
        Row: {
          id: number
          branch_id: number | null
          product_id: number | null
          sell_price: number
          min_stock_limit: number | null
          is_available: boolean | null
          is_promotion: boolean | null
          stock_quantity: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          branch_id?: number | null
          product_id?: number | null
          sell_price?: number
          min_stock_limit?: number | null
          is_available?: boolean | null
          is_promotion?: boolean | null
          stock_quantity?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          branch_id?: number | null
          product_id?: number | null
          sell_price?: number
          min_stock_limit?: number | null
          is_available?: boolean | null
          is_promotion?: boolean | null
          stock_quantity?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "branch_product_config_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "branch_product_config_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          }
        ]
      }
      category: {
        Row: {
          id: number
          title: string
          slug: string | null
          description: string | null
          icon: string | null
          display_order: number | null
          is_active: boolean | null
          created_at: string
        }
        Insert: {
          id?: number
          title: string
          slug?: never
          description?: string | null
          icon?: string | null
          display_order?: number | null
          is_active?: boolean | null
          created_at?: string
        }
        Update: {
          id?: number
          title?: string
          slug?: never
          description?: string | null
          icon?: string | null
          display_order?: number | null
          is_active?: boolean | null
          created_at?: string
        }
        Relationships: []
      }
      order_product: {
        Row: {
          id: number
          order_id: number | null
          product_id: number | null
          qtd: number
          unit_price: number
          subtotal: number
        }
        Insert: {
          id?: number
          order_id?: number | null
          product_id?: number | null
          qtd: number
          unit_price: number
          subtotal: number
        }
        Update: {
          id?: number
          order_id?: number | null
          product_id?: number | null
          qtd?: number
          unit_price?: number
          subtotal?: number
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
          }
        ]
      }
      orders: {
        Row: {
          id: number
          user_id: string
          branch_id: number
          address_id: number | null
          route_id: number | null
          status: Database["public"]["Enums"]["order_status"] | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          order_number: number | null
          total_price: number | null
          delivery_fee: number | null
          discount: number | null
          created_at: string
          updated_at: string
          finished_at: string | null
        }
        Insert: {
          id?: number
          user_id: string
          branch_id: number
          address_id?: number | null
          route_id?: number | null
          status?: Database["public"]["Enums"]["order_status"] | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          order_number?: number | null
          total_price?: number | null
          delivery_fee?: number | null
          discount?: number | null
          created_at?: string
          updated_at?: string
          finished_at?: string | null
        }
        Update: {
          id?: number
          user_id?: string
          branch_id?: number
          address_id?: number | null
          route_id?: number | null
          status?: Database["public"]["Enums"]["order_status"] | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          order_number?: number | null
          total_price?: number | null
          delivery_fee?: number | null
          discount?: number | null
          created_at?: string
          updated_at?: string
          finished_at?: string | null
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
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      product: {
        Row: {
          id: number
          category_id: number | null
          name: string
          description: string | null
          image_url: string | null
          unit: string | null
          code: string | null
          brand: string | null
          is_active: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          category_id?: number | null
          name: string
          description?: string | null
          image_url?: string | null
          unit?: string | null
          code?: string | null
          brand?: string | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          category_id?: number | null
          name?: string
          description?: string | null
          image_url?: string | null
          unit?: string | null
          code?: string | null
          brand?: string | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          }
        ]
      }
      product_batch: {
        Row: {
          id: number
          branch_product_config_id: number | null
          batch_code: string | null
          quantity: number
          initial_quantity: number
          cost_price: number
          expiration_date: string | null
          arrival_date: string | null
          supplier: string | null
          status: Database["public"]["Enums"]["batch_status"] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          branch_product_config_id?: number | null
          batch_code?: string | null
          quantity?: number
          initial_quantity: number
          cost_price: number
          expiration_date?: string | null
          arrival_date?: string | null
          supplier?: string | null
          status?: Database["public"]["Enums"]["batch_status"] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          branch_product_config_id?: number | null
          batch_code?: string | null
          quantity?: number
          initial_quantity?: number
          cost_price?: number
          expiration_date?: string | null
          arrival_date?: string | null
          supplier?: string | null
          status?: Database["public"]["Enums"]["batch_status"] | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_batch_branch_product_config_id_fkey"
            columns: ["branch_product_config_id"]
            isOneToOne: false
            referencedRelation: "branch_product_config"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          supermarket_chain_id: number | null
          full_name: string
          phone_number: string | null
          cpf: string | null
          birth_date: string | null
          user_role: Database["public"]["Enums"]["user_role"] | null
          is_active: boolean | null
          is_blocked: boolean | null
          last_login: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          supermarket_chain_id?: number | null
          full_name: string
          phone_number?: string | null
          cpf?: string | null
          birth_date?: string | null
          user_role?: Database["public"]["Enums"]["user_role"] | null
          is_active?: boolean | null
          is_blocked?: boolean | null
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          supermarket_chain_id?: number | null
          full_name?: string
          phone_number?: string | null
          cpf?: string | null
          birth_date?: string | null
          user_role?: Database["public"]["Enums"]["user_role"] | null
          is_active?: boolean | null
          is_blocked?: boolean | null
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_supermarket_chain_id_fkey"
            columns: ["supermarket_chain_id"]
            isOneToOne: false
            referencedRelation: "supermarket_chain"
            referencedColumns: ["id"]
          }
        ]
      }
      route: {
        Row: {
          id: number
          branch_id: number | null
          driver_name: string | null
          estimated_time: number | null
          estimated_distance: number | null
          actual_time: number | null
          status: string | null
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: number
          branch_id?: number | null
          driver_name?: string | null
          estimated_time?: number | null
          estimated_distance?: number | null
          actual_time?: number | null
          status?: string | null
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: number
          branch_id?: number | null
          driver_name?: string | null
          estimated_time?: number | null
          estimated_distance?: number | null
          actual_time?: number | null
          status?: string | null
          created_at?: string
          completed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "route_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          }
        ]
      }
      supermarket_chain: {
        Row: {
          id: number
          name: string
          cnpj: string
          logo_url: string | null
          minimum_order_value: number | null
          delivery_end_time: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          cnpj: string
          logo_url?: string | null
          minimum_order_value?: number | null
          delivery_end_time?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          cnpj?: string
          logo_url?: string | null
          minimum_order_value?: number | null
          delivery_end_time?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_address: {
        Row: {
          id: number
          user_id: string | null
          address_id: number | null
          label: string
          is_default: boolean | null
          created_at: string
        }
        Insert: {
          id?: number
          user_id?: string | null
          address_id?: number | null
          label: string
          is_default?: boolean | null
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string | null
          address_id?: number | null
          label?: string
          is_default?: boolean | null
          created_at?: string
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
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_products_for_branch: {
        Args: { bid: number }
        Returns: {
          product_id: number
          name: string
          unit: string
          sell_price: number
          category_title: string
          category_id: number
          image_url: string
          is_available: boolean
          stock_quantity: number
        }[]
      }
      get_orders_with_users: {
        Args: { bid: number }
        Returns: {
          id: number
          user_id: string
          fullName: string
          phoneNumber: string
          status: Database["public"]["Enums"]["order_status"]
          totalPrice: number
          dAt: string
        }[]
      }
      get_order_details_by_id: {
        Args: { order_id_input: number }
        Returns: {
          order_id: number
          status: Database["public"]["Enums"]["order_status"]
          payment_status: Database["public"]["Enums"]["payment_status"]
          order_number: number
          created_at: string
          finished_at: string
          total_price: number
          delivery_fee: number
          discount: number
          customer_name: string
          customer_phone: string
          street: string
          address_number: string
          neighborhood: string
          city: string
          state: string
          complement: string
          reference: string
          market_name: string
          market_logo: string
          branch_name: string
        }[]
      }
      get_order_items_by_id: {
        Args: { order_id_input: number }
        Returns: {
          order_id: number
          product_id: number
          quantity: number
          unit_price: number
          subtotal: number
          product_name: string
          product_image: string
          product_unit: string
        }[]
      }
      get_supermarket_with_filials: {
        Args: { chain_id_input: number }
        Returns: {
          chain_id: number
          chain_name: string
          chain_logo: string
          chain_cnpj: string
          branch_id: number
          branch_name: string
          branch_phone: string
          branch_email: string
          street: string
          number: string
          neighborhood: string
          city: string
          state: string
          cep: string
        }[]
      }
      get_branch_inventory_summary: {
        Args: { branch_id_input: number }
        Returns: {
          config_id: number
          branch_id: number
          product_id: number
          sell_price: number
          min_stock_limit: number
          is_available: boolean
          product_name: string
          product_code: string
          image_url: string
          unit: string
          category_title: string
          total_stock: number
          next_expiration: string
          average_cost: number
        }[]
      }
      get_product_batches: {
        Args: { config_id_input: number }
        Returns: {
          id: number
          branch_product_config_id: number
          batch_code: string
          quantity: number
          initial_quantity: number
          cost_price: number
          expiration_date: string
          arrival_date: string
          supplier: string
          status: Database["public"]["Enums"]["batch_status"]
        }[]
      }
      get_supermarket_users: {
        Args: { chain_id_input: number }
        Returns: {
          id: string
          full_name: string
          email: string
          phone_number: string
          user_role: Database["public"]["Enums"]["user_role"]
          is_active: boolean
          is_blocked: boolean
          last_login: string
          supermarket_chain_id: number
          created_at: string
        }[]
      }
      get_supermarket_products: {
        Args: { chain_id_input: number }
        Returns: {
          product_id: number
          code: string
          name: string
          description: string
          image_url: string
          unit: string
          units_sold: number
          category_title: string
          total_stock_quantity: number
          min_price: number
          max_price: number
        }[]
      }
      get_pending_routing_orders: {
        Args: { branch_id_input: number }
        Returns: {
          order_id: number
          order_number: number
          status: Database["public"]["Enums"]["order_status"]
          total_price: number
          created_at: string
          branch_id: number
          customer_name: string
          street: string
          address_number: string
          neighborhood: string
          city: string
          latitude: number
          longitude: number
        }[]
      }
      get_active_routes_summary: {
        Args: Record<string, never>
        Returns: {
          route_id: number
          estimated_time: number
          estimated_distance: number
          actual_time: number
          deliveries_count: number
          route_status: string
          neighborhoods: string
        }[]
      }
      get_route_details: {
        Args: { route_id_input: number }
        Returns: {
          order_id: number
          order_number: number
          status: Database["public"]["Enums"]["order_status"]
          total_price: number
          created_at: string
          branch_id: number
          customer_name: string
          street: string
          address_number: string
          neighborhood: string
          city: string
          latitude: number
          longitude: number
        }[]
      }
      get_or_create_current_order: {
        Args: {
          user_id_input: string
          branch_id_input: number
        }
        Returns: number
      }
      sync_cart: {
        Args: {
          order_id_input: number
          items_input: Json
        }
        Returns: void
      }
      update_cart_item_quantity: {
        Args: {
          order_id_input: number
          product_id_input: number
          quantity_input: number
        }
        Returns: void
      }
    }
    Enums: {
      batch_status: "ACTIVE" | "CONSUMED" | "EXPIRED"
      order_status: "CURRENT" | "PAID" | "EM_PRODUCAO" | "A_CAMINHO" | "DELIVERED" | "FINISHED" | "CANCELED"
      payment_status: "PENDING" | "CONFIRMED" | "CANCELED" | "REFUNDED"
      user_role: "ADMIN" | "MANAGER" | "STAFF" | "CUSTOMER"
    }
  }
}

export type Tables<
  T extends keyof Database['public']['Tables']
> = Database['public']['Tables'][T]['Row']

export type Enums<
  T extends keyof Database['public']['Enums']
> = Database['public']['Enums'][T]