import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
export default function Signin() {
  return (
      <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '1rem',
    }}>
      <ClerkSignIn
        routing="virtual"
        signUpUrl="/crearcuenta"
        fallbackRedirectUrl="/cambia"
      />
    </div>
);}
