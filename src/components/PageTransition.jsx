import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const PageTransition = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }
    );
  }, []);

  return <div ref={containerRef}>{children}</div>;
};

export default PageTransition;
