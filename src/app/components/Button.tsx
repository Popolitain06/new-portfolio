import { KeyTextField, LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import { MdArrowOutward } from "react-icons/md";



type ButtonProps = {
    linkField: LinkField;
    label: KeyTextField;
    showIcon?: boolean;
    className?: string;
};

export default function Button({ linkField, label, showIcon=true, className }: ButtonProps) {
    return (
        <PrismicNextLink
          field={linkField}
          className={clsx(
            "group relative flex w-fit items-center justify-center overflow-hidden rounded-md border-2 border-gray-800 bg-transparent  px-4 py-2 font-bold transition-transform ease-out  hover:scale-105",
            className,
          )}
        >
          <span
            className={clsx(
              "absolute inset-0 z-0 h-full translate-y-9 bg-customPink transition-transform  duration-300 ease-in-out group-hover:translate-y-0",
            )}
          />
          <span className="relative flex items-center justify-center gap-2">
            {label} {showIcon && <MdArrowOutward className="group-hover:rotate-45 transition-transform" />}
          </span>
        </PrismicNextLink>
      );
    }