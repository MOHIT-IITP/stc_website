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
  { name: 'Ankit Kumar', role: 'Vice President', image: '/phoenix/ankit.png' },
  { name: 'Abhishek Mohanty', role: 'Tech Lead', image: '/phoenix/abhishek.png' },
  { name: 'Mandeep Nagar', role: 'Design Lead', image: '/phoenix/mandeep.png' },
  { name: 'Vikram Mehta', role: 'Frontend Dev', image: '/phoenix/arunesh.png' },
  { name: 'Ankit Kumar', role: 'Backend Dev', image: '/phoenix/ankit.png' },
  { name: 'Abhijeet Kumar', role: 'Tech Lead', image: '/phoenix/abhijeet.png' },
  { name: 'Kavya Nair', role: 'DevOps Engineer', image: '/phoenix/abhijeet.png' },
  { name: 'Aditya Reddy', role: 'Data Scientist', image: '/phoenix/abhijeet.png' },
  { name: 'Sneha Iyer', role: 'ML Engineer', image: '/phoenix/ankit.png' },
  { name: 'Manish Tiwari', role: 'Full Stack Dev', image: '/phoenix/abhishek.png' },
  { name: 'Pooja Verma', role: 'Mobile Dev', image: '/phoenix/mandeep.png' },
  { name: 'Karan Malhotra', role: 'Cloud Architect', image: '/phoenix/arunesh.png' },
  { name: 'Riya Agarwal', role: 'Security Eng.', image: '/phoenix/ankit.png' },
  { name: 'Deepak Yadav', role: 'QA Engineer', image: '/phoenix/abhishek.png' },
  { name: 'Shreya Mishra', role: 'Product Manager', image: '/phoenix/mandeep.png' },
  { name: 'Nikhil Pandey', role: 'Content Writer', image: '/phoenix/arunesh.png' },
  { name: 'Anjali Saxena', role: 'Marketing Lead', image: '/phoenix/ankit.png' },
  { name: 'Siddharth Roy', role: 'Outreach Manager', image: '/phoenix/abhishek.png' },
  { name: 'Meera Pillai', role: 'Event Manager', image: '/phoenix/mandeep.png' },
  { name: 'Aman Chaudhary', role: 'Frontend Dev', image: '/phoenix/arunesh.png' },
  { name: 'Divya Khanna', role: 'Backend Dev', image: '/phoenix/ankit.png' },
  { name: 'Tushar Bose', role: 'UI Designer', image: '/phoenix/abhishek.png' },
  { name: 'Sakshi Bansal', role: 'Data Analyst', image: '/phoenix/mandeep.png' },
  { name: 'Varun Jain', role: 'Research Lead', image: '/phoenix/arunesh.png' },
  { name: 'Ishita Sinha', role: 'Core Member', image: '/phoenix/ankit.png' },
  { name: 'Harsh Kapoor', role: 'Core Member', image: '/phoenix/abhishek.png' },
  { name: 'Nisha Dubey', role: 'Core Member', image: '/phoenix/mandeep.png' },
  { name: 'Yash Trivedi', role: 'Core Member', image: '/phoenix/arunesh.png' },
  { name: 'Tanvi Desai', role: 'Core Member', image: '/phoenix/ankit.png' },
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
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Outfit&display=swap');
        @keyframes stc-exit-fwd   { to   { opacity:0; transform:translateX(-42px); } }
        @keyframes stc-exit-back  { to   { opacity:0; transform:translateX( 42px); } }
        @keyframes stc-enter-fwd  { from { opacity:0; transform:translateX( 42px); } to { opacity:1; transform:none; } }
        @keyframes stc-enter-back { from { opacity:0; transform:translateX(-42px); } to { opacity:1; transform:none; } }
        .stc-exit-fwd   { animation: stc-exit-fwd .26s ease forwards; }
        .stc-exit-back  { animation: stc-exit-back .26s ease forwards; }
        .stc-enter-fwd  { animation: stc-enter-fwd .42s cubic-bezier(.22,1,.36,1) forwards; }
        .stc-enter-back { animation: stc-enter-back .42s cubic-bezier(.22,1,.36,1) forwards; }
        
        .team-card {
          transition: filter .22s ease;
          background-image: 
            radial-gradient(1.5px 1.5px at 20px 30px, rgba(255,255,255,0.4), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.3), rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 50px 160px, rgba(255,255,255,0.5), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.2), rgba(0,0,0,0)),
            radial-gradient(2px 2px at 130px 80px, rgba(255,255,255,0.4), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 160px 120px, rgba(255,255,255,0.3), rgba(0,0,0,0));
          background-size: 200px 200px;
        }
        .team-card:nth-child(1) { background-color: #12241b; }
        .team-card:nth-child(2) { background-color: #172d22; }
        .team-card:nth-child(3) { background-color: #14281e; }
        .team-card:nth-child(4) { background-color: #1a3225; }
        .team-card:nth-child(5) { background-color: #13251c; }
        .team-card:nth-child(6) { background-color: #182e23; }

        .vertical-meta {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          text-orientation: mixed;
          letter-spacing: 0.1em;
        }
      `}</style>

      <header className="mx-auto mb-6 flex w-full max-w-4xl flex-col items-center justify-center px-4 text-center">
        <h2 className="text-white font-bold leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
          Our Team
        </h2>
        <p className="mt-2 text-white/65" style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)' }}>
          Built by passionate students driving innovation together
        </p>
      </header>

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className={`w-full h-[65vh] md:h-[75vh] lg:h-[85vh] flex items-stretch overflow-hidden border border-white/5 shadow-2xl ${rowAnimClass}`}>
          {members.map((member, index) => (
            <article
              key={member.id}
              className="team-card relative overflow-hidden flex flex-col flex-1 min-w-0 border-r border-white/5 last:border-r-0"
            >
              {/* STC background text */}
              {index < 3 ? (
                <span
                  className="hidden md:block absolute top-0 -left-1 text-white font-extrabold leading-none pointer-events-none z-0 opacity-80"
                  style={{ fontSize: 'clamp(100px, 14vw, 220px)', letterSpacing: '-0.05em', fontFamily: '"Outfit", sans-serif' }}
                >
                  {['S', 'T', 'C'][index]}
                </span>
              ) : null}

              {/* Dark Gradient from Right (behind image) to help text legibility */}
              <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/40 to-transparent pointer-events-none z-[5]" />

              {/* Member Image */}
              <div className="absolute inset-x-0 bottom-0 h-[75%] sm:h-[80%] pointer-events-none z-10 overflow-hidden flex items-end justify-start">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-[160%] max-w-none h-full object-cover object-left-bottom -ml-[45%]"
                  loading="lazy"
                />
              </div>

              {/* Top Right Info */}
              <div className="absolute top-12 sm:top-16 right-3 sm:right-5 z-20 flex flex-row-reverse gap-2 sm:gap-3 items-start">
                <div
                  className="vertical-meta text-[14px] sm:text-[18px] font-extrabold uppercase leading-none text-white tracking-widest drop-shadow-md"
                  style={{ fontFamily: '"Roboto Slab", serif' }}
                >
                  {member.name}
                </div>
                <div
                  className="vertical-meta text-[11px] sm:text-[13px] font-medium uppercase leading-none text-[#B2BEB5] tracking-widest drop-shadow-md"
                  style={{ fontFamily: '"Roboto Slab", serif' }}
                >
                  {member.role}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <nav className="mx-auto mt-10 mb-4 flex items-center justify-center gap-6" aria-label="Team navigation">
        <button
          onClick={() => goTo(slide - 1)}
          aria-label="Previous slide"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur-md transition-all hover:bg-white/15 hover:text-white hover:scale-105 active:scale-95"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <div className="flex items-center gap-3">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ease-out ${i === slide
                ? 'h-1.5 w-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]'
                : 'h-1.5 w-1.5 bg-white/20 hover:bg-white/50 hover:scale-125'
                }`}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(slide + 1)}
          aria-label="Next slide"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur-md transition-all hover:bg-white/15 hover:text-white hover:scale-105 active:scale-95"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </nav>
    </div>
  )
}
