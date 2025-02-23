import { Dispatch, JSX, SetStateAction, useEffect, useRef } from "react";
import { Library } from "../models/Library";
import { toggleLibrary } from "../services/api";

type ListProps = {
  saveID: string;
  libraries: Library[];
  setLibraries: Dispatch<SetStateAction<Library[]>>;
  highlightedLibrary: Library | null;
  setHighlightedLibrary: Dispatch<SetStateAction<Library | null>>;
};

export function List({
  saveID,
  libraries,
  setLibraries,
  highlightedLibrary,
  setHighlightedLibrary,
}: ListProps): JSX.Element {
  const ref = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    if (highlightedLibrary) {
      ref.current[highlightedLibrary.libraryId]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  });
  return (
    <div className="h-full overflow-y-auto p-4">
      {libraries.map((library) => (
        <div
          key={library.libraryId}
          className={`duration-400 flex items-center justify-between transition-all ${highlightedLibrary?.libraryId === library.libraryId ? "bg-red-50" : ""}`}
          ref={(e) => {
            ref.current[library.libraryId] = e;
          }}
          onClick={() => setHighlightedLibrary(library)}
        >
          <div>
            <h3 className="text-lg">{library.name}</h3>
            <a
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                library.name + " Auckland",
              )}`}
            >
              {library.address}
            </a>
          </div>
          <input
            type="checkbox"
            checked={library.visited}
            className="h-8 w-8"
            onChange={async () => {
              await toggleLibrary(saveID, library, libraries);
              setLibraries([...libraries]); // gotta force a ref change after all of our mucky mutation
            }}
          />
        </div>
      ))}
    </div>
  );
}
