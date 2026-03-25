import { useAuth } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'

interface Props {
  children: React.ReactNode
  redirectTo?: string
}

export default function ProtectedRoute({ children, redirectTo = '/sesion' }: Props) {
  const { isLoaded, isSignedIn } = useAuth()

  // Still loading auth state — render nothing to avoid flash
  if (!isLoaded) return null

  // Not authenticated — redirect to sign in
  if (!isSignedIn) return <Navigate to={redirectTo} replace />

  return <>{children}</>
}
