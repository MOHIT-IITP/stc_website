"use client";

import React from 'react'
import { Box } from '@mui/material'
import Header from '@/components/DomainPage/Header'
import About from '@/components/DomainPage/About'
import MemberSection from '@/components/DomainPage/MemberSection'
import domains from '@/DataStore/store'
import AppConfig from '@/config/appConfig'

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