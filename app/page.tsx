"use client";
import Image from "next/image";
import { useState } from "react";
import { Main } from "./components/Main";
import Head from "./header";
import { Api } from "./services/api";

export default function Home() {
  const [saveID, setSaveID] = useState<string>("test-visited");
  const api = new Api(saveID); // todo - this is the old url, replace me with blank once saves are setup

  return (
    <div className="flex h-screen w-screen flex-col font-[family-name:var(--font-geist-sans)]">
      <Head saveID={saveID} setSaveID={setSaveID} className="p-4" />
      <Main className="h-4/5" api={api} />
      <footer className="h-1/10 flex flex-wrap items-center justify-center gap-6 bg-gray-800 text-white shadow-md">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/Cole-Maguire"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/github-mark.svg"
            alt="GitHub logo"
            width={16}
            height={16}
            style={{ filter: "invert(1)" }} // hack to invert svg image color without the hassle of importing
          />
          Visit me on Github!
        </a>
      </footer>
    </div>
  );
}
