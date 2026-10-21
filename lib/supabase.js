import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey || !supabaseUrl.startsWith('http')) {
    // Return a mock client during build or when env vars aren't set yet
    return {
      auth: {
        signUp: async () => ({ data: null, error: { message: 'Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local' } }),
        signInWithPassword: async () => ({ error: { message: 'Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local' } }),
        signInWithOAuth: async () => ({ error: { message: 'Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local' } }),
        signOut: async () => ({}),
        getUser: async () => ({ data: { user: null } }),
      },
    };
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}
