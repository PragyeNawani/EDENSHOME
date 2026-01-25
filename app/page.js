import Image from "next/image";
import EdensHome from "@/components/EdensHome";
import HeroSection from "@/components/HeroSection";
import AboutPage from "@/components/AboutPage";
import ContactPage from "@/components/ContactPage";
import FAQPage from "@/components/FAQPage";
export default function Home() {
  return (
    <>
    <EdensHome/>
    <AboutPage/>
    <ContactPage/>
    <FAQPage/>
    </>
  );
}
