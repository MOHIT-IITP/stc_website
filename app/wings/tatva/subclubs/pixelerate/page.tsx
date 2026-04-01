import React from "react";
import { Box } from "@mui/material";
import { Metadata } from "next";
import Header from "@/components/DomainPage/Header";
import About from "@/components/DomainPage/About";
import MemberSection from "@/components/DomainPage/MemberSection";
import domains from "@/DataStore/store";

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

const page = () => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* <Box
          sx={{
            position: 'absolute',
            top: '25rem',
            left: '-32rem',
            background: "radial-gradient(circle, rgba(82,78,156,0.5) 0%, rgba(0,0,0,0) 70%)",
            width: '60rem',
            height: '60rem'
          }}
        /> */}

      <Header
        title={domains.tatva.pixelerate.title}
        subtitle={domains.tatva.pixelerate.branch}
        imageUrl={domains.tatva.pixelerate.cardUrl}
        fromColor="#7b68ee"
        toColor="#4b0082"
        to={{
          whatsappLink: domains.tatva.pixelerate.whatsappLink,
          direction: 'left'
        }}
        prvDomain="/wings/tatva/subclubs/webwiser"
        nextDomain="/wings/tatva/subclubs/appistry"
      />

      {/* <Box
          sx={{
            position: 'absolute',
            top: '80rem',
            left: '-30rem',
            background: "radial-gradient(circle, rgba(155,148,198,0.4) 0%, rgba(0,0,0,0) 40%)",
            width: '60rem',
            height: '60rem'
          }}
        /> */}
      <About
        title={domains.tatva.pixelerate.title}
        about={domains.tatva.pixelerate.description}
        message={domains.tatva.pixelerate.message}
        fromColor="#7b68ee"
        toColor="#4b0082"
        to="bottom"
      />

      <Box sx={{ my: 8 }}>
        <MemberSection
          members={domains.tatva.pixelerate.team.map((member, index) => ({
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
            background: "radial-gradient(circle, rgba(82,78 ,156,0.4) 0%, rgba(0,0,0,0) 60%)",
            width : '60rem',
            height : '60rem'
          }}
        /> */}
      {/* <Team
          teamData={domains.pixelerate.team}
        /> */}
    </Box>
  );
};

export default page;
