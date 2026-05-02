'use client'

import { useState, useEffect, useCallback } from 'react'

interface TeamMember {
  id: number
  name: string
  role: string
  image: string
}

const MEMBER_DATA: { name: string; role: string; image?: string }[] = [
  { name: 'Arjun Sharma', role: 'President', image: '/phoenix/arunesh.png' },
  { name: 'Priya Patel', role: 'Vice President', image: '/phoenix/STC.png' },
  { name: 'Rahul Kumar', role: 'Tech Lead', image: '/phoenix/STC.png' },
  { name: 'Ananya Singh', role: 'Design Lead', image: '/phoenix/STC.png' },
  { name: 'Vikram Mehta', role: 'Frontend Dev', image: '/phoenix/STC.png' },
  { name: 'Neha Gupta', role: 'Backend Dev', image: '/phoenix/STC.png' },
  { name: 'Rohan Joshi', role: 'UI/UX Designer', image: '/phoenix/STC.png' },
  { name: 'Kavya Nair', role: 'DevOps Engineer', image: '/phoenix/STC.png' },
  { name: 'Aditya Reddy', role: 'Data Scientist', image: '/phoenix/mandeep.jpeg' },
  { name: 'Sneha Iyer', role: 'ML Engineer', image: '/phoenix/mandeep.jpeg' },
  { name: 'Manish Tiwari', role: 'Full Stack Dev', image: '/phoenix/mandeep.jpeg' },
  { name: 'Pooja Verma', role: 'Mobile Dev', image: '/phoenix/mandeep.jpeg' },
  { name: 'Karan Malhotra', role: 'Cloud Architect', image: '/phoenix/mandeep.jpeg' },
  { name: 'Riya Agarwal', role: 'Security Eng.', image: '/phoenix/mandeep.jpeg' },
  { name: 'Deepak Yadav', role: 'QA Engineer', image: '/phoenix/ankit.png' },
  { name: 'Shreya Mishra', role: 'Product Manager', image: '/phoenix/ankit.png' },
  { name: 'Nikhil Pandey', role: 'Content Writer', image: '/phoenix/ankit.png' },
  { name: 'Anjali Saxena', role: 'Marketing Lead', image: '/phoenix/ankit.png' },
  { name: 'Siddharth Roy', role: 'Outreach Manager', image: '/phoenix/ankit.png' },
  { name: 'Meera Pillai', role: 'Event Manager', image: '/phoenix/ankit.png' },
  { name: 'Aman Chaudhary', role: 'Frontend Dev', image: '/phoenix/ankit.png' },
  { name: 'Divya Khanna', role: 'Backend Dev', image: '/phoenix/mandeep.jpeg' },
  { name: 'Tushar Bose', role: 'UI Designer', image: '/phoenix/ankit.png' },
  { name: 'Sakshi Bansal', role: 'Data Analyst', image: '/phoenix/mandeep.jpeg' },
  { name: 'Varun Jain', role: 'Research Lead', image: '/phoenix/mandeep.jpeg' },
  { name: 'Ishita Sinha', role: 'Core Member', image: '/phoenix/mandeep.jpeg' },
  { name: 'Harsh Kapoor', role: 'Core Member', image: '/phoenix/mandeep.jpeg' },
  { name: 'Nisha Dubey', role: 'Core Member', image: '/phoenix/mandeep.jpeg' },
  { name: 'Yash Trivedi', role: 'Core Member', image: '/phoenix/mandeep.jpeg' },
  { name: 'Tanvi Desai', role: 'Core Member', image: '/phoenix/mandeep.jpeg' },
]

const TEAM_MEMBERS: TeamMember[] = MEMBER_DATA.map((member, i) => ({
  id: i + 1,
  name: member.name,
  role: member.role,
  image:
    member.image
      ? member.image
      : '/phoenix/arunesh.png'
}))

type Phase = 'idle' | 'exit' | 'enter'

