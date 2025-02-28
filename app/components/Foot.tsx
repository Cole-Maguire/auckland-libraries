"use client";

import Image from "next/image";
import { JSX, useState } from "react";
import { Library } from "../models/Library";

const defaultShareText = "Share your progress using your unique url!";

type FootProps = {
  className?: string;
  libraries: Library[];
};

export function Foot({ className = "", libraries }: FootProps): JSX.Element {
  const [shareText, setShareText] = useState(defaultShareText);
  return (
    <footer
      className={`${className} h-1/10 grid grid-cols-3 gap-6 bg-gray-800 px-4 text-white shadow-md`}
    >
      <div>
        {libraries.filter((library) => library.visited).length}/
        {libraries.length} libraries visited -{" "}
        {Math.round(
          (libraries.filter((library) => library.visited).length /
            libraries.length) *
            100,
        )}
        %
      </div>
      <a
        className="flex items-center justify-center gap-2 hover:underline hover:underline-offset-4"
        href="https://github.com/Cole-Maguire"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/auckland-libraries/github-mark.svg"
          alt="GitHub logo"
          width={16}
          height={16}
          style={{ filter: "invert(1)" }} // hack to invert svg image color without the hassle of importing
        />
        <span className="hidden md:block">Visit me on Github!</span>
      </a>

      <div
        className="flex cursor-pointer items-center justify-center gap-2 text-right hover:underline hover:underline-offset-4"
        onClick={async () => {
          const shareable: ShareData = {
            url: window.location.href,
            text: "Come see my progress in visting every Auckland Library!",
          };
          if (navigator.canShare(shareable)) {
            await navigator.share(shareable);
          } else {
            await navigator.clipboard.writeText(window.location.href);
            setShareText("Copied!");
            setTimeout(() => setShareText(defaultShareText), 3000);
          }
        }}
      >
        <span
          className="material-symbols-outlined !text-base"
          style={{
            fontVariationSettings:
              "  'FILL' 0,  'wght' 400,  'GRAD' 0,  'opsz' 20",
          }}
        >
          share
        </span>
        <span className="hidden md:block">{shareText}</span>
      </div>
    </footer>
  );
}
