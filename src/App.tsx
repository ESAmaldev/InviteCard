import { useEffect, useState, useRef } from 'react'
import heroImg from './assets/logoTemp.jpg'
import './App.css'
import Layer1 from './components/Layer1.tsx'

function App() {
  const [date] = useState(new Date('2026-06-14'))
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Autoplay on mount — browsers require muted for guaranteed autoplay,
  // so we start muted, then immediately unmute. If the browser blocks it
  // entirely, a single click / tap anywhere will start playback.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.muted = true
    const playPromise = audio.play()

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Unmute after autoplay succeeds
          audio.muted = false
          setIsMuted(false)
        })
        .catch(() => {
          // Autoplay blocked — wait for first user interaction
          const unlock = () => {
            audio.muted = false
            audio.play()
            setIsMuted(false)
            document.removeEventListener('click', unlock)
            document.removeEventListener('touchstart', unlock)
          }
          document.addEventListener('click', unlock, { once: true })
          document.addEventListener('touchstart', unlock, { once: true })
        })
    }
  }, [])

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = date.getTime() - now.getTime()
      if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }
    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [date])

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
      setIsMuted(audioRef.current.muted)
    }
  }

  const formatTime = (value: number) => String(value).padStart(2, '0')

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
  ]

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="./assets/Pachavellam.mp3" type="audio/mpeg" />
      </audio>

      <Layer1 />

      {/* Mute toggle — fixed top-right */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 100,
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '50%',
          width: '2.5rem',
          height: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '1.1rem',
          transition: 'background 0.2s',
        }}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>

      <section id="center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem', padding: '2rem 1rem 4rem' }}>

        {/* Hero image with glow ring */}
        <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            position: 'absolute',
            inset: '-6px',
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, #f9a8d4, #c084fc, #818cf8, #38bdf8, #34d399, #f9a8d4)',
            animation: 'spin 6s linear infinite',
          }} />
          <img
            src={heroImg}
            width={170}
            height={179}
            alt="Event logo"
            style={{
              position: 'relative',
              borderRadius: '50%',
              border: '4px solid white',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>

        {/* Countdown */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ color:"yellow" ,margin: '0 0 1rem', fontSize: '1.85rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Countdown to June 14, 2026
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {units.map(({ label, value }) => (
              <div
                key={label}
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: '1rem',
                  padding: '1rem 1.25rem',
                  minWidth: '72px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '2.2rem', fontWeight: 700, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                  {formatTime(value)}
                </div>
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.55, marginTop: '0.3rem' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div style={{
          borderRadius: '1.25rem',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
          border: '1px solid rgba(255,255,255,0.15)',
          width: '100%',
          maxWidth: '460px',
        }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1701.9829009800274!2d76.66996650250304!3d9.699743274799552!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07cd0069a31473%3A0x68ffc8c4302b312!2sBase%20Eleven%20Convention%20Centre%20-%20Wedding%2C%20Event%2C%20receptions%2C%20Parties!5e0!3m2!1sen!2suk!4v1776461833122!5m2!1sen!2suk"
            width="100%"
            height="260"
            style={{ display: 'block', border: 0 }}
            loading="lazy"
            title="Venue location"
          />
        </div>
      </section>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}

export default App