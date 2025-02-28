"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {} from "next/router";
import { useEffect, useState } from "react";
import { Main } from "./components/Main";
import Head from "./header";
import { Api } from "./services/api";

export default function Home() {
  const [saveID, setSaveID] = useState<string>("");
  const [api, setApi] = useState<Api>(new Api(saveID));
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setApi(new Api(saveID));
  }, [saveID]);

  useEffect(() => {
    const f = async () => {
      const querySaveID = searchParams.get("saveID");
      const localSaveID = localStorage.getItem("saveID");

      if (!querySaveID && localSaveID) {
        const params = new URLSearchParams({ saveID: localSaveID });
        router.push(pathname + "?" + params);
      } else if (querySaveID && localSaveID) {
        setSaveID(querySaveID);
        // router.refresh(); // todo a more elegant map refresh
      } else if (querySaveID && !localSaveID) {
        setSaveID(querySaveID);
        localStorage.setItem("saveID", querySaveID);
        router.refresh(); // todo a more elegant map refresh
      } else if (!querySaveID && !localSaveID) {
        const newSaveID = await api.newSaveID();
        const params = new URLSearchParams({ saveID: newSaveID });
        router.push(pathname + "?" + params);
      }
    };
    f();
  }, [api, pathname, router, saveID, searchParams]);

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
