import AboutSection from "./components/about-section";
import { HeroSection } from "./components/hero-section";
import Events from "./components/featured-events";
import ContactSection from "./components/contact-section";


export default function Page() {
  return (
    <>
      <div>
        <HeroSection />
        <AboutSection />
        <Events />
        <ContactSection />
      </div>
    </>
  );
}
