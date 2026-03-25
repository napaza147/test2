const EDGE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/auth-rate-limit`

interface CheckResult {
  allowed:  boolean
  error?:   string
}

/**
 * checkRateLimit(email)
 * Call this BEFORE passing credentials to Clerk.
 * If blocked, show the error to the user and skip the Clerk call.
 *
 * After Clerk responds, call recordResult(email, success)
 * so the server can track whether it was a real failure.
 */
export async function checkRateLimit(email: string): Promise<CheckResult> {
  try {
    const res = await fetch(EDGE_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email }),
    })

    if (res.status === 429) {
      const data = await res.json()
      return { allowed: false, error: data.error }
    }

    return { allowed: true }
  } catch {
    // If Edge Function is unreachable, fail open (don't block the user)
    console.warn('Rate limit check failed — allowing request')
    return { allowed: true }
  }
}

export async function recordResult(email: string, success: boolean): Promise<void> {
  try {
    await fetch(EDGE_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email, success }),
    })
  } catch {
    // Non-critical — don't surface to user
  }
}
