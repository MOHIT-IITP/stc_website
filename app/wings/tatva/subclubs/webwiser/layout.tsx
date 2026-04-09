import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WebWiser - Web Development Club | Student Technical Council IIT Patna Hybrid Programs',
  description: 'WebWiser is the web development club under Tatva wing of STC at IIT Patna. Learn frontend, backend, full-stack development, and modern web technologies.',
  keywords: [
    'WebWiser',
    'web development',
    'Student Technical Council IIT Patna Hybrid Programs',
    'Tatva',
    'frontend',
    'backend',
    'full-stack',
    'web technologies',
    'IIT Patna STC',
    'web dev club',
  ],
  authors: [{ name: 'IIT Patna Student Technical Council' }],
  creator: 'IIT Patna STC',
  publisher: 'IIT Patna',
  
  openGraph: {
    title: 'WebWiser - Web Development Club | Student Technical Council IIT Patna Hybrid Programs',
    description: 'WebWiser - Learn web development, frontend, backend, and full-stack technologies at IIT Patna.',
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
    title: 'WebWiser - Web Development Club | Student Technical Council IIT Patna Hybrid Programs',
    description: 'Learn web development and modern technologies at IIT Patna.',
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
    'page:section': 'tatva-webwiser',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
