
import { useState, useEffect } from 'react';
import gsap from 'gsap';

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  
  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
      
      // Add scale effect to elements with data-hover-scale attribute
      const elements = document.querySelectorAll('[data-hover-scale]');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from mouse to element center
        const distanceX = ev.clientX - centerX;
        const distanceY = ev.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        // Scale based on proximity (closer = bigger)
        const maxDistance = 300; // px
        if (distance < maxDistance) {
          const scale = 1 + (0.2 * (1 - distance / maxDistance));
          
          // Use GSAP for smoother transitions
          gsap.to(el, {
            scale: scale,
            duration: 0.5,
            ease: "power2.out"
          });
        } else {
          gsap.to(el, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  
  return mousePosition;
}
