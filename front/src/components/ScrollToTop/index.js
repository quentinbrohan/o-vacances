import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'react-feather';
import './scrollToTop.scss';

const ScrollToTop = () => {
  const showBelow = 400;
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > showBelow) {
      setShowScroll(true);
    }
    else if (showScroll && window.pageYOffset <= showBelow) {
      setShowScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  });

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <ArrowUp
      className="scrollTop"
      onClick={scrollTop}
      style={{ height: '2rem', display: showScroll ? 'flex' : 'none' }}
    />
  );
};

export default ScrollToTop;
