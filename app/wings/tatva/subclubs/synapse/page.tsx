"use client";

import React, { useState, useEffect } from "react";
import { Box, Skeleton } from "@mui/material";
import Header from "@/components/DomainPage/Header";
import About from "@/components/DomainPage/About";
import MemberSection from "@/components/DomainPage/MemberSection";
import domains from "@/DataStore/store";

interface Member {
  _id: string;
  clubId: string;
  name: string;
  position: string;
  email: string;
  linkedin?: string;
  github?: string;
  imgUrl: string;
  order: number;
  isActive: boolean;
}

const Page = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch('/api/public/members?clubId=synapse');
      const data = await response.json();
      
      if (data.success) {
        setMembers(data.data);
      } else {
        console.error('Failed to fetch members:', data.error);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const memberData = members.map((member) => ({
    id: member._id,
    name: member.name,
    role: member.position,
    avatar: member.imgUrl,
    linkedin: member.linkedin,
    github: member.github,
    email: member.email,
  }));

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
                  {loading ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
                      {[1, 2, 3].map((index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 2, width: '100%', maxWidth: 600 }}>
                          <Skeleton variant="circular" width={80} height={80} />
                          <Box sx={{ flex: 1 }}>
                            <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
                            <Skeleton variant="text" width="40%" height={20} sx={{ mb: 1 }} />
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Skeleton variant="text" width={30} height={20} />
                              <Skeleton variant="text" width={30} height={20} />
                              <Skeleton variant="text" width={30} height={20} />
                            </Box>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <MemberSection members={memberData} />
                  )}
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

export default Page