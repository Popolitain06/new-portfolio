'use client';
import React, { useState } from 'react';
import Bounded from "@/app/components/Bounded";
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import NegativeCursorEffect from "./NegativeCursorEffect";
import Avatar from "./Avatar";
import TransitionEffect from "./TransitionEffect";

export type BiographyProps = SliceComponentProps<Content.BiographySlice>;

const Biography = ({ slice }: BiographyProps): JSX.Element => {
  // État pour contrôler la visibilité du contenu
  const [contentVisible, setContentVisible] = useState(false);

  return (
    <>
      <TransitionEffect
        onStart={() => setContentVisible(false)}  // Cacher le contenu au début de l'animation
        onComplete={() => setContentVisible(true)}  // Révéler le contenu à la fin de l'animation
      />
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={`${contentVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>

          <NegativeCursorEffect />
        <div className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">

          <Heading as="h1" size="xl" className="col-start-1 heading">
           {slice.primary.heading}
          </Heading>

          <div className="prose prose-xl text-gray-800 col-start-1">
            <PrismicRichText field={slice.primary.descirption}/>
          </div>

          <Button linkField={slice.primary.button_link} label={slice.primary.button_text} />

          <Avatar image={slice.primary.avatar} className="row-start-2 row-end-3 mx-auto sm:max-w-xs md:col-start-2 md:row-start-2 md:row-end-3 self-center avatar" />
        </div>
      </Bounded>
    </>
  );
};

export default Biography;
