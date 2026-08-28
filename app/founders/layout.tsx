import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Founders of STC | Student Technical Council IIT Patna Hybrid Programs',
  description: 'Meet the founding council of the Student Technical Council at IIT Patna Hybrid Programs (2024–2026). The bright minds and great leaders behind the highest-authority student council.',
  keywords: [
    'IIT Patna founders',
    'STC founders',
    'Student Technical Council IIT Patna Hybrid Programs',
    'founding council',
    'STC founding team',
    'student council founders',
    'IIT Patna STC',
  ],
  authors: [{ name: 'IIT Patna Student Technical Council' }],
  creator: 'IIT Patna STC',
  publisher: 'IIT Patna',

  openGraph: {
    title: 'Founders of STC | Student Technical Council IIT Patna Hybrid Programs',
    description: 'Meet the founding council of the Student Technical Council at IIT Patna (2024–2026). The bright minds and great leaders behind the council.',
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
    title: 'Founders of STC | Student Technical Council IIT Patna Hybrid Programs',
    description: 'Meet the founding council driving the creation of STC at IIT Patna.',
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
    'page:type': 'founders',
    'page:section': 'about',
  },
}

export default function FoundersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
