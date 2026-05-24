import React from 'react'

const BasketPage = () => {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 20px',
        background: 'radial-gradient(circle at top, #1a1f2b 0%, #0b0d13 55%, #050608 100%)',
        color: '#e6edf3',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      }}
    >
      <section style={{ maxWidth: 720, width: '100%' }}>
        <p style={{ letterSpacing: '0.2em', color: '#7aa2ff', marginBottom: 8 }}>
          ARCHIVE / BASKET / SIGNAL
        </p>
        <h1 style={{ fontSize: 32, margin: '0 0 18px' }}>A Quiet Locker</h1>
        <p style={{ opacity: 0.85, marginBottom: 24 }}>
          A single answer waits here. Read slowly. First things first.
        </p>
        <div
          style={{
            border: '1px solid rgba(122, 162, 255, 0.35)',
            borderRadius: 14,
            padding: 24,
            background: 'rgba(12, 15, 22, 0.65)',
            boxShadow: '0 0 40px rgba(15, 25, 45, 0.35)',
          }}
        >
          <p style={{ margin: '0 0 16px', color: '#b6c2d9' }}>
            The lock listens to beginnings:
          </p>
          <div style={{ lineHeight: 1.7, fontSize: 18 }}>
            <div>Veils part when the room goes still.</div>
            <div>Oaths keep the unwritten map safe.</div>
            <div>Riddles breathe between the ticks.</div>
            <div>Trails fold where mirrors meet.</div>
            <div>Echoes choose the boldest step.</div>
            <div>X marks the whispering heart.</div>
          </div>
        </div>
        <p style={{ marginTop: 22, opacity: 0.75 }}>
          Return when the letters align.
        </p>
      </section>
    </main>
  )
}

export default BasketPage