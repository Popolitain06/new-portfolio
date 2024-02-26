'use client'
import { useEffect } from 'react';

const NegativeCursorEffect = () => {
  useEffect(() => {
    // Créer la div du curseur
    const cursorDiv = document.createElement('div');
    cursorDiv.style.position = 'fixed';
    cursorDiv.style.width = '50px'; // Taille de l'effet négatif
    cursorDiv.style.height = '50px';
    cursorDiv.style.borderRadius = '50%'; // Rendre le curseur circulaire
    cursorDiv.style.pointerEvents = 'none'; // S'assurer que la div ne bloque pas les clics
    cursorDiv.style.zIndex = '10000'; // S'assurer que la div est au-dessus des autres éléments
    cursorDiv.style.mixBlendMode = 'difference'; // Appliquer l'effet négatif
    cursorDiv.style.backgroundColor = 'white'; // Couleur de l'effet
    document.body.appendChild(cursorDiv);

    const enlargeCursor = () => {
      cursorDiv.style.width = '200px'; // Taille élargie
      cursorDiv.style.height = '200px';
      cursorDiv.style.transition = 'width 0.3s, height 0.3s';
    };

    const resetCursor = () => {
      cursorDiv.style.width = '50px'; // Taille normale
      cursorDiv.style.height = '50px';
    };

    // Sélectionnez les éléments par leurs classes ou identifiants
    const headingElement = document.querySelector('.hero-cursor-target');


    // Écoutez les événements de survol
    headingElement.addEventListener('mouseenter', enlargeCursor);
    headingElement.addEventListener('mouseleave', resetCursor);

    // Mettre à jour la position de la div en fonction de la position de la souris
    const moveCursor = (e) => {
      cursorDiv.style.left = e.clientX - cursorDiv.offsetWidth / 2 + 'px';
      cursorDiv.style.top = e.clientY - cursorDiv.offsetHeight / 2 + 'px';
    };

    window.addEventListener('mousemove', moveCursor);

    // Nettoyage en enlevant la div et l'écouteur d'événements
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeChild(cursorDiv);
    };
  }, []);

  return null; // Ce composant n'a pas besoin de rendre quoi que ce soit dans le DOM React
};

export default NegativeCursorEffect;
