import React from 'react'
import { Box } from '@mui/material'
import { Metadata } from 'next'
import Header from '@/components/DomainPage/Header'
import About from '@/components/DomainPage/About'
import MemberSection from '@/components/DomainPage/MemberSection'
import domains from '@/DataStore/store'

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
            background: "radial-gradient(circle, rgba(22,30 ,172,0.5) 0%, rgba(0,0,0,0) 70%)",
            width : '60rem',
            height : '60rem'
          }}
        /> */}

        
        <Header 
        
          title={domains.tatva.synapse.title}
          subtitle= {domains.tatva.synapse.branch}
          imageUrl= {domains.tatva.synapse.cardUrl}
          fromColor="#118ce5"
          toColor="#9142f6"
          to={{
            whatsappLink: domains.tatva.synapse.whatsappLink,
            direction: 'left'
          }}
          prvDomain='/wings/tatva/subclubs/analytical-arena'
          nextDomain='/wings/tatva/subclubs/hackshield'


        />

        {/* <Box
          sx={{
            position : 'absolute',
            top : '80rem',
            left : '-30rem',
            background: "radial-gradient(circle, rgba(22,30 ,172,0.4) 0%, rgba(0,0,0,0) 40%)",
            width : '60rem',
            height : '60rem'
          }}
        /> */}

        <About
          
          title={domains.tatva.synapse.title}
          about={domains.tatva.synapse.description}
          message={domains.tatva.synapse.message}
          fromColor= "#118ce5"
          toColor="#9142f6"
          to=''
        />

                <Box sx={{ my: 8 }}>
                  <MemberSection
                    members={domains.tatva.synapse.team.map((member, index) => ({
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

        {/* <Box
          sx={{
            position : 'absolute',
            zIndex: '5',
            top : '100rem',
            right : '-32rem',
            background: "radial-gradient(circle, rgba(22,30 ,172,0.4) 0%, rgba(0,0,0,0) 60%)",
            width : '60rem',
            height : '60rem'
          }}
        /> */}

        {/* <Team
          teamData={domains.synapse.team}
        /> */}
        
    </Box>
  )
}

export default page