'use client'
import React, { useEffect, } from 'react'
import { ReactFragment } from 'react';
import { Content, asImageSrc, isFilled } from '@prismicio/client';
import Link from 'next/link';
import { MdArrowOutward } from "react-icons/md";
import { useRef} from 'react';
import {gsap} from 'gsap';
import NegativeCursorEffect from "./NegativeCursorEffect";


type ContentListProps = {
  items: Content.BlogPostDocument[] | Content.ProjectDocument[];
  contentType: Content.ContentIndexSlice["primary"]["content_type"];
  fallbackItemImage: Content.ContentIndexSlice["primary"]["fallback_item_image"];
  viewMoreText: Content.ContentIndexSlice["primary"]["view_more_text"];
}


export default function ContentList({items, contentType, viewMoreText, fallbackItemImage}: ContentListProps) {
  
const component = useRef(null);
const revealRef = useRef<HTMLDivElement>(null);
const containerRef = useRef<HTMLDivElement>(null);
const [currentItem, setCurrentItem] = React.useState<null | number>(null);


const contentImages = items.map((item) => {
  const image = isFilled.image(item.data.hover_image) ? item.data.hover_image : fallbackItemImage;
  
  return asImageSrc(image, {
    fit : "crop",
    w: 220,
    h: 320,
    q: 90
  });
  
});

useEffect(() => {
  contentImages.forEach((url) => {
    
    if(!url)return;
    const img = new Image();
    img.src = url
  })
}, [contentImages]);

const lastMousePos = useRef({x: 0, y: 0})

const urlPrefix = contentType === "Blog" ? "/blog" : "/project";

const startGlitchEffect = () => {
  
  // Sélectionnez toutes les divs de glitch dans le conteneur
  const glitchDivs = containerRef.current?.querySelectorAll('.glitch-img');

  gsap.set(revealRef.current, { opacity: 0 });

  const soundEffects = [
    new Audio("/sounds/glitch3.wav"),
    new Audio("/sounds/glitch2.wav"),
    new Audio("/sounds/glitch.wav"),
];

  glitchDivs?.forEach((div, i) => {


    soundEffects.forEach(sound => {
      sound.volume = 0.1;
    });

    const tl = gsap.timeline({
      repeat: 1,
      repeatDelay: 0.2,
      onStart: () => {
        gsap.utils.random(soundEffects).play();
        gsap.set(revealRef.current, { opacity: 0 });
      },
      onComplete: () => {
        soundEffects.forEach(sound => {
          sound.pause();
          sound.currentTime = 0; // Réinitialisez le temps pour la prochaine fois
        });
      }
    });

    
    
    tl.to(div, {
      duration: 0.05,
      clipPath: `polygon(0 ${i * 10}% , 100% ${i * 10}%, 100% ${(i + 1) * 10}%, 0 ${(i + 1) * 10}%)`,
      x: gsap.utils.random(-20, 60, 5),
      y: gsap.utils.random(-20, 20, 5),
      opacity: 1,
      ease: "elastic.out(1,0.1)",
    });

    if (i === Math.floor(glitchDivs.length / 2)) { // À mi-chemin de l'effet de glitch
      tl.to(revealRef.current, {
        opacity: 1,
        duration: 0.1,
        ease: "power2.inOut",
      }, "<"); // Utilisez "<" pour démarrer en même temps que l'animation précédente
    }
    
    tl.to(div, {
      duration: 0.05,
      clipPath: `polygon(0 ${i * 5}% , 100% ${i * 5}%, 100% ${(i + 1) * 5}%, 0 ${(i + 1) * 5}%)`,
      x: gsap.utils.random(-20, 20, 5),
      y: gsap.utils.random(-20, 60, 5),
      skewX: gsap.utils.random(-10, 10, 5),
      opacity: 0,
      ease: "elastic.out(1,0.1)",
    }, ">");
    
    for (let j = 0; j < 2; j++) {  // Répéter l'effet de clignotement 5 fois
      tl.to(revealRef.current, { opacity: 0, duration: 0.1, ease: "power2.inOut" })
        .to(revealRef.current, { opacity: 1, duration: 0.1, ease: "power2.inOut" });
    }
    
    tl.to(div, {
      duration: 0.05,
      clipPath: `polygon(0 ${i * 3}% , 100% ${i * 12}%, 100% ${(i + 1) * 31}%, 0 ${(i + 1) * 7}%)`,
      x: gsap.utils.random(-20, 60, 5),
      y: gsap.utils.random(-20, 20, 5),
      opacity: 1,
      ease: "elastic.out(1,0.1)",
    }, ">");
    
    tl.to(div, {
      duration: 0.05,
      clipPath: `polygon(0 ${i * 3}% , 100% ${i * 12}%, 100% ${(i + 1) * 31}%, 0 ${(i + 1) * 7}%)`,
      x: gsap.utils.random(-20, 20, 5),
      y: gsap.utils.random(-20, 60, 5),
      skewX: gsap.utils.random(-10, 10, 5),
      opacity: 0,
      ease: "elastic.out(1,0.1)",
    }, ">");
    
  });
};

const stopGlitchEffect = () => {
  if (revealRef.current){
    const glitchDivs = revealRef.current.querySelectorAll('.glitch-img');

    glitchDivs.forEach((div : Element ) => {
      (div as HTMLDivElement).style.opacity = '0';
    })
  
  } return;
}


useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    const mousePos = {
      x: e.clientX,
      y: e.clientY + window.scrollY,}

      const speed = Math.sqrt(Math.pow(mousePos.x - lastMousePos.current.x, 2));

      let ctx = gsap.context(()=>{
        if(currentItem !== null ){
          const maxY = window.scrollY + window.innerHeight - 350;
          const maxX = window.innerWidth - 250;

          gsap.to(containerRef.current, {
            x: gsap.utils.clamp(0, maxX, mousePos.x - 100),
            y: gsap.utils.clamp(0, maxY, mousePos.y - 150),
            rotation: speed * (mousePos.x > lastMousePos.current.x ? 1 : -1),
            ease: "back.out(2)",
            duration: 1.3,
            
          },);

          
        }       
        lastMousePos.current = mousePos;
        return ()=> ctx.revert();
      }, component);
    };
    window.addEventListener("mousemove", handleMouseMove);

    return() => {
      window.removeEventListener("mousemove", handleMouseMove);
    }
},)



