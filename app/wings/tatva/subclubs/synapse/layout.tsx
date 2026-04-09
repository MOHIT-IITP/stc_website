import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Synapse - AI & Machine Learning Club | Student Technical Council IIT Patna Hybrid Programs',
  description: 'Synapse is the AI and Machine Learning club under Tatva wing of STC at IIT Patna. Explore artificial intelligence, deep learning, neural networks, and data science.',
  keywords: [
    'Synapse',
    'AI club',
    'machine learning',
    'Student Technical Council IIT Patna Hybrid Programs',
    'Tatva',
    'artificial intelligence',
    'deep learning',
    'neural networks',
    'data science',
    'IIT Patna STC',
  ],
  authors: [{ name: 'IIT Patna Student Technical Council' }],
  creator: 'IIT Patna STC',
  publisher: 'IIT Patna',
  
  openGraph: {
    title: 'Synapse - AI & Machine Learning Club | Student Technical Council IIT Patna Hybrid Programs',
    description: 'Synapse - Explore AI, machine learning, deep learning, and data science at IIT Patna.',
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
    title: 'Synapse - AI & Machine Learning Club | Student Technical Council IIT Patna Hybrid Programs',
    description: 'Explore AI, machine learning, and data science at IIT Patna.',
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
    'page:section': 'tatva-synapse',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
