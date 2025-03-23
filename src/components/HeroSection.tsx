
import { useEffect, useRef, useState } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';
import { CircleSVG, WaveSVG, GridSVG } from './AnimatedSVGs';
import gsap from 'gsap';

export default function HeroSection() {
  const { x, y } = useMousePosition();
  const heroRef = useRef<HTMLDivElement>(null);
  const [mouseRelativePos, setMouseRelativePos] = useState({ x: 0, y: 0 });
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  // Calculate mouse position relative to the hero section
  useEffect(() => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const relX = ((x - rect.left) - centerX) / centerX;
      const relY = ((y - rect.top) - centerY) / centerY;
      
      setMouseRelativePos({ x: relX * 0.1, y: relY * 0.05 });
    }
  }, [x, y]);
  
  // GSAP animations
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.5
    })
    .from(descriptionRef.current, {
      y: 30,
      opacity: 0,
      duration: 1
    }, "-=0.5")
    .from(ctaRef.current?.children, {
      y: 20,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8
    }, "-=0.7");
    
    // Parallax effect
    const moveElements = (e: MouseEvent) => {
      const xValue = (e.clientX - window.innerWidth / 2) / 20;
      const yValue = (e.clientY - window.innerHeight / 2) / 20;
      
      gsap.to(".parallax-element", {
        x: xValue,
        y: yValue,
        duration: 1,
        ease: "power1.out"
      });
    };
    
    window.addEventListener('mousemove', moveElements);
    
    return () => {
      window.removeEventListener('mousemove', moveElements);
    };
  }, []);
  
  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 to-white"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-soft-light"></div>
      
      {/* Background SVG Grid */}
      <GridSVG className="parallax-element" />
      
      {/* Floating circles */}
      <div 
        data-hover-scale="true"
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-300/20 to-indigo-300/20 blur-3xl animate-float transition-transform duration-300 parallax-element"
        style={{ 
          transform: `translate3d(${mouseRelativePos.x * 30}px, ${mouseRelativePos.y * 30}px, 0)`,
          animationDelay: '-2s',
        }}
      ></div>
      
      <div 
        data-hover-scale="true"
        className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-gradient-to-r from-blue-200/20 to-purple-200/20 blur-3xl animate-float transition-transform duration-300 parallax-element"
        style={{ 
          transform: `translate3d(${mouseRelativePos.x * -20}px, ${mouseRelativePos.y * -20}px, 0)`,
          animationDelay: '-1s',
        }}
      ></div>
      
      <CircleSVG className="absolute top-20 right-20 parallax-element" />
      <CircleSVG className="absolute bottom-20 left-20 parallax-element" />
      <WaveSVG className="absolute bottom-20 left-1/2 transform -translate-x-1/2 parallax-element" />
      
      <div 
        data-hover-scale="true"
        className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-gradient-to-r from-indigo-200/10 to-purple-300/10 blur-3xl animate-float transition-transform duration-300 parallax-element"
        style={{ 
          transform: `translate3d(${mouseRelativePos.x * 10}px, ${mouseRelativePos.y * 10}px, 0)`,
          animationDelay: '-3s',
        }}
      ></div>
      
      {/* Content container */}
      <div className="relative z-10 container px-6 mx-auto">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Tag */}
          <span 
            data-hoverable="true"
            className="inline-block py-1 px-3 text-xs tracking-wide font-medium uppercase rounded-full glass border border-white/30 mb-6"
          >
            Transforming ideas into reality
          </span>
          
          {/* Headline */}
          <h1 
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-8 max-w-4xl"
          >
            <span 
              data-hoverable="true"
              className="text-gradient inline-block transition-transform duration-300"
              style={{ 
                transform: `translate3d(${mouseRelativePos.x * -5}px, ${mouseRelativePos.y * -5}px, 0)`,
              }}
            >
              Crafting Digital
            </span>{' '}
            <br />
            <span 
              data-hoverable="true"
              className="inline-block transition-transform duration-300"
              style={{ 
                transform: `translate3d(${mouseRelativePos.x * 5}px, ${mouseRelativePos.y * 5}px, 0)`,
              }}
            >
              Experiences That Matter
            </span>
          </h1>
          
          {/* Description */}
          <p 
            ref={descriptionRef}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10"
          >
            We combine minimalist design with powerful technology to create meaningful digital products that elevate your brand.
          </p>
          
          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              data-hoverable="true"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform"
            >
              Our Work
            </button>
            <button 
              data-hoverable="true"
              className="px-8 py-3 rounded-full glass hover:bg-white/20 text-gray-800 font-medium transition-all-300 border border-white/30"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        data-hoverable="true" 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-transform duration-300"
      >
        <div className="w-6 h-10 rounded-full border-2 border-gray-400 flex justify-center pt-2">
          <div className="w-1 h-2 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
