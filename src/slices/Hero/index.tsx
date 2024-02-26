'use client'

import { useEffect, useRef } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import {gsap} from "gsap";
import Head from "next/head";
import Bounded from "@/app/components/Bounded";
import Shapes from "./Shapes";
import CursorEffect from "./CursorEffect";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {


  const audioRef = useRef(null)
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl =gsap.timeline();

      tl.fromTo(".name-animation", {
      x: -100, opacity: 0, rotate: -10
      }, 
      {
       x: 0,
       opacity: 1,
       rotate: 0,
       ease: "elastic.out(2,0.5)",
       duration: 1,
       delay: 0.3,
       transformOrigin: "left top",
       stagger:{
        each: 0.1,
        from:"random"
       }
      }
      );

      tl.fromTo(".job-title", {
        y:20,
        opacity:0,
        scale:1.2
      },
      {
        y:0,
        opacity:1,
        scale:1,
        delay:0,
        ease: "elastic.out(1,0.3)",
        duration: 1,
      }
      );
    
    
    }, component);
    return () => ctx.revert();
  }, []);



  const renderLetters = (name: KeyTextField, key: string) => {
    if(!name)return;
    return name.split("").map((letter, index) => (
      <span key={key + index} className={`name-animation name-animation-${key} inline-block opacity-0`}>
        {letter}
      </span>

    ));
  };

  return (
    <>
    <Head> 
    <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap" rel="stylesheet" />
    </Head>
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
      >
        <CursorEffect/>
      <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center">


        <div className="hero-cursor-target">
          <Shapes />
        </div>
        
        <div className="col-start-1 md:row-start-1">

          <h1 className="hero-cursor-target mb-8 text-[clamp(2.6rem,10vmin,15rem)] font-extrabold leading-none tracking-tight md:tracking-tighter" aria-label={slice.primary.first_name + " " + slice.primary.last_name}>

          {<span className="block text-white">{renderLetters(slice.primary.first_name, "first")}</span>}
          {<span className="-mt-[.2em] block text-gray-800">{renderLetters (slice.primary.last_name, "last")}</span>}

          </h1>
          {<span className="job-title hero-title block bg-gradient-to-r from-customPink via-fuchsia-300 to-customPink bg-clip-text text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold uppercase tracking-[.2em] text-transparent opacity-0 ">{slice.primary.tag_line}</span>}

        </div>
      </div>
    </Bounded>
    <style jsx>{`
        .hero-title {
          font-family: 'Permanent Marker', cursive;
        }
      `}</style>
      </>
  );
};

export default Hero;
