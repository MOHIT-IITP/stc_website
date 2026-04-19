import Image from "next/image";
import Link from "next/link";
import AppConfig from "@/config/appConfig";

export function HeroSection() {
  const navItems = [
    { label: "About", href: "#about" },
    { label: "Event", href: "#event" },
    { label: "Sponsor", href: "#sponsor" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#020b09] pt-20">
      {/* Background Image */}
      <Image
src={AppConfig.imageUrls.phoenix.bg}
        alt="Hero Background"
        fill
        priority
        className="absolute inset-0 object-cover object-center z-10"
      />
      {/* <Image
src={AppConfig.imageUrls.phoenix.bg2}
        alt="Hero Blur Overlay"
        fill
        className="absolute inset-0 z-5  object-cover object-center opacity-30 "
      /> */}

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-20"
        style={{
          background:
            "linear-gradient(to bottom, rgba(9, 49, 40, 0.3) 0%, rgba(26, 141, 114, 0.3) 50%, rgba(9, 49, 40, 0.3) 100%)",
        }}
      />
      <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(0,0,0,0.45)_100%)]" />

      {/* Content */}
      <div className="relative z-30 mx-auto flex min-h-screen w-full max-w-[1188px] flex-col px-6 py-6 text-white sm:px-10 lg:px-12">
        <nav className="fixed top-0 left-0 right-0 z-50 flex h-24 items-center justify-between px-6 sm:px-10 lg:px-12">
          <Image
    src={AppConfig.imageUrls.phoenix.logo}
            alt="Phoenix"
            width={124}
            height={124}
            className="h-24 w-24 object-contain sm:h-[110px] sm:w-[110px] lg:h-[124px] lg:w-[124px] "
          />

          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-10 rounded-2xl bg-[#173b31]/78 px-10 py-3 text-[18px] font-light text-white/92 shadow-[0_14px_36px_rgba(0,0,0,0.18)] backdrop-blur-md sm:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="flex flex-1 items-center justify-center pb-[12vh] pt-[10vh] sm:pb-[14vh] sm:pt-[10vh] lg:pb-[16vh] lg:pt-[12vh]">
          <Image
    src={AppConfig.imageUrls.phoenix.phoenix}
            alt="Hero Text"
            width={900}
            height={400}
            className="h-[45vh] w-[min(70vw,800px)] min-w-[300px] -ml-10 drop-shadow-[0_16px_32px_rgba(0,0,0,0.3)] sm:w-[min(60vw,800px)] lg:w-[min(40vw)]"
          />
        </div>
      </div>

      <Image
src={AppConfig.imageUrls.phoenix.stars}
        alt=""
        width={420}
        height={240}
        className="pointer-events-none absolute right-[3%] top-[5%] z-30 w-64 -rotate-[8deg] opacity-45 sm:w-80 lg:w-[400px]"
      />
    </section>
  );
}
