import { useEffect, useState, useRef } from 'react'
import heroImg from './assets/logoTemp.jpg'
import bgMusic from './assets/Pachavellam.mp3'
import './App.css'
import Layer1 from './components/Layer1.tsx'

function App() {
  const [date] = useState(new Date('2026-06-28'))
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
  // entirely, wait for click, scroll, or touch to start playback.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const unlock = () => {
      audio.muted = false
      audio.play().then(() => {
        setIsMuted(false)
        document.removeEventListener('click', unlock)
        document.removeEventListener('touchstart', unlock)
        window.removeEventListener('scroll', unlock)
      }).catch(() => {
        audio.muted = true
      })
    }

    audio.muted = true
    const playPromise = audio.play()

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          audio.muted = false
          setIsMuted(false)
        })
        .catch(() => {
          document.addEventListener('click', unlock)
          document.addEventListener('touchstart', unlock)
          window.addEventListener('scroll', unlock)
        })
    }

    return () => {
      document.removeEventListener('click', unlock)
      document.removeEventListener('touchstart', unlock)
      window.removeEventListener('scroll', unlock)
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
      if (audioRef.current.paused) {
        audioRef.current.play().catch(console.error)
      }
      audioRef.current.muted = !audioRef.current.muted
      setIsMuted(audioRef.current.muted)
    }
  }

  const formatTime = (value: number) => String(value).padStart(2, '0')

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds }
  ]

  return (
    <div>
      <audio ref={audioRef} loop>
        <source src={bgMusic} type="audio/mpeg" />
      </audio>

      <div className="inv-wrap">
  <div className="ornament">— ✦ —</div>
  <p className="together">Together</p>
  <p className="families">with their families</p>

  <p className="invite-prose">
    Cordially invite your gracious presence and blessings with family on the auspicious occasion of the betrothal of
  </p>

  <div className="divider"><div className="divider-line"></div><div className="divider-diamond"></div><div className="divider-line"></div></div>

  <div className="couple-row">
    <div className="person-block">
      <div className="person-name">Alwin Joseph Tomy</div>
      <div className="person-parents">
        S/O Tomy Joseph &amp; Mini Tomy<br></br>
        Vattukulathil (H)
      </div>
    </div>
    <div className="and-symbol">&amp;</div>
    <div className="person-block">
      <div className="person-name">Raina Roy Jacob</div>
      <div className="person-parents">
        D/O Roy Jacob &amp; Shiny Roy<br></br>
        Achettu (H)
      </div>
    </div>
  </div>

  <div className="compliments-row">
    <div className="compliments-label">Best compliments from</div>
    <div className="compliments-names">Shilpa Mareena Tomy · Joshan K Shaji · Ben Roy Jacob</div>
  </div>
</div>


      {/* Mute toggle — fixed top-right */}
    {/*   <button
        onClick={toggleMute}
        className="mute-button"
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      >
        {isMuted ? '🔇' : '🔊'}
      </button> */}

      <section className="center-section">
        {/* Hero image with glow ring */}
        <div className="hero-container">
          <div className="glow-ring" />
          <img
            src={heroImg}
            width={170}
            height={179}
            alt="Event logo"
            className="hero-image"
          />
        </div>

        

        {/* Countdown */}
        <div style={{ textAlign: 'center' }}>
          <p className="countdown-title">
            June 28, 2026 4:30 PM
          </p>
          <div className="countdown-container">
            {units.map(({ label, value }) => (
              <div key={label} className="countdown-box">
                <div className="countdown-number">
                  {formatTime(value)}
                </div>
                <div className="countdown-label">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="maps-wrapper">
        <div className="map-container1" >
          <h2 style={{color:"#8a6545"}}>Wedding</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2903.2867915278057!2d76.64655800000001!3d9.724131599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07cdfe7a4db95f%3A0x24b4af0f8e357149!2sSt.%20Mary&#39;s%20Knanaya%20Syro-Malabar%20Church%2C%20Cherukara!5e1!3m2!1sen!2suk!4v1777683060933!5m2!1sen!2suk"
            width="100%"
            height="260"
            className="map-iframe"
            loading="lazy"
            title="Venue location"
          />
          
        </div>
         <div className="map-container2">
          <h2 style={{color:"#8a6545"}}>Reception</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2903.1060143809523!2d76.6466232!3d9.744928099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07cfd97967d94b%3A0x97159088bf2f3379!2sValavoor%20Bank%20Convention%20Centre!5e1!3m2!1sen!2suk!4v1777684395133!5m2!1sen!2suk"
            width="100%"
            height="260"
            className="map-iframe"
            loading="lazy"
            title="Venue location"
          />
          
        </div>
        </div>
      </section>
    </div>
  )
}

export default App