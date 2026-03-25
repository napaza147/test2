import { useState, useRef, useCallback } from 'react'

const MAX_ATTEMPTS  = 5
const BASE_DELAY_MS = 30_000  // 30s base — doubles each time

interface RateLimitState {
  isBlocked:     boolean
  blockedUntil:  number | null  // timestamp ms
  attempts:      number
}

export function useAuthRateLimit() {
  const [state, setState] = useState<RateLimitState>({
    isBlocked:    false,
    blockedUntil: null,
    attempts:     0,
  })
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const secondsLeft = state.blockedUntil
    ? Math.max(0, Math.ceil((state.blockedUntil - Date.now()) / 1000))
    : 0

  const recordFailure = useCallback(() => {
    setState(prev => {
      const next = prev.attempts + 1

      if (next < MAX_ATTEMPTS) return { ...prev, attempts: next }

      // Exponential backoff: 30s, 60s, 120s, 240s…
      const backoff   = BASE_DELAY_MS * Math.pow(2, next - MAX_ATTEMPTS)
      const until     = Date.now() + backoff

      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        setState(s => ({ ...s, isBlocked: false, blockedUntil: null }))
      }, backoff)

      return { isBlocked: true, blockedUntil: until, attempts: next }
    })
  }, [])

  const recordSuccess = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setState({ isBlocked: false, blockedUntil: null, attempts: 0 })
  }, [])

  return { isBlocked: state.isBlocked, secondsLeft, recordFailure, recordSuccess }
}