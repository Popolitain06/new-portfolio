import { useEffect } from "react";

const NegativeCursorEffect = () => {
  useEffect(() => {
    const cursorDiv = document.createElement('div');
    cursorDiv.style.position = 'fixed';
    cursorDiv.style.width = '50px';
    cursorDiv.style.height = '50px';
    cursorDiv.style.borderRadius = '50%';
    cursorDiv.style.pointerEvents = 'none';
    cursorDiv.style.zIndex = '10000';
    cursorDiv.style.mixBlendMode = 'difference';
    cursorDiv.style.backgroundColor = 'white';
    document.body.appendChild(cursorDiv);

    const enlargeCursor = () => {
      cursorDiv.style.width = '200px';
      cursorDiv.style.height = '200px';
    };

    const resetCursor = () => {
      cursorDiv.style.width = '50px';
      cursorDiv.style.height = '50px';
      cursorDiv.style.transition = 'width 0.3s, height 0.3s';
    };

    const targetElements = document.querySelectorAll('.hero-cursor-target');

    targetElements.forEach(element => {
      element.addEventListener('mouseenter', enlargeCursor);
      element.addEventListener('mouseleave', resetCursor);
    });

    const moveCursor = (e) => {
      cursorDiv.style.left = `${e.clientX - cursorDiv.offsetWidth / 2}px`;
      cursorDiv.style.top = `${e.clientY - cursorDiv.offsetHeight / 2}px`;
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      targetElements.forEach(element => {
        element.removeEventListener('mouseenter', enlargeCursor);
        element.removeEventListener('mouseleave', resetCursor);
      });
      document.body.removeChild(cursorDiv);
    };
  }, []);

  return null;
};

export default NegativeCursorEffect;
