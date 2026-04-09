import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pixelerate - UI/UX Design Club | Student Technical Council IIT Patna Hybrid Programs',
  description: 'Pixelerate is the UI/UX design club under Tatva wing of STC at IIT Patna. Learn user interface design, user experience, graphic design, and creative tools.',
  keywords: [
    'Pixelerate',
    'UI UX design',
    'Student Technical Council IIT Patna Hybrid Programs',
    'Tatva',
    'user interface',
    'user experience',
    'graphic design',
    'design club',
    'IIT Patna STC',
    'creative design',
  ],
  authors: [{ name: 'IIT Patna Student Technical Council' }],
  creator: 'IIT Patna STC',
  publisher: 'IIT Patna',
  
  openGraph: {
    title: 'Pixelerate - UI/UX Design Club | Student Technical Council IIT Patna Hybrid Programs',
    description: 'Pixelerate - Learn UI/UX design, graphic design, and creative tools at IIT Patna.',
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
    title: 'Pixelerate - UI/UX Design Club | Student Technical Council IIT Patna Hybrid Programs',
    description: 'Learn UI/UX design and creative tools at IIT Patna.',
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
    'page:section': 'tatva-pixelerate',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
