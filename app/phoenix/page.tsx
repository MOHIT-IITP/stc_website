import { Box } from "@mui/material";
import Image from "next/image";

export default function Page() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('/phoenix/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        position: "relative",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* Main Logo - Top */}
      <Box
        sx={{
          position: "absolute",
          top: "1%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Image
          src="/phoenix/Main logo.png"
          alt="Main Logo"
          width={250}
          height={250}
          priority
          style={{
            width: "auto",
            height: "auto",
            maxWidth: "400px",
            maxHeight: "400px",
          }}
        />
      </Box>

      {/* Typographic Logo - Centered */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80vw",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src="/phoenix/typographic logo.png"
          alt="Typographic Logo"
          width={1000}
          height={1000}
          priority
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Box>

      {/* Coming Soon Text */}
      <Box
        sx={{
          position: "absolute",
          top: "75%",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "44px",
            fontFamily: "'Bookman Old Style', serif",
            fontWeight: "400",
            color: "#D3D3D3",
            margin: 0,
            letterSpacing: "0.5px",
          }}
        >
          COMING SOON
        </p>
      </Box>
    </Box>
  );
}
