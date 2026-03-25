import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ClerkProvider } from '@clerk/clerk-react'

import SessionGuard from './features/Auth/SessionGuard'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key for Clerk. Please set VITE_CLERK_PUBLISHABLE_KEY in your .env file.");
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <SessionGuard>
        <App />
      </SessionGuard>
    </ClerkProvider>
  </React.StrictMode>,
)