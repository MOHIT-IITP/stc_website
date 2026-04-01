import React from "react";
import { Box } from "@mui/material";
import { Metadata } from "next";
import Header from "@/components/DomainPage/Header";
import About from "@/components/DomainPage/About";
import MemberSection from "@/components/DomainPage/MemberSection";
import domains from "@/DataStore/store";

export const metadata: Metadata = {
  title: 'HackShield - Cybersecurity Club | Student Technical Council IIT Patna Hybrid Programs',
  description: 'HackShield is the cybersecurity club under Tatva wing of STC at IIT Patna. Learn ethical hacking, penetration testing, network security, and cryptography.',
  keywords: [
    'HackShield',
    'cybersecurity',
    'Student Technical Council IIT Patna Hybrid Programs',
    'Tatva',
    'ethical hacking',
    'penetration testing',
    'network security',
    'cryptography',
    'IIT Patna STC',
    'security club',
  ],
  authors: [{ name: 'IIT Patna Student Technical Council' }],
  creator: 'IIT Patna STC',
  publisher: 'IIT Patna',
  
  openGraph: {
    title: 'HackShield - Cybersecurity Club | Student Technical Council IIT Patna Hybrid Programs',
    description: 'HackShield - Learn ethical hacking, penetration testing, and network security at IIT Patna.',
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
    title: 'HackShield - Cybersecurity Club | Student Technical Council IIT Patna Hybrid Programs',
    description: 'Learn ethical hacking and cybersecurity at IIT Patna.',
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
    'page:section': 'tatva-hackshield',
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
            "radial-gradient(circle, rgba(138,19,139,0.5) 0%, rgba(0,0,0,0) 70%)",
          width: "60rem",
          height: "60rem",
        }}
      /> */}

      <Header
        title={domains.tatva.hackshield.title}
        subtitle={domains.tatva.hackshield.branch}
        imageUrl={domains.tatva.hackshield.cardUrl}
        fromColor="#B53fff"
        toColor="#e590e3"
        to={{
          whatsappLink: domains.tatva.hackshield.whatsappLink,
          direction: 'left'
        }}
        prvDomain="/wings/tatva/subclubs/synapse"
        nextDomain="/wings/tatva/subclubs/codered"
      />

      {/* <Box
        sx={{
          position: 'absolute',
          top: '80rem',
          left: '-30rem',
          background: 'radial-gradient(circle, rgba(178,49,174,0.4) 0%, rgba(0,0,0,0) 40%)',
          width: '60rem',
          height: '60rem',
        }}
      /> */}
      <About
        title={domains.tatva.hackshield.title}
        about={domains.tatva.hackshield.description}
        message={domains.tatva.hackshield.message}
        fromColor="#B53fff"
        toColor="#e590e3"
        to="right"
      />
      {/* <Box
        sx={{
          position: "absolute",
          zIndex: "5",
          top: "100rem",
          right: "-32rem",
          background:
            "radial-gradient(circle, rgba(178,49,174,0.4) 0%, rgba(0,0,0,0) 60%)",
          width: "60rem",
          height: "60rem",
        }}
      /> */}
      <Box sx={{ my: 8 }}>
        <MemberSection
          members={domains.tatva.hackshield.team.map((member, index) => ({
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

