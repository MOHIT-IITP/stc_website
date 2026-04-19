import AboutSection from "./components/about-section";
import { HeroSection } from "./components/hero-section";
import Events from "./components/featured-events";
import SponsorsSection from "./components/sponsors-section";
import ContactSection from "./components/contact-section";

export default function Page() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <Events />
      <SponsorsSection />
      <ContactSection />
    </>
  );
}
