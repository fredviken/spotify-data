import type { SupabaseClient as SupabaseClientType } from "@supabase/supabase-js";
import type { Database } from "./database";

export type SupabaseClient = SupabaseClientType<Database>