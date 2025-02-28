import { Dispatch, JSX, SetStateAction, useEffect, useRef } from "react";
import { Library } from "../models/Library";
import { Api } from "../services/api";

type ListProps = {
  libraries: Library[];
  setLibraries: Dispatch<SetStateAction<Library[]>>;
  highlightedLibrary: Library | null;
  setHighlightedLibrary: Dispatch<SetStateAction<Library | null>>;
  api: Pick<Api, "toggleLibrary">;
};

export function List({
  libraries,
  setLibraries,
  highlightedLibrary,
  setHighlightedLibrary,
  api,
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
    <div className="h-full overflow-y-auto bg-gray-300 bg-white p-4 shadow-md">
      {libraries.map((library) => (
        <div
          key={library.libraryId}
          className={`duration-400 mb-4 flex items-center justify-between rounded-lg p-4 shadow transition-all ${
            highlightedLibrary?.libraryId === library.libraryId
              ? "bg-red-50"
              : "bg-gray-100"
          }`}
          ref={(e) => {
            ref.current[library.libraryId] = e;
          }}
          onClick={() => setHighlightedLibrary(library)}
        >
          <div>
            <h3 className="text-lg font-semibold">{library.name}</h3>
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
          <div>
            <input
              type="checkbox"
              checked={library.visited}
              className="h-6 w-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              onChange={async () => {
                await api.toggleLibrary(library, libraries);
                setLibraries([...libraries]); // gotta force a ref change after all of our mucky mutation
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
