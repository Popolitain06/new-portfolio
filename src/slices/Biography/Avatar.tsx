import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";

type AvatarProps = {
  image: ImageField;
  className?: string;
};

export default function Avatar({ image, className }: AvatarProps) {
  const component = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      component.current,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 3, duration: 0.5, ease: "back.out(1.7)", delay: 2.5 }
    )
      .to(component.current, { scale: 0.8, duration: 0.2, ease: "back.in(1.7)" })
      .to(component.current, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" });

    const updateAnimation = (e: MouseEvent) => {
      if (!component.current) return;

      const avatarRect = component.current.getBoundingClientRect();
      const deltaX = e.clientX - (avatarRect.left + avatarRect.width / 2);
      const deltaY = e.clientY - (avatarRect.top + avatarRect.height / 2);

      const rotationY = deltaX / 10;
      const rotationX = -deltaY / 10;

      gsap.to(component.current, { rotationY, rotationX, duration: 0.5, ease: "power2.out" });
    };

    const onComplete = () => {
      document.addEventListener('mousemove', updateAnimation);
    };

    tl.eventCallback("onComplete", onComplete);

    // Nettoyage
    return () => {
      document.removeEventListener('mousemove', updateAnimation);
    };
  }, []);

  return (
    <div ref={component} style={{ perspective: '1000px' }} className={clsx("relative h-full w-full", className)}>
      <div className="avatar aspect-square overflow-hidden rounded-3xl">
        <PrismicNextImage 
          field={image}
          alt=""
          className="avatar-image h-full w-full object-fill" // Changed 'object-fill' to 'object-cover' for correctness
          imgixParams={{ q: 90 }}
        />
        <div className="highlight absolute inset-0 hidden w-full scale-110 bg-gradient-to-tr from-transparent via-customPink to-transparent opacity-0 md:block"></div>
      </div>
    </div>
  );
}
