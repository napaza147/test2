import { SignUp as ClerkSignUp } from "@clerk/clerk-react";

export default function Signup() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '1rem',
    }}>
      <ClerkSignUp
        routing="virtual"
        signInUrl="/sesion"
        fallbackRedirectUrl="/cambia"
      />
    </div>
);}