const onMouseEnter = (index: number) => {
  setCurrentItem(index)
  startGlitchEffect()
}

const onMouseLeave = () => {
  setCurrentItem(null)
  stopGlitchEffect()
}


  return (

    <>
    <NegativeCursorEffect />
    

    <div ref={component} >

      <ul key={contentType} className=' hero-cursor-target grid border-b border-b-white' 
      onMouseLeave={onMouseLeave}>

        {items.map((item, index)=>(
          
          <React.Fragment key={item.uid || index}>
              {isFilled.keyText(item.data.title) && (
                
                <li key={index} className=' list-item'
                onMouseEnter={() => onMouseEnter(index)}
                >
                  <Link href={`${urlPrefix}/${item.uid}`} className=" flex flex-col justify-between border-t border-t-white py-10 text-white md:flex-row" aria-label={item.data.title}>
                    <div className="flex flex-col">
                      <span className='text-3xl font-bold'>{item.data.title}</span>
                        <div className="flex gap-3 text-customPink text-lg font-bold z-30" >
                          {item.tags.map((tag, index)=>(
                            <span className="flex gap-3 text-customPink text-lg font-bold z-30" key={index}>{tag}</span>
                            ))}
                        </div>
                    </div>
                    <span className='ml-auto flex items-center gap-2 text-xl font-medium md:ml-0'>{viewMoreText} <MdArrowOutward /></span>
                  </Link>
                </li>
              )}
            </React.Fragment>
        ))}
      </ul>

      {/* hover elements */}
      <div className='hover-reveal-container absolute inset-0 -z-20 h-[320px] w-[220px] ' ref={containerRef}>

          <div 
          className='hover-reveal pointer-events-none absolute left-0 top-0 -z-30 h-[320px] w-[220px] rounded-lg bg-cover bg-center opacity-0 transition-[background] duration-300'
          style={{
            backgroundImage:
            currentItem !== null ? `url(${contentImages[currentItem]})` : "",
          }}
          ref={revealRef}>
          </div>

          <div className='glitch-img bg-customPink absolute inset-0 -z-10 bg-cover rounded-lg blend-color-multiply opacity-0 ' style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',mixBlendMode: 'difference',}}></div>
          <div className='glitch-img bg-white absolute inset-0 -z-10 bg-cover rounded-lg blend-color-multiply opacity-0 ' style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',mixBlendMode: 'difference',}}></div>
          <div className='glitch-img bg-customPink absolute inset-0 -z-10 bg-cover rounded-lg blend-color-multiply opacity-0 ' style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',mixBlendMode: 'difference',}}></div>
          <div className='glitch-img bg-white absolute inset-0 -z-10 bg-cover rounded-lg blend-color-multiply opacity-0 ' style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',mixBlendMode: 'difference',}}></div>
          <div className='glitch-img bg-customPink absolute inset-0 -z-10 bg-cover rounded-lg blend-color-multiply opacity-0 ' style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',mixBlendMode: 'difference',}}></div>
          <div className='glitch-img bg-white absolute inset-0 -z-10 bg-cover rounded-lg blend-color-multiply opacity-0 ' style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',mixBlendMode: 'difference',}}></div>
          <div className='glitch-img bg-customPink absolute inset-0 -z-10 bg-cover rounded-lg blend-color-multiply opacity-0 ' style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',mixBlendMode: 'difference',}}></div>
          <div className='glitch-img bg-white absolute inset-0 -z-10 bg-cover rounded-lg blend-color-multiply opacity-0 ' style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',mixBlendMode: 'difference',}}></div>
          <div className='glitch-img bg-customPink absolute inset-0 -z-10 bg-cover rounded-lg blend-color-multiply opacity-0 ' style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',mixBlendMode: 'difference',}}></div>
          <div className='glitch-img bg-white absolute inset-0 -z-10 bg-cover rounded-lg blend-color-multiply opacity-0 ' style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',mixBlendMode: 'difference',}}></div>



      </div>

    </div>
  </>
  )
}
