
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 
      ${isScrolled 
        ? 'glass border-b border-white/10 py-3' 
        : 'bg-transparent py-5'}`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-bold tracking-tighter animate-fade-in opacity-0"
          style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
        >
          Sculptor
        </Link>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {['Home', 'Work', 'About', 'Contact'].map((item, index) => (
              <li key={item} className="opacity-0 animate-fade-in" style={{ animationDelay: `${400 + index * 100}ms`, animationFillMode: 'forwards' }}>
                <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="link-underline text-sm font-medium">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <button 
          className="opacity-0 animate-fade-in md:hidden text-sm py-2 px-4 rounded-full glass transition-all-300 hover:bg-white/20"
          style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
        >
          Menu
        </button>
      </div>
    </header>
  );
}
