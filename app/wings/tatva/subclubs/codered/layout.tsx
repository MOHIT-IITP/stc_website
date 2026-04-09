import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CodeRed - Competitive Programming Club | Student Technical Council IIT Patna Hybrid Programs',
  description: 'CodeRed is the competitive programming club under Tatva wing of STC at IIT Patna. Master algorithms, data structures, and problem-solving through coding competitions and practice sessions.',
  keywords: [
    'CodeRed',
    'competitive programming',
    'Student Technical Council IIT Patna Hybrid Programs',
    'Tatva',
    'algorithms',
    'data structures',
    'coding competitions',
    'problem solving',
    'IIT Patna STC',
    'CP club',
  ],
  authors: [{ name: 'IIT Patna Student Technical Council' }],
  creator: 'IIT Patna STC',
  publisher: 'IIT Patna',
  
  openGraph: {
    title: 'CodeRed - Competitive Programming Club | Student Technical Council IIT Patna Hybrid Programs',
    description: 'CodeRed - Master competitive programming, algorithms, and data structures at IIT Patna.',
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
    title: 'CodeRed - Competitive Programming Club | Student Technical Council IIT Patna Hybrid Programs',
    description: 'Master competitive programming and algorithms at IIT Patna.',
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
    'page:section': 'tatva-codered',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
