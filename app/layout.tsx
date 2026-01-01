import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { FooterWrapper } from "@/components/footer-wrapper"
import VideoTransition from "@/components/video-transition"
import { SessionWrapper } from "@/lib/SessionWrapper"
import AdminNav from "@/components/adminNav"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  metadataBase: new URL('https://stciitphybrid.in'),
  title: {
    default: "STC IITP | Student Technical Council IIT Patna Hybrid Programs",
    template: "%s | STC IITP - Student Technical Council IIT Patna"
  },
  description: "STC IITP - Official Student Technical Council IIT Patna Hybrid Programs. STC Hybrid offers technical excellence through DISHA, ARTHNITI, and TATVA wings. Join Student Technical Council Hybrid for innovation and leadership.",
  keywords: [
    "STC",
    "STC IITP",
    "STC IIT Patna",
    "STC Hybrid",
    "Student Technical Council",
    "Student Technical Council IIT Patna",
    "Student Technical Council Hybrid",
    "Student Technical Council IITP",
    "Student Technical Council Hybrid Programs",
    "Student Technical Council for Hybrid Programs IIT Patna",
    "IIT Patna",
    "IITP",
    "Indian Institute of Technology Patna",
    "IIT Patna student council",
    "IITP student council",
    "IIT Patna technical council",
    "DISHA STC",
    "ARTHNITI STC", 
    "TATVA STC",
    "STC wings",
    "DISHA IIT Patna",
    "ARTHNITI IIT Patna",
    "TATVA IIT Patna",
    "career development IIT Patna",
    "entrepreneurship IIT Patna",
    "technology research IITP",
    "STC events",
    "STC IITP events",
    "technical events IIT Patna",
    "hackathons IITP",
    "workshops STC",
    "webinars hybrid",
    "webinars STC",
    "coding competitions IIT Patna",
    "technical competitions IITP",
    "Xenith IIT Patna",
    "tech fest IITP",
    "hybrid programs IIT Patna",
    "student programs IITP",
    "hybrid course IIT",
    "online learning IIT Patna",
    "student leadership council",
    "technical training IITP",
    "IIT Patna clubs",
    "technical clubs IITP",
    "coding club IIT Patna",
    "robotics club IITP",
    "AI ML club IIT Patna",
    "web development club IITP",
    "technology council",
    "innovation hub",
    "computer science events",
    "technology events hybrid",
    "student organizations IIT Patna",
    "technical society IITP",
    "engineering clubs IIT Patna",
  ],
  authors: [{ name: "Student Technical Council IIT Patna", url: "https://stciitphybrid.in" }],
  creator: "Student Technical Council IIT Patna",
  publisher: "Student Technical Council IIT Patna",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://stciitphybrid.in',
    siteName: 'STC IITP - Student Technical Council for Hybrid Programs IIT Patna',
    title: 'STC IITP | Student Technical Council for Hybrid Programs IIT Patna',
    description: 'STC IITP - Official Student Technical Council for Hybrid Programs IIT Patna. Technical excellence through DISHA, ARTHNITI, and TATVA wings.',
    images: [
      {
        url: '/images/stc-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'STC IITP - Student Technical Council Logo',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'STC IITP | Student Technical Council for Hybrid Programs IIT Patna',
    description: 'STC IITP - Official Student Technical Council for Hybrid Programs IIT Patna. Technical excellence through DISHA, ARTHNITI, and TATVA wings.',
    images: ['/images/stc-logo.jpg'],
    creator: '@stc_iitpatna',
    site: '@stc_iitpatna',
  },
  category: 'education',
  classification: 'Student Organization',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: [
      { url: '/images/stc-logo.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/images/stc-logo.jpg',
        color: '#1e40af'
      }
    ]
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://stciitphybrid.in',
  },
  other: {
    'msapplication-TileColor': '#2563eb',
    'msapplication-TileImage': '/images/stc-logo.jpg',
    'theme-color': '#2563eb',
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': 'https://stciitphybrid.in/#organization',
    name: 'Student Technical Council IIT Patna Hybrid Programs',
    legalName: 'Student Technical Council for Hybrid Programs, Indian Institute of Technology Patna',
    alternateName: [
      'STC IITP', 
      'STC IIT Patna',
      'STC Hybrid', 
      'Student Technical Council Hybrid', 
      'Student Technical Council IITP',
      'STC',
      'Student Technical Council IIT Patna'
    ],
    description: 'Official Student Technical Council IIT Patna Hybrid Programs offering technical excellence through DISHA, ARTHNITI, and TATVA wings. Leading student organization for technical events, workshops, and innovation.',
    url: 'https://stciitphybrid.in',
    logo: {
      '@type': 'ImageObject',
      url: 'https://stciitphybrid.in/images/stc.jpg',
      width: 512,
      height: 512
    },
    image: 'https://stciitphybrid.in/images/stc.jpg',
    email: 'stciitphybrid@iitp.ac.in',
    foundingDate: '2025',
    slogan: 'Empowering Innovation, Nurturing Excellence',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bihta',
      addressRegion: 'Bihar',
      addressCountry: 'India',
      postalCode: '801106',
      streetAddress: 'Indian Institute of Technology Patna'
    },
    parentOrganization: {
      '@type': 'EducationalOrganization',
      name: 'Indian Institute of Technology Patna',
      url: 'https://www.iitp.ac.in',
      sameAs: 'https://en.wikipedia.org/wiki/Indian_Institute_of_Technology_Patna'
    },
    department: [
      {
        '@type': 'Organization',
        name: 'DISHA',
        description: 'Career Growth & Training Cell - Empowering students with skills and professional development',
        url: 'https://stciitphybrid.in/wings/disha'
      },
      {
        '@type': 'Organization',
        name: 'ARTHNITI',
        description: 'Entrepreneurship & Innovation Cell - Supporting startup culture and innovation',
        url: 'https://stciitphybrid.in/wings/arthniti'
      },
      {
        '@type': 'Organization',
        name: 'TATVA',
        description: 'Technology & Research Cell - Promoting technical expertise and research',
        url: 'https://stciitphybrid.in/wings/tatva'
      }
    ],
    sameAs: [
      "https://www.linkedin.com/company/stc-iitp-hybrid-programs",
      "https://www.instagram.com/stc_iitp_cet",
      "https://twitter.com/stc_iitpatna",
      "https://www.iitp.ac.in",
      "https://www.cet.iitp.ac.in",
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'stc_iitp@iitp.ac.in',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi']
    },
    mainEntity: [
      {
        '@type': 'WebPage',
        name: 'Home',
        url: 'https://stciitphybrid.in',
        description: 'Welcome to the official website of STC IIT Patna Hybrid Programs'
      },
      {
        '@type': 'WebPage',
        name: 'Our Wings',
        url: 'https://stciitphybrid.in/wings',
        description: 'Explore the various wings of STC IIT Patna Hybrid Programs'
      },
      {
        '@type': 'WebPage',
        name: 'Event Calendar',
        url: 'https://stciitphybrid.in/calendar',
        description: 'View upcoming technical events and workshops by STC IITP Hybrid Programs'
      },
      {
        '@type': 'WebPage',
        name: 'About STC IITP',
        url: 'https://stciitphybrid.in/about',
        description: 'Learn about Student Technical Council for hybrid programs IIT Patna'
      },
      {
        '@type': 'WebPage',
        name: 'Our Team',
        url: 'https://stciitphybrid.in/team',
        description: 'Meet the STC IITP team members'
      },
      {
        '@type': 'WebPage',
        name: 'Contact',
        url: 'https://stciitphybrid.in/contact',
        description: 'Contact STC IITP for collaborations and queries'
      }
    ]
  }

  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/images/stc-logo.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/images/stc-logo.jpg" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-TileImage" content="/images/stc-logo.jpg" />
        <meta name="theme-color" content="#000000" />
        <link rel="canonical" href="https://stciitphybrid.in" />
        
        {/* Geo Location Tags */}
        <meta name="geo.region" content="IN-BR" />
        <meta name="geo.placename" content="Bihta, Patna" />
        <meta name="geo.position" content="25.536041;84.851253" />
        <meta name="ICBM" content="25.536041, 84.851253" />
        
        {/* Organization Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="General" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased overflow-x-hidden`}>
        <SessionWrapper>
          <VideoTransition>
            <Navigation />
            <AdminNav />
            <div className="Mandeep Nagar"></div> {/* Isko remove mt krna, bhaichara ki ksm. */}
            <main className="min-h-screen">{children}</main>
            <FooterWrapper />
          </VideoTransition>
        </SessionWrapper>
      </body>
    </html>
  )
}