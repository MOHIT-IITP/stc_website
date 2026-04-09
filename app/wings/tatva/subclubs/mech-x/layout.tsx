import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mech-X - Hardware & Robotics Club | Student Technical Council IIT Patna Hybrid Programs',
  description: 'Mech-X is the hardware and robotics club under Tatva wing of STC at IIT Patna. Learn robotics, embedded systems, mechanical engineering, and hardware design.',
  keywords: [
    'Mech-X',
    'robotics',
    'Student Technical Council IIT Patna Hybrid Programs',
    'Tatva',
    'hardware design',
    'embedded systems',
    'mechanical engineering',
    'automation',
    'IIT Patna STC',
    'hardware club',
  ],
  authors: [{ name: 'IIT Patna Student Technical Council' }],
  creator: 'IIT Patna STC',
  publisher: 'IIT Patna',
  
  openGraph: {
    title: 'Mech-X - Hardware & Robotics Club | Student Technical Council IIT Patna Hybrid Programs',
    description: 'Mech-X - Learn robotics, embedded systems, and hardware design at IIT Patna.',
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
    title: 'Mech-X - Hardware & Robotics Club | Student Technical Council IIT Patna Hybrid Programs',
    description: 'Learn robotics and hardware design at IIT Patna.',
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
    'page:section': 'tatva-mech-x',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
