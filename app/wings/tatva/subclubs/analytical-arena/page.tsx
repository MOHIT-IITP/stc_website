import React from 'react'
import { Box } from '@mui/material'
import { Metadata } from 'next'
import Header from '@/components/DomainPage/Header'
import About from '@/components/DomainPage/About'
import MemberSection from '@/components/DomainPage/MemberSection'
import domains from '@/DataStore/store'

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

const page = () => {
  return (
    <Box 
      sx= {{
        position: 'relative',
        overflow: 'hidden'
      }}
    >
        {/* <Box
          sx={{
            position : 'absolute',
            top : '25rem',
            left : '-32rem',
            background: "radial-gradient(circle, rgba(176,162,40,0.5) 0%, rgba(0,0,0,0) 70%)",
            width : '60rem',
            height : '60rem'
          }}
        /> */}

        <Header 
          title={domains.tatva.analytical_arena.title}
          subtitle={domains.tatva.analytical_arena.branch}
          imageUrl={domains.tatva.analytical_arena.cardUrl}
          fromColor="#e5d011"
          toColor="#f64242"
          to={{
            whatsappLink: domains.tatva.analytical_arena.whatsappLink,
            direction: 'left'
          }}
          prvDomain='/wings/tatva/subclubs/appistry'
          nextDomain='/wings/tatva/subclubs/synapse'
        />
        
        
        {/* <Box
          sx={{
            position : 'absolute',
            top : '80rem',
            left : '-30rem',
            background: "radial-gradient(circle, rgba(178,98,49,0.4) 0%, rgba(0,0,0,0) 40%)",
            width : '60rem',
            height : '60rem'
          }}
        /> */}
        <About
          title={domains.tatva.analytical_arena.title}
          about={domains.tatva.analytical_arena.description}
          message={domains.tatva.analytical_arena.message}
          fromColor= "#e5d011"
          toColor="#f64242"
          to=''
        />
        {/* <Box
          sx={{
            position : 'absolute',
            zIndex: '5',
            top : '100rem',
            right : '-32rem',
            background: "radial-gradient(circle, rgba(178,98,49,0.4) 0%, rgba(0,0,0,0) 60%)",
            width : '60rem',
            height : '60rem'
          }}
        /> */}
        <Box sx={{ my: 8 }}>
          <MemberSection
            members={domains.tatva.analytical_arena.team.map((member, index) => ({
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