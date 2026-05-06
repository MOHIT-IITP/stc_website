"use client"

import { usePathname, useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

interface VideoTransitionProps {
  children: React.ReactNode
}

export default function VideoTransition({ children }: VideoTransitionProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [currentPath, setCurrentPath] = useState(pathname)

  useEffect(() => {
    // Show transition on initial load
    if (isInitialLoad) {
      setIsTransitioning(true)
      
      // Minimum 1.5 seconds for initial load
      const timer = setTimeout(() => {
        setIsTransitioning(false)
        setIsInitialLoad(false)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [isInitialLoad])

  // Prevent scrolling when transitioning
  useEffect(() => {
    if (isTransitioning) {
      // Disable scrolling
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      
      // Prevent touch scrolling on mobile
      const preventTouchScroll = (e: TouchEvent) => {
        e.preventDefault()
      }
      
      // Prevent wheel scrolling on desktop
      const preventWheelScroll = (e: WheelEvent) => {
        e.preventDefault()
      }
      
      document.addEventListener('touchmove', preventTouchScroll, { passive: false })
      document.addEventListener('wheel', preventWheelScroll, { passive: false })
      
      return () => {
        // Re-enable scrolling
        document.body.style.overflow = 'unset'
        document.documentElement.style.overflow = 'unset'
        document.removeEventListener('touchmove', preventTouchScroll)
        document.removeEventListener('wheel', preventWheelScroll)
      }
    }
  }, [isTransitioning])

  useEffect(() => {
    // Detect route changes and show transition BEFORE page changes
    if (!isInitialLoad && pathname !== currentPath) {
      setIsTransitioning(true)
      
      // Minimum 1 second for navigation
      const timer = setTimeout(() => {
        setIsTransitioning(false)
        setCurrentPath(pathname)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [pathname, currentPath, isInitialLoad])

  // Override all link clicks to show transition first
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      
      if (link && link.href && !link.href.startsWith('mailto:') && !link.href.startsWith('tel:') && !link.target) {
        const href = link.getAttribute('href')
        if (href && href.startsWith('/') && href !== pathname) {
          e.preventDefault()
          
          // Show transition first
          setIsTransitioning(true)
          
          // Navigate after a short delay
          setTimeout(() => {
            router.push(href)
          }, 100)
        }
      }
    }

    document.addEventListener('click', handleLinkClick)
    return () => document.removeEventListener('click', handleLinkClick)
  }, [pathname, router])

  const _handleVideoEnd = () => {
    setTimeout(() => setIsTransitioning(false), 200)
  }

  const xenith = pathname?.startsWith('/xenith')
  if (xenith) {
    return <>{children}</>
  }

  return (
    <>
      {/* Video Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999]"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.9) 0%, rgba(240,240,240,0.8) 50%, rgba(220,220,220,0.7) 100%)',
              filter: 'blur(0.5px)',
              backdropFilter: 'blur(20px)'
            }}
          >
            
            {/* Fallback/Overlay Animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center space-y-6 text-gray-800">
                {/* STC Logo */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="w-24 h-24 rounded-full bg-white p-2 shadow-lg">
                    <img 
                      src="/images/stc.jpg" 
                      alt="STC Logo" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </motion.div>
                
                {/* Text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <h2 className="text-2xl font-bold mb-2">
                    Student Technical Council
                  </h2>
                  <p className="text-lg opacity-90">IIT Patna</p>
                  
                  {/* Progress Bar */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ 
                      delay: 0.5,
                      duration: isInitialLoad ? 1.2 : 0.8,
                      ease: "easeInOut"
                    }}
                    className="h-1 bg-blue-600/30 rounded-full mt-4 overflow-hidden"
                  >
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: "300%" }}
                      transition={{
                        delay: 0.7,
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="h-full w-1/3 bg-blue-600 rounded-full"
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.22, 1, 0.36, 1],
            delay: 0.1 
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
}