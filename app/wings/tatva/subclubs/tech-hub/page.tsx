'use client';

import React from 'react';
import { Box } from '@mui/material';
import Header from '@/components/DomainPage/Header';
import About from '@/components/DomainPage/About';
import MemberSection from '@/components/DomainPage/MemberSection';
import domains from '@/DataStore/store';

const TechHubPage = () => {
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
            background: "radial-gradient(circle, rgba(245,92,81,0.5) 0%, rgba(0,0,0,0) 70%)",
            width : '60rem',
            height : '60rem'
          }}
        /> */}

        
        <Header
          title={domains.tatva.tech_hub.title}
          subtitle= {domains.tatva.tech_hub.branch}
          imageUrl= {domains.tatva.tech_hub.cardUrl}
          fromColor="#fcb224"
          toColor="#f3465d"
          to={{
            whatsappLink: domains.tatva.tech_hub.whatsappLink,
            direction: 'left'
          }}
          prvDomain='/wings/tatva/subclubs/codered'
          nextDomain='/wings/tatva/subclubs/mech-x'

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
          
          title={domains.tatva.tech_hub.title}
          about={domains.tatva.tech_hub.description}
          message={domains.tatva.tech_hub.message}
          fromColor= "fcb224"
          toColor="#f3465d"
          to=''
        />

        <Box sx={{ my: 8 }}>
          <MemberSection
            members={domains.tatva.tech_hub.team.map((member, index) => ({
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
            background: "radial-gradient(circle, rgba(178,98,49,0.4) 0%, rgba(0,0,0,0) 60%)",
            width : '60rem',
            height : '60rem'
          }}
        /> */}
        
        
        {/* <Team
          teamData={domains.tech_hub.team}
        /> */}
        
    </Box>
  )
}

export default TechHubPage