import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Bounded from "@/app/components/Bounded";
import Heading from "@/app/components/Heading";
import { Content, DateField, isFilled } from "@prismicio/client";

type Params = { uid: string };

export default function ContentBody({page}: {page: Content.BlogPostDocument | Content.ProjectDocument}) {

    function formatDate(date: DateField) {
        if(isFilled.date(date)){
            const dateOptions : Intl.DateTimeFormatOptions = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
                
            }
            const formattedDate = new Intl.DateTimeFormat('fr-FR', dateOptions).format(new Date(date));

            return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        }

        
    }

    const formattedDate = formatDate(page.data.date);

  return (

   <Bounded as="article">

    <div className="rounded-2xl border-2 border-white bg-blue-500 px-4 py-10 md:px-8 md:py-20">
        <Heading as="h1">{page.data.title}</Heading>

        <div className="flex gap-4 font-bold text-customPink">
            {page.tags.map((tag, index) => (
                <span key={index}>{tag}</span>
            ))}
        </div>
        <p className="text-white mt-8 border-b border-white text-xl font-medium">{formattedDate}</p>

        <div className="text-white prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20">
            
        <SliceZone slices={page.data.slices} components={components}/>
        </div>
    </div>

  
  
   </Bounded> 
  ) ;
}

