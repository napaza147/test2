import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const MAX_ATTEMPTS   = 5
const WINDOW_SECONDS = 900   // 15-minute sliding window

Deno.serve(async (req: Request) => {
  // Only accept POST
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('cf-connecting-ip') ??
    'unknown'

  const body = await req.json().catch(() => ({}))
  const email: string | undefined = body?.email?.toLowerCase().trim()

  if (!email) {
    return new Response(JSON.stringify({ error: 'email required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Use service-role key — this runs server-side only, never exposed to client
  const db = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const windowStart = new Date(Date.now() - WINDOW_SECONDS * 1000).toISOString()
  const key         = `${ip}:${email}`

  // Count recent failed attempts for this IP+email combo
  const { count } = await db
    .from('auth_attempts')
    .select('*', { count: 'exact', head: true })
    .eq('key', key)
    .eq('success', false)
    .gte('created_at', windowStart)

  if ((count ?? 0) >= MAX_ATTEMPTS) {
    return new Response(
      JSON.stringify({
        error:   'Too many failed attempts. Please wait 15 minutes.',
        blocked: true,
      }),
      {
        status:  429,
        headers: {
          'Content-Type':  'application/json',
          'Retry-After':   String(WINDOW_SECONDS),
        },
      }
    )
  }

  // Record this attempt (success flag updated by client after Clerk responds)
  await db.from('auth_attempts').insert({
    key,
    ip,
    email,
    success: body?.success ?? false,
  })

  return new Response(JSON.stringify({ allowed: true }), {
    status:  200,
    headers: { 'Content-Type': 'application/json' },
  })
})