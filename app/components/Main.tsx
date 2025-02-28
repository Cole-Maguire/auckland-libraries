"use client";

import dynamic from "next/dynamic";
import { JSX, useEffect, useMemo, useState } from "react";
import { Library } from "../models/Library";
import defaultLibraries from "../resources/defaultLibraries";
import { Api } from "../services/api";
import { List } from "./List";

type MainProps = {
  className: string;
  api: Api;
};

export function Main({ className, api }: MainProps): JSX.Element {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/components/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: !!false,
      }),
    [],
  );

  const [libraries, setLibraries] = useState<Library[]>(defaultLibraries);
  const [highlightedLibrary, setHighlightedLibrary] = useState<Library | null>(
    null,
  );

  useEffect(() => {
    async function setAsync() {
      setLibraries(await api.fetchLibraries());
      console.debug("useEffect saveID");
    }
    setAsync();
  }, [api]);

  return (
    <main
      className={`${className} flex grow flex-col-reverse items-center gap-0 md:flex-row md:items-start`}
    >
      <div className="h-1/3 w-full grow md:h-full">
        <List
          libraries={libraries}
          setLibraries={setLibraries}
          highlightedLibrary={highlightedLibrary}
          setHighlightedLibrary={setHighlightedLibrary}
          api={api}
        />
      </div>
      <div className="h-full w-full grow">
        {api.readyToRender && (
          <Map
            startPosition={[-36.8977, 174.9188]}
            zoom={11}
            libraries={libraries}
            highlightedLibrary={highlightedLibrary}
            setHighlightedLibrary={setHighlightedLibrary}
          />
        )}
      </div>
    </main>
  );
}
