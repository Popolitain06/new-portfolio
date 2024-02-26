'use client';
import React, { useEffect, useRef } from 'react'; // Importation de React
import gsap from 'gsap';

// Déclaration de l'interface en dehors du composant
interface NegativeCursorEffectProps {
  onStart: () => void;
  onComplete: () => void;
}

const TransitionEffect: React.FC<NegativeCursorEffectProps> = ({ onStart, onComplete }) =>  {
  // Utilisation de TypeScript pour typer les refs
  const transitionRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // S'assurer que le code s'exécute côté client et que `audioRef.current` n'est pas déjà défini
    if (typeof window !== "undefined" && !audioRef.current) {
      audioRef.current = new Audio('/sounds/transition1.wav');
    }
    
    if (transitionRef.current && audioRef.current) {
      const tl = gsap.timeline({
        onStart: () => {
          // S'assurer que audioRef.current n'est pas null avant de l'appeler
          if (audioRef.current) {
            onStart();
            audioRef.current.play().catch((error) => console.error("Audio playback failed", error));
          }
        },
        onComplete: () => {
          // S'assurer que onComplete est appelé seulement si audioRef.current n'est pas null
          if (audioRef.current && onComplete) {
            onComplete();
          }
        },
      });

      tl.set(transitionRef.current, { y: '100%' })
        .to(transitionRef.current, { y: '0%', duration: 0.75, ease: 'power3.inOut', opacity: 1 })
        .to(transitionRef.current, { y: '-100%', duration: 0.75, ease: 'power3.inOut', delay: 0.5 });
    }

    // Nettoyage pour s'assurer que l'audio est arrêté si le composant est démonté avant la fin de l'animation
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return <div ref={transitionRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#F62992', zIndex: 9999, opacity: 0 }} />;
};

export default TransitionEffect;
