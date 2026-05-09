import AboutSection from "./components/about-section";
import { HeroSection } from "./components/hero-section";
import Events from "./components/featured-events";
import ContactSection from "./components/contact-section";
import SponsorsSection from "./components/sponsors-section";
import TeamSection from "./components/TeamSection";
import MarqueeSection from "./components/marquee-section";
import Footer from "./components/footer";
import VideoLoader from "./components/VideoLoader";

export default function Page() {
  return (
    <>
      {/* <VideoLoader /> */}
      <div className="overflow-x-hidden">
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <Events />
        <SponsorsSection />
        <TeamSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}
