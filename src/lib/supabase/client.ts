import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import { browser } from '$app/environment';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || 'https://demo-opengarden.supabase.co';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-anon-key';

export function isSupabaseConfigured(): boolean {
  return (
    !!supabaseUrl && 
    !supabaseUrl.includes('demo-opengarden') && 
    !supabaseUrl.includes('placeholder') && 
    supabaseUrl.startsWith('https://') && 
    !!supabaseAnonKey && 
    !supabaseAnonKey.includes('demo-anon-key') &&
    !supabaseAnonKey.includes('placeholder')
  );
}

let clientInstance: SupabaseClient | null = null;

export function createClient(): SupabaseClient {
  if (!browser) {
    // Return dummy client during SSR to prevent 500 server errors on Vercel
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async () => ({ data: {}, error: null }),
        signUp: async () => ({ data: {}, error: null }),
        signOut: async () => ({ error: null }),
        signInWithOAuth: async () => ({ data: {}, error: null })
      }
    } as unknown as SupabaseClient;
  }

  if (!clientInstance) {
    clientInstance = createBrowserClient(supabaseUrl, supabaseAnonKey);
  }
  return clientInstance;
}

export const supabase = createClient();
