import { useIdleLogout } from './IdleLogout'
import { useClerk } from '@clerk/clerk-react'

export default function SessionGuard({ children }: { children: React.ReactNode }) {
  const { warningActive, secondsLeft, resetTimer } = useIdleLogout()
  const { signOut } = useClerk()

  return (
    <>
      {children}

      {warningActive && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <p style={styles.title}>Still there?</p>
            <p style={styles.body}>
              Your session will expire in{' '}
              <span style={styles.countdown}>{secondsLeft}s</span>{' '}
              due to inactivity.
            </p>
            <div style={styles.actions}>
              <button style={styles.btnPrimary} onClick={resetTimer}>
                Stay signed in
              </button>
              <button style={styles.btnSecondary} onClick={() => signOut()}>
                Sign out now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position:        'fixed',
    inset:           0,
    background:      'rgba(0, 0, 0, 0.5)',
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
    zIndex:          9999,
  },
  modal: {
    background:    '#fff',
    borderRadius:  '12px',
    padding:       '2rem',
    maxWidth:      '380px',
    width:         '90%',
    textAlign:     'center',
  },
  title: {
    fontSize:    '1.2rem',
    fontWeight:  600,
    marginBottom: '0.5rem',
  },
  body: {
    fontSize:     '0.95rem',
    color:        '#555',
    marginBottom: '1.5rem',
  },
  countdown: {
    fontWeight:  700,
    color:       '#e53e3e',
  },
  actions: {
    display:   'flex',
    gap:       '0.75rem',
    justifyContent: 'center',
  },
  btnPrimary: {
    padding:       '0.6rem 1.2rem',
    background:    '#2563eb',
    color:         '#fff',
    border:        'none',
    borderRadius:  '8px',
    cursor:        'pointer',
    fontWeight:    600,
  },
  btnSecondary: {
    padding:       '0.6rem 1.2rem',
    background:    'transparent',
    color:         '#555',
    border:        '1px solid #ddd',
    borderRadius:  '8px',
    cursor:        'pointer',
  },
}