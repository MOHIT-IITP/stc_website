import Image from "next/image";

export function HeroSection() {
  return (
    <div className="relative h-screen w-full overflow-hidden">

      {/* Background Image */}
      <img
          src="../"
          alt="Hero Background"
        className="object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20">
        <nav className="flex items-center justify-between flex-wrap p-6 text-white">
          <h1 className="text-xl font-bold">Your Logo</h1>
        </nav>

        <div className="flex items-center justify-center h-[80%] text-white">
          <h2 className="text-4xl font-bold">Hero Section</h2>
        </div>
      </div>

    </div>
  );
}