export default function TeamSection() {
  const [cardsPerSlide, setCardsPerSlide] = useState(6)
  const [slide, setSlide] = useState(0)
  const [shown, setShown] = useState(0)
  const [phase, setPhase] = useState<Phase>('idle')
  const [dir, setDir] = useState<'fwd' | 'back'>('fwd')
  const totalSlides = Math.ceil(TEAM_MEMBERS.length / cardsPerSlide)

  useEffect(() => {
    const syncCardsPerSlide = () => {
      const width = window.innerWidth
      if (width < 768) {
        setCardsPerSlide(2)        
      } else if (width < 1024) {
        setCardsPerSlide(3)        
      } else if (width < 1380) {
        setCardsPerSlide(4)        
      } else {
        setCardsPerSlide(6) 
      }
    }

    syncCardsPerSlide()
    window.addEventListener('resize', syncCardsPerSlide)
    return () => window.removeEventListener('resize', syncCardsPerSlide)
  }, [])

  const goTo = useCallback(
    (target: number) => {
      if (totalSlides < 2) return
      if (phase !== 'idle') return
      const wrappedTarget = (target + totalSlides) % totalSlides
      if (wrappedTarget === slide) return

      const movingForward =
        (slide === totalSlides - 1 && wrappedTarget === 0) ||
        (slide !== 0 && wrappedTarget > slide)

      setDir(movingForward ? 'fwd' : 'back')
      setPhase('exit')
      setTimeout(() => {
        setShown(wrappedTarget)
        setSlide(wrappedTarget)
        setPhase('enter')
        setTimeout(() => setPhase('idle'), 420)
      }, 260)
    },
    [phase, slide, totalSlides],
  )

  useEffect(() => {
    const lastSlide = Math.max(totalSlides - 1, 0)
    if (slide > lastSlide) setSlide(lastSlide)
    if (shown > lastSlide) setShown(lastSlide)
  }, [slide, shown, totalSlides])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(slide + 1)
      if (e.key === 'ArrowLeft') goTo(slide - 1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goTo, slide])

  const members = TEAM_MEMBERS.slice(
    shown * cardsPerSlide,
    (shown + 1) * cardsPerSlide,
  )

  const rowAnimClass =
    phase === 'exit'
      ? dir === 'fwd'
        ? 'stc-exit-fwd'
        : 'stc-exit-back'
      : phase === 'enter'
        ? dir === 'fwd'
          ? 'stc-enter-fwd'
          : 'stc-enter-back'
        : ''

  return (
    <div id="our-team" className="relative w-full min-h-screen z-10 flex flex-col py-8" aria-label="Our Team">
      <style>{`
        @keyframes stc-exit-fwd   { to   { opacity:0; transform:translateX(-42px); } }
        @keyframes stc-exit-back  { to   { opacity:0; transform:translateX( 42px); } }
        @keyframes stc-enter-fwd  { from { opacity:0; transform:translateX( 42px); } to { opacity:1; transform:none; } }
        @keyframes stc-enter-back { from { opacity:0; transform:translateX(-42px); } to { opacity:1; transform:none; } }
        .stc-exit-fwd   { animation: stc-exit-fwd .26s ease forwards; }
        .stc-exit-back  { animation: stc-exit-back .26s ease forwards; }
        .stc-enter-fwd  { animation: stc-enter-fwd .42s cubic-bezier(.22,1,.36,1) forwards; }
        .stc-enter-back { animation: stc-enter-back .42s cubic-bezier(.22,1,.36,1) forwards; }
        .team-card {
          background: rgba(2, 24, 20, 0.62);
          transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
        }
        .team-card:hover {
          transform: scale(1.03);
          border-color: rgba(255,255,255,0.32);
          box-shadow: 0 20px 44px rgba(0,0,0,0.52);
        }
        .vertical-meta {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          text-orientation: mixed;
          letter-spacing: 0.08em;
        }
      `}</style>

      <header  className="mx-auto mb-6 flex w-full max-w-4xl flex-col items-center justify-center px-4 text-center">
        <h2 className="text-white font-bold leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
          Our Team
        </h2>
        <p className="mt-2 text-white/65" style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)' }}>
          Built by passionate students driving innovation together
        </p>
      </header>

      <div className={`w-full h-[34vh] md:h-[36vh] lg:h-[50vh] flex items-stretch gap-2 px-3 md:gap-3 md:px-8 ${rowAnimClass}`}>
        {members.map((member, index) => (
          <article
            key={member.id}
            className="team-card relative overflow-hidden rounded-xl flex flex-col flex-1 min-w-0 border border-white/15"
          >
            {index < 6 ? (
              <span
                className="hidden md:block absolute top-4 left-5 text-white/90 font-black leading-none pointer-events-none z-10"
                style={{ fontSize: 'clamp(72px, 8vw, 140px)' }}
              >
                {['𝐒', '𝐓', '𝐂', '𝐈 𝐈', '𝐓', '𝐏'][index]} 
              </span>
            ) : null}
            <div className="relative h-full w-full pr-[24%] flex items-end justify-start overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="h-[52%] w-[200%] -ml-1 object-cover object-center"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-y-0 right-0 w-[24%] p-2 text-white bg-gradient-to-l from-black/85 via-black/45 to-transparent flex items-center justify-center gap-1.5">
              <div className="vertical-meta  font-semibold uppercase leading-none text-center color-[#B2BEB5] align-left">
                <p className="text-[#B2BEB5] text-[13px] text-left">
                {member.role}
              </p>

            </div>
              <div className="vertical-meta text-[18px] font-extrabold uppercase leading-none text-center">
                <p>
                  {member.name}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <nav className="mx-auto mt-6 flex items-center gap-4" aria-label="Team navigation">
        <button
          onClick={() => goTo(slide - 1)}
          aria-label="Previous"
          className="h-10 w-10 rounded-full border border-white/35 text-white"
        >
          &#8249;
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="h-2 rounded-full transition-all"
              style={{
                width: i === slide ? 24 : 8,
                background: i === slide ? '#fff' : 'rgba(255,255,255,0.4)',
              }}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(slide + 1)}
          aria-label="Next"
          className="h-10 w-10 rounded-full border border-white/35 text-white"
        >
          &#8250;
        </button>
      </nav>
    </div>
  )
}
