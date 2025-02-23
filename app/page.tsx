import Image from "next/image";
import { Main } from "./components/Main";

export default async function Home() {
  return (
    <div className="flex h-screen w-screen flex-col font-[family-name:var(--font-geist-sans)]">
      <header className="p-4">
        <h1 className="text-2xl">Auckland Library Tracker</h1>
      </header>
      <Main className="flex h-4/5 grow flex-row items-center gap-0 sm:items-start" />
      <footer className="h-1/10 flex flex-wrap items-center justify-center gap-6">
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
          />
          Visit me on Github!
        </a>
      </footer>
    </div>
  );
}
