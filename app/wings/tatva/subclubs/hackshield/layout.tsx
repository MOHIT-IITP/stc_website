import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HackShield - Cybersecurity Club | Student Technical Council IIT Patna Hybrid Programs',
  description: 'HackShield is the cybersecurity club under Tatva wing of STC at IIT Patna. Learn ethical hacking, penetration testing, network security, and cryptography.',
  keywords: [
    'HackShield',
    'cybersecurity',
    'Student Technical Council IIT Patna Hybrid Programs',
    'Tatva',
    'ethical hacking',
    'penetration testing',
    'network security',
    'cryptography',
    'IIT Patna STC',
    'security club',
  ],
  authors: [{ name: 'IIT Patna Student Technical Council' }],
  creator: 'IIT Patna STC',
  publisher: 'IIT Patna',
  
  openGraph: {
    title: 'HackShield - Cybersecurity Club | Student Technical Council IIT Patna Hybrid Programs',
    description: 'HackShield - Learn ethical hacking, penetration testing, and network security at IIT Patna.',
    siteName: 'Student Technical Council IIT Patna Hybrid Programs',
    images: [
      {
        url: '/icon.png',
        width: 1200,
        height: 630,
        alt: 'Student Technical Council IIT Patna Hybrid Programs.',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'HackShield - Cybersecurity Club | Student Technical Council IIT Patna Hybrid Programs',
    description: 'Learn ethical hacking and cybersecurity at IIT Patna.',
    images: ['/icon.png'],
    creator: '@IITPatna',
    site: '@IITPatna',
  },

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

  other: {
    'page:type': 'club',
    'page:section': 'tatva-hackshield',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
