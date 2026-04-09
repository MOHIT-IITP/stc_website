import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analytical Arena - Data Analytics Club | Student Technical Council IIT Patna Hybrid Programs',
  description: 'Analytical Arena is the data analytics club under Tatva wing of STC at IIT Patna. Learn data analysis, data visualization, statistical modeling, and business intelligence.',
  keywords: [
    'Analytical Arena',
    'data analytics',
    'Student Technical Council IIT Patna Hybrid Programs',
    'Tatva',
    'data analysis',
    'data visualization',
    'statistical modeling',
    'business intelligence',
    'IIT Patna STC',
    'analytics club',
  ],
  authors: [{ name: 'IIT Patna Student Technical Council' }],
  creator: 'IIT Patna STC',
  publisher: 'IIT Patna',
  
  openGraph: {
    title: 'Analytical Arena - Data Analytics Club | Student Technical Council IIT Patna Hybrid Programs',
    description: 'Analytical Arena - Learn data analysis, visualization, and statistical modeling at IIT Patna.',
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
    title: 'Analytical Arena - Data Analytics Club | Student Technical Council IIT Patna Hybrid Programs',
    description: 'Learn data analytics and visualization at IIT Patna.',
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
    'page:section': 'tatva-analytical-arena',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
