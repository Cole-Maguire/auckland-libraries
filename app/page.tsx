"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Foot } from "./components/Foot";
import Head from "./components/Head";
import { Main } from "./components/Main";
import { Library } from "./models/Library";
import defaultLibraries from "./resources/defaultLibraries";
import { Api } from "./services/api";

export default function Home() {
  const [libraries, setLibraries] = useState<Library[]>(defaultLibraries);

  const [saveID, setSaveID] = useState<string>("");
  const [api, setApi] = useState<Api>(new Api(saveID));
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setApi(new Api(saveID));
  }, [saveID]);

  useEffect(() => {
    async function setAsync() {
      setLibraries(await api.fetchLibraries());
      console.debug("useEffect saveID");
    }
    setAsync();
  }, [api]);

  useEffect(() => {
    const parseSaveIDs = async () => {
      const querySaveID = searchParams?.get("saveID");
      const localSaveID = localStorage.getItem("saveID");

      if (!querySaveID && localSaveID) {
        const params = new URLSearchParams({ saveID: localSaveID });
        router.push(pathname + "?" + params);
      } else if (querySaveID && localSaveID) {
        setSaveID(querySaveID);
      } else if (querySaveID && !localSaveID) {
        setSaveID(querySaveID);
        localStorage.setItem("saveID", querySaveID);
        router.refresh(); // todo: a more elegant map refresh
      } else if ((!querySaveID && !localSaveID) || querySaveID === "new") {
        const newSaveID = await api.newSaveID();
        const params = new URLSearchParams({ saveID: newSaveID });
        router.push(pathname + "?" + params);
      }
    };
    parseSaveIDs();
  }, [api, pathname, router, saveID, searchParams]);

  return (
    <div className="flex h-screen w-screen flex-col font-[family-name:var(--font-geist-sans)]">
      <Head className="p-4" />
      <Main
        className="h-4/5"
        api={api}
        libraries={libraries}
        setLibraries={setLibraries}
      />
      <Foot libraries={libraries} />
    </div>
  );
}
