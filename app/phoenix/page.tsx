import AboutSection from "./components/about-section";
import { HeroSection } from "./components/hero-section";
import Events from "./components/featured-events";
import ContactSection from "./components/contact-section";
import SponsorsSection from "./components/sponsors-section";
import TeamSection from "./components/TeamSection";
import MarqueeSection from "./components/marquee-section";


export default function Page() {
  return (
    <>
      <div className="overflow-x-hidden">
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <Events />
        <SponsorsSection />
        {/* <TeamSection /> */}
        <ContactSection />
      </div>
    </>
  );
}
