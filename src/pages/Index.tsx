
import HeroSection from "@/components/HeroSection";
import MouseFollower from "@/components/MouseFollower";
import NavBar from "@/components/NavBar";
import { useEffect } from "react";

const Index = () => {
  // Set page title
  useEffect(() => {
    document.title = "Sculptor | Digital Experiences";
    
    // Prevent scrollbar jump on page load
    document.body.style.overflowY = "auto";
    document.documentElement.style.overflowY = "auto";
    
    return () => {
      document.body.style.overflowY = "";
      document.documentElement.style.overflowY = "";
    };
  }, []);

  return (
    <main className="relative min-h-screen">
      <MouseFollower />
      <NavBar />
      <HeroSection />
    </main>
  );
};

export default Index;
