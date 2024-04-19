import './ScrollToTopButton.scss'
import React, { useState, useEffect } from 'react';

    const ScrollToTopButton = () => {
        const [isVisible, setIsVisible] = useState(false);
      
        const handleScroll = () => {
          const scrollPosition = window.scrollY;
          // You can adjust the scroll threshold based on your design
          const threshold = 100;
      
          setIsVisible(scrollPosition > threshold);
        };
      
        const scrollToTop = () => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth', // Optional: Add smooth scrolling behavior
          });
        };
      
        useEffect(() => {
          window.addEventListener('scroll', handleScroll);
      
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
        }, []);
      
        return (
          <button
            className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`}
            onClick={scrollToTop}
          >
            ↑
          </button>
        );
      };
      export default ScrollToTopButton;





 
