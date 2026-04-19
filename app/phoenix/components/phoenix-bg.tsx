import AppConfig from "@/config/appConfig";

export default function PhoenixBg() {
  return (
    <>
      {/* SVG gradient overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-5"
        style={{
          backgroundImage: `url('${AppConfig.imageUrls.phoenix.aboutGradient}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.9,
        }}
      />

      {/* Stars overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-6"
        style={{
          backgroundImage: `url('${AppConfig.imageUrls.phoenix.aboutStars}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
        }}
      />

      {/* Background starry layers */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-4"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "120px 120px, 60px 60px",
          backgroundPosition: "0 0, 30px 30px",
          opacity: 0.6,
        }}
      />
    </>
  );
}
