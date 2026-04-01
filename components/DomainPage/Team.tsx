import { Box, Typography } from "@mui/material";
import React from "react";
import MemberCard from "@/components/MemberCard";

type TeamMember = {
  name: string;
  position: string;
  imgUrl: string;
};

type TeamProps = {
  teamData: TeamMember[];
};

const Team: React.FC<TeamProps> = ({ teamData }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        alignItems: "center",
        gap: "2rem",
        textAlign: "center",
      }}
    >
      <Typography
        className="audiowide-font"
        sx={{
          fontSize: "4rem",
        }}
      >
        Team
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap-reverse",
          justifyContent: "center",
          alignItems: "center",

          gap: "4rem",
          zIndex: "10",

          padding: "0 4rem",
        }}
      >
        {teamData.map((memberData, index) => (
          <MemberCard
            key={`${memberData.name}-${index}`}
            memberData={memberData}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Team;
