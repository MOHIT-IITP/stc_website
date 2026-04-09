"use client";

import React from 'react'
import { Box } from '@mui/material'
import Header from '@/components/DomainPage/Header'
import About from '@/components/DomainPage/About'
import MemberSection from '@/components/DomainPage/MemberSection'
import domains from '@/DataStore/store'

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