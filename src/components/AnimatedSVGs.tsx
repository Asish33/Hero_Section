
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CircleSVG = ({ className }: { className?: string }) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    const circle = ref.current.querySelector('circle');
    
    gsap.to(circle, {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'power3.inOut'
    });
  }, []);

  return (
    <svg ref={ref} className={className} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="url(#circleGradient)"
        strokeWidth="2"
        strokeDasharray="283"
        strokeDashoffset="283"
        fill="none"
      />
      <defs>
        <linearGradient id="circleGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4F46E5" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const WaveSVG = ({ className }: { className?: string }) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    const paths = ref.current.querySelectorAll('path');
    
    gsap.fromTo(paths, 
      { strokeDashoffset: 1000 },
      { 
        strokeDashoffset: 0, 
        duration: 2.5, 
        stagger: 0.2,
        ease: "sine.inOut"
      }
    );
    
    // Create a continuous wave animation
    paths.forEach((path, index) => {
      gsap.to(path, {
        y: "random(-5, 5)",
        duration: "random(2, 5)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.2
      });
    });
    
  }, []);

  return (
    <svg ref={ref} className={className} width="300" height="50" viewBox="0 0 300 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 25C50 10 75 40 150 25C225 10 250 40 300 25" stroke="rgba(79, 70, 229, 0.2)" strokeWidth="1" strokeDasharray="1000" strokeDashoffset="1000" fill="none"/>
      <path d="M0 25C50 10 75 40 150 25C225 10 250 40 300 25" stroke="rgba(79, 70, 229, 0.4)" strokeWidth="1" strokeDasharray="1000" strokeDashoffset="1000" fill="none" transform="translate(0, 5)"/>
      <path d="M0 25C50 10 75 40 150 25C225 10 250 40 300 25" stroke="rgba(79, 70, 229, 0.6)" strokeWidth="1" strokeDasharray="1000" strokeDashoffset="1000" fill="none" transform="translate(0, 10)"/>
    </svg>
  );
};

export const GridSVG = ({ className }: { className?: string }) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    const lines = ref.current.querySelectorAll('line');
    
    gsap.fromTo(lines, 
      { opacity: 0, drawSVG: "0%" },
      { 
        opacity: 0.2, 
        drawSVG: "100%", 
        duration: 1.5, 
        stagger: 0.05,
        ease: "power1.inOut"
      }
    );
  }, []);

  return (
    <svg ref={ref} className={className} width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
      {Array.from({ length: 10 }).map((_, i) => (
        <line 
          key={`v-${i}`}
          x1={i * 40} 
          y1="0" 
          x2={i * 40} 
          y2="400" 
          stroke="rgba(79, 70, 229, 0.1)" 
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <line 
          key={`h-${i}`}
          x1="0" 
          y1={i * 40} 
          x2="400" 
          y2={i * 40} 
          stroke="rgba(79, 70, 229, 0.1)" 
          strokeWidth="1"
        />
      ))}
    </svg>
  );
};
