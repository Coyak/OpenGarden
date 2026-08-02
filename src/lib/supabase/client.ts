import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export function isSupabaseConfigured(): boolean {
  return (
    !!supabaseUrl && 
    !supabaseUrl.includes('placeholder') && 
    supabaseUrl.startsWith('https://') && 
    !!supabaseAnonKey && 
    !supabaseAnonKey.includes('placeholder')
  );
}

export function createClient(): SupabaseClient {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = createClient();
