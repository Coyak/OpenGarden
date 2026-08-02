import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || '';
const rawKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export function isSupabaseConfigured(): boolean {
  return (
    !!rawUrl && 
    !rawUrl.includes('placeholder') && 
    rawUrl.startsWith('https://') && 
    !!rawKey && 
    !rawKey.includes('placeholder')
  );
}

const supabaseUrl = isSupabaseConfigured() ? rawUrl : 'https://demo-opengarden.supabase.co';
const supabaseAnonKey = isSupabaseConfigured() ? rawKey : 'demo-anon-key';

export function createClient(): SupabaseClient {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = createClient();
