
import { useMousePosition } from '@/hooks/useMousePosition';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function MouseFollower() {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);
  const [targetSize, setTargetSize] = useState({ width: 0, height: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const followerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.dataset.hoverable === 'true';
      
      setIsHovering(!!isLink);
      
      if (isLink) {
        // Get the bounding rect of the target element
        const rect = (target.closest('a') || target.closest('button') || target).getBoundingClientRect();
        setTargetSize({ width: rect.width, height: rect.height });
        setTargetPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }
    };
    
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', () => setIsHovering(false));
    
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', () => setIsHovering(false));
    };
  }, []);
  
  useEffect(() => {
    const follower = followerRef.current;
    if (!follower) return;
    
    // Using GSAP for smoother animations
    if (isHovering) {
      gsap.to(follower, {
        x: targetPos.x,
        y: targetPos.y,
        width: targetSize.width,
        height: targetSize.height,
        borderRadius: 4,
        scale: 1.15,
        duration: 0.4,
        ease: "power2.out"
      });
    } else {
      gsap.to(follower, {
        x: x,
        y: y,
        width: 40,
        height: 40,
        borderRadius: '50%',
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [x, y, isHovering, targetSize, targetPos]);
  
  return (
    <div 
      ref={followerRef} 
      className={`mouse-follower fixed pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 ${isHovering ? 'over-link' : ''}`}
      style={{ 
        opacity: x === 0 && y === 0 ? 0 : 1,
        backgroundColor: 'rgba(0, 102, 255, 0.1)',
        transition: 'opacity 0.3s ease',
        willChange: 'transform, width, height'
      }}
    />
  );
}
