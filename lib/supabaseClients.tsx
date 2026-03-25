import { createClient } from '@supabase/supabase-js'
import { useSession } from '@clerk/clerk-react'
import { useMemo } from 'react'

const SUPABASE_URL      = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase env variables')
}

/**
 * useSupabase()
 * Returns a Supabase client that automatically injects the
 * current Clerk session JWT on every request.
 * RLS policies can then trust auth.uid() === Clerk user_id.
 *
 * Usage:
 *   const db = useSupabase()
 *   const { data } = await db.from('profiles').select('*').single()
 */
export function useSupabase() {
  const { session } = useSession()

  return useMemo(() => {
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: {
        fetch: async (url, options = {}) => {
          // Grab a fresh Clerk JWT before every request
          const token = await session?.getToken({ template: 'supabase' })

          const headers = new Headers(options.headers)
          if (token) headers.set('Authorization', `Bearer ${token}`)

          return fetch(url, { ...options, headers })
        },
      },
    })
  }, [session])
}
