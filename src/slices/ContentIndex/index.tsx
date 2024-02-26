'use client'
import { createClient } from "@/prismicio";
import { Content, isFilled} from "@prismicio/client";
import { PrismicRichText, SliceComponentProps, PrismicRichTextProps } from "@prismicio/react";
import ContentList from "./ContentList";
import Bounded from "@/app/components/Bounded";
import Heading from "@/app/components/Heading";
import gsap from 'gsap';
import { useEffect } from 'react';




/**é
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex = async ({ 
  slice,
 }: ContentIndexProps): Promise <JSX.Element> => {

  useEffect(() => {
    gsap.to('.fade-in', { duration: 3, opacity: 1, ease: "power2.inOut" });
  }, []);

  const client = createClient();
  const blogPosts = await client.getAllByType("blog_post");
  const projects = await client.getAllByType("project");

  const contentType = slice.primary.content_type || "Blog";

  const items = contentType === "Blog" ? blogPosts : projects;



  return (
    
    <Bounded
    data-slice-type={slice.slice_type}
    data-slice-variation={slice.variation}
    >
      <Heading size="xl" className="mb-8">
        {slice.primary.heading}
      </Heading>
      {isFilled.richText(slice.primary.description) && (
        <div className="prose prose-xl prose-invert mb-10 text-gray-800">
          <PrismicRichText  field={slice.primary.description} />
        </div>
      )}

      <ContentList key={contentType} items={items} contentType={contentType} viewMoreText={slice.primary.view_more_text} fallbackItemImage={slice.primary.fallback_item_image}/>
    </Bounded>
  );
};

export default ContentIndex;
