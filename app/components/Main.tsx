"use client";

import { JSX, useEffect, useMemo, useState } from "react";
import { Library } from "../models/Library";
import { List } from "./List";
import dynamic from "next/dynamic";

type MainProps = {
  className: string;
  defaultLibraries: Library[];
};

export function Main({ className, defaultLibraries }: MainProps): JSX.Element {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/components/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: !!false,
      }),
    [],
  );
  const [highlightedLibrary, setHighlightedLibrary] = useState<Library | null>(
    null,
  );

  //   const [saveID, setSaveID] = useState<string>();
  const [libraries, setLibraries] = useState<Library[]>(defaultLibraries);

  return (
    <main className={`${className}`}>
      <div className="h-full grow">
        <List
          libraries={libraries}
          highlightedLibrary={highlightedLibrary}
          setHighlightedLibrary={setHighlightedLibrary}
        />
      </div>
      <div className="h-full w-full grow">
        <Map
          startPosition={[-36.8977, 174.9188]}
          zoom={11}
          libraries={libraries}
          highlightedLibrary={highlightedLibrary}
          setHighlightedLibrary={setHighlightedLibrary}
        />
      </div>
    </main>
  );
}
