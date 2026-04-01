import React from 'react'
import { Box } from '@mui/material'
import { Metadata } from 'next'
import Header from '@/components/DomainPage/Header'
import About from '@/components/DomainPage/About'
import MemberSection from '@/components/DomainPage/MemberSection'
import domains from '@/DataStore/store'
import AppConfig from '@/config/appConfig'

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

const page = () => {
  return (
    <Box 
      sx={{
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Header
        title="MECH-X"
        subtitle="ROBOTICS CLUB"
        imageUrl={AppConfig.imageUrls.MechXBox2}
        fromColor="#1E1637"
        toColor="#e51111"
        to={{
          whatsappLink: domains.tatva.mech_x.whatsappLink,
          direction: 'left'
        }}
        prvDomain="/wings/tatva/subclubs/tech-hub"
        nextDomain="/wings/tatva/subclubs/webwiser"
      />

      <About
        title="MECH-X"
        about="Mech-X is the robotics club that focuses on building and programming robots through competitions and practical learning experiences. Join us to explore the exciting world of robotics and automation."
        message="Join us and be part of the robotics revolution! 🤖⚡"
        fromColor="#1E1637 "
        toColor="#e51111"
        to="bottom"
      />

      <Box sx={{ my: 8 }}>
        <MemberSection
          members={domains.tatva.mech_x.team.map((member, index) => ({
            id: `member-${index + 1}`,
            name: member.name,
            role: member.position,
            avatar: member.imgUrl,
            linkedin: member.linkedin,
            github: member.github,
            email: member.email,
          }))}
        />
      </Box>
    </Box>
  )
}

export default page