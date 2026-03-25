import { Link } from 'react-router-dom'
import { useAuth, useUser, SignOutButton } from '@clerk/clerk-react'

export default function IANavigation() {
  const { isSignedIn, isLoaded } = useAuth()
  const { user } = useUser()

  return (
    <div className="top-nav d-flex align-items-center justify-content-between px-4">
      <div className="fw-bold">
        <Link to="/cambia">
          <img src="/images/iaLogo.png" alt="MyBank" />
        </Link>
      </div>

      <div className="d-flex gap-4 align-items-center">
        <Link to="/cambia">Casa de Cambio</Link>
        <Link to="/envivo">En Vivo</Link>
        <Link to="/masservicios">...</Link>
        <Link to="/idioma">Idioma</Link>
        <Link to="/ayuda">Ayuda</Link>

        {!isLoaded ? null : isSignedIn ? (
          <>
            <Link to="/usuario">
              {user?.firstName ?? 'Mi cuenta'}
            </Link>
            <SignOutButton redirectUrl="/cambia">
              <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                Salir
              </button>
            </SignOutButton>
          </>
        ) : (
          <>
            <Link to="/sesion">Ingresa</Link>
            <Link to="/crearcuenta">Únete</Link>
          </>
        )}
      </div>
    </div>
  )
}