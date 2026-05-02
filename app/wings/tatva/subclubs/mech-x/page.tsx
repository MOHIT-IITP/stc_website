"use client";

import React, { useState, useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';
import Header from '@/components/DomainPage/Header';
import About from '@/components/DomainPage/About';
import MemberSection from '@/components/DomainPage/MemberSection';
import domains from '@/DataStore/store';
import AppConfig from '@/config/appConfig'

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
      const response = await fetch('/api/public/members?clubId=mech_x');
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
    </Box>
  )
}

export default Page