import { useEffect, useRef, useState, useCallback } from 'react'
import { useClerk, useAuth } from '@clerk/clerk-react'

const IDLE_TIMEOUT_MS  = 30000 // 10 minutes
const WARNING_BEFORE_MS = 10000       // warn 60s before logout

const ACTIVITY_EVENTS = ['mousemove', 'keydown', 'click', 'touchstart', 'scroll']

export function useIdleLogout() {
  const { signOut } = useClerk()
  const { isSignedIn } = useAuth()

  const [warningActive, setWarningActive] = useState(false)
  const [secondsLeft, setSecondsLeft]     = useState(60)

  const idleTimer    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const warnTimer    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearAll = useCallback(() => {
    if (idleTimer.current)    clearTimeout(idleTimer.current)
    if (warnTimer.current)    clearTimeout(warnTimer.current)
    if (countdownRef.current) clearInterval(countdownRef.current)
  }, [])

  const resetTimer = useCallback(() => {
    clearAll()
    setWarningActive(false)
    setSecondsLeft(60)

    if (!isSignedIn) return

    // Show warning 60s before the deadline
    warnTimer.current = setTimeout(() => {
      setWarningActive(true)
      setSecondsLeft(60)

      countdownRef.current = setInterval(() => {
        setSecondsLeft(s => s - 1)
      }, 1000)
    }, IDLE_TIMEOUT_MS - WARNING_BEFORE_MS)

    // Hard logout at deadline
    idleTimer.current = setTimeout(() => {
      clearAll()
      signOut()
    }, IDLE_TIMEOUT_MS)
  }, [isSignedIn, clearAll, signOut])

  // Boot the timer and attach activity listeners
  useEffect(() => {
    if (!isSignedIn) { clearAll(); return }

    resetTimer()
    ACTIVITY_EVENTS.forEach(e => window.addEventListener(e, resetTimer, { passive: true }))

    return () => {
      clearAll()
      ACTIVITY_EVENTS.forEach(e => window.removeEventListener(e, resetTimer))
    }
  }, [isSignedIn, resetTimer, clearAll])

  return { warningActive, secondsLeft, resetTimer }
}