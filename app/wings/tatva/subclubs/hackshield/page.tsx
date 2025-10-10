import React from "react";
import { Box, Typography } from "@mui/material";
import Header from "@/components/DomainPage/Header";
import About from "@/components/DomainPage/About";
import MemberSection from "@/components/DomainPage/MemberSection";
import domains from "@/DataStore/store";

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
        title={domains.hackershield.title}
        subtitle={domains.hackershield.branch}
        imageUrl={domains.hackershield.cardUrl}
        fromColor="#B53fff"
        toColor="#e590e3"
        to="left"
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
        title={domains.hackershield.title}
        about={domains.hackershield.description}
        message={domains.hackershield.message}
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
          members={domains.hackershield.team.map((member, index) => ({
          id: `member-${index + 1}`,
          name: member.name,
          role: member.position,
          avatar: member.imgUrl,
          achievements: [
          `Active contributor to HackShield's success`,
          'Participated in multiple web development projects',
          'Helped organize workshops and events'
          ]
        }))}
        />
      </Box>

    </Box>
  );
};

export default page;

