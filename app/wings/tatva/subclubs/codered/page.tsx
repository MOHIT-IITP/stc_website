import React from "react";
import { Box } from "@mui/material";
import { Metadata } from "next";
import Header from "@/components/DomainPage/Header";
import About from "@/components/DomainPage/About";
import MemberSection from "@/components/DomainPage/MemberSection";
import domains from "@/DataStore/store";

export const metadata: Metadata = {
  title: 'CodeRed - Competitive Programming Club | Student Technical Council IIT Patna Hybrid Programs',
  description: 'CodeRed is the competitive programming club under Tatva wing of STC at IIT Patna. Master algorithms, data structures, and problem-solving through coding competitions and practice sessions.',
  keywords: [
    'CodeRed',
    'competitive programming',
    'Student Technical Council IIT Patna Hybrid Programs',
    'Tatva',
    'algorithms',
    'data structures',
    'coding competitions',
    'problem solving',
    'IIT Patna STC',
    'CP club',
  ],
  authors: [{ name: 'IIT Patna Student Technical Council' }],
  creator: 'IIT Patna STC',
  publisher: 'IIT Patna',
  
  openGraph: {
    title: 'CodeRed - Competitive Programming Club | Student Technical Council IIT Patna Hybrid Programs',
    description: 'CodeRed - Master competitive programming, algorithms, and data structures at IIT Patna.',
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
    title: 'CodeRed - Competitive Programming Club | Student Technical Council IIT Patna Hybrid Programs',
    description: 'Master competitive programming and algorithms at IIT Patna.',
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
    'page:section': 'tatva-codered',
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
          position: "absolute",
          top: "25rem",
          left: "-32rem",
          background:
            "radial-gradient(circle, rgba(255,55,18,0.5) 0%, rgba(0,0,0,0) 70%)",
          width: "60rem",
          height: "60rem",
        }}
      /> */}

      <Header
        title={domains.tatva.code_red.title}
        subtitle={domains.tatva.code_red.branch}
        imageUrl={domains.tatva.code_red.cardUrl}
        fromColor="#e51111"
        toColor="#1E1637"
        to={{
          whatsappLink: domains.tatva.code_red.whatsappLink,
          direction: 'left'
        }}
        prvDomain="/wings/tatva/subclubs/hackshield"
        nextDomain="/wings/tatva/subclubs/tech-hub"
      />
      {/* <Box
        sx={{
          position: "absolute",
          top: "80rem",
          left: "-30rem",
          background:
            "radial-gradient(circle, rgba(178,49,49,0.4) 0%, rgba(0,0,0,0) 40%)",
          width: "60rem",
          height: "60rem",
        }}
      /> */}
      <About
        title={domains.tatva.code_red.title}
        about={domains.tatva.code_red.description}
        message={domains.tatva.code_red.message}
        fromColor="#e51111"
        toColor="#1E1637"
        to=""
      />
      {/* <Box
        sx={{
          position: "absolute",
          zIndex: "5",
          top: "100rem",
          right: "-32rem",
          background:
            "radial-gradient(circle, rgba(178,49,49,0.4) 0%, rgba(0,0,0,0) 60%)",
          width: "60rem",
          height: "60rem",
        }}
      /> */}
      <Box sx={{ my: 8 }}>
        <MemberSection
          members={domains.tatva.code_red.team.map((member, index) => ({
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
  );
};

export default page;

