export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      album_artists: {
        Row: {
          album_id: string
          artist_id: string
          created_at: string
        }
        Insert: {
          album_id: string
          artist_id: string
          created_at?: string
        }
        Update: {
          album_id?: string
          artist_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "album_artists_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "albums"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "album_artists_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
        ]
      }
      album_tracks: {
        Row: {
          album_id: string
          created_at: string
          position: number | null
          track_id: string
        }
        Insert: {
          album_id: string
          created_at?: string
          position?: number | null
          track_id: string
        }
        Update: {
          album_id?: string
          created_at?: string
          position?: number | null
          track_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "album_tracks_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "albums"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "album_tracks_track_id_fkey"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      albums: {
        Row: {
          cover_image: string | null
          created_at: string
          id: string
          name: string
          release_date: string | null
          spotify_id: string
          type: Database["public"]["Enums"]["album_type"] | null
        }
        Insert: {
          cover_image?: string | null
          created_at?: string
          id?: string
          name: string
          release_date?: string | null
          spotify_id: string
          type?: Database["public"]["Enums"]["album_type"] | null
        }
        Update: {
          cover_image?: string | null
          created_at?: string
          id?: string
          name?: string
          release_date?: string | null
          spotify_id?: string
          type?: Database["public"]["Enums"]["album_type"] | null
        }
        Relationships: []
      }
      artists: {
        Row: {
          avatar_image: string | null
          created_at: string
          id: string
          name: string
          spotify_id: string
        }
        Insert: {
          avatar_image?: string | null
          created_at?: string
          id?: string
          name: string
          spotify_id: string
        }
        Update: {
          avatar_image?: string | null
          created_at?: string
          id?: string
          name?: string
          spotify_id?: string
        }
        Relationships: []
      }
      stream_counts: {
        Row: {
          created_at: string
          date: string
          id: string
          is_missing: boolean
          missing_reason: string | null
          streams: number | null
          track_id: string | null
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          is_missing?: boolean
          missing_reason?: string | null
          streams?: number | null
          track_id?: string | null
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          is_missing?: boolean
          missing_reason?: string | null
          streams?: number | null
          track_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stream_counts_track_id_fkey"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      track_artists: {
        Row: {
          artist_id: string
          created_at: string
          track_id: string
        }
        Insert: {
          artist_id: string
          created_at?: string
          track_id: string
        }
        Update: {
          artist_id?: string
          created_at?: string
          track_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "track_artists_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "track_artists_track_id_fkey"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      tracks: {
        Row: {
          cover_image: string | null
          created_at: string
          id: string
          name: string
          spotify_id: string
        }
        Insert: {
          cover_image?: string | null
          created_at?: string
          id?: string
          name: string
          spotify_id: string
        }
        Update: {
          cover_image?: string | null
          created_at?: string
          id?: string
          name?: string
          spotify_id?: string
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
      album_type: "ALBUM" | "SINGLE" | "COMPILATION"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

