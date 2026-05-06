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
      const response = await fetch('/api/public/members?clubId=code_red');
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
        {loading ? (
          <div className="py-8 sm:py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {[1, 2, 3].map((index) => (
                  <div key={index} className="flex justify-center">
                    <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] rounded-2xl sm:rounded-3xl bg-gradient-to-b from-gray-300/60 to-gray-500/60 shadow-md sm:shadow-lg overflow-hidden relative">
                      {/* Profile Image Skeleton */}
                      <div className="w-full h-full bg-gray-400/50 animate-pulse">
                        <div className="w-full h-full bg-gradient-to-b from-gray-300 to-gray-400"></div>
                      </div>
                      
                      {/* Bottom Overlay Gradient */}
                      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/80 to-transparent"></div>
                      
                      {/* Bottom Section Skeleton */}
                      <div className="absolute bottom-2 sm:bottom-4 left-0 w-full flex justify-center px-2">
                        <div className="w-[95%] flex items-center justify-between bg-white/20 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm">
                          {/* Name and Position Skeleton */}
                          <div className="text-left">
                            <div className="w-24 sm:w-32 h-4 sm:h-5 bg-white/60 rounded animate-pulse mb-1"></div>
                            <div className="w-16 sm:w-20 h-3 sm:h-4 bg-white/40 rounded animate-pulse"></div>
                          </div>
                          {/* Social Icons Skeleton */}
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-white/60 rounded-full animate-pulse"></div>
                            <div className="w-4 h-4 bg-white/60 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <MemberSection members={memberData} />
        )}
      </Box>

    </Box>
  );
};

export default Page;

