import { JSX } from "react";
import { Library } from "../models/Library";

type ListProps = {
  libraries: Library[];
};

export function List({ libraries }: ListProps): JSX.Element {
  return (
    <div className="h-full overflow-y-auto p-4">
      {libraries.map((library) => (
        <div
          key={library.libraryId}
          className="flex items-center justify-between"
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
          />
        </div>
      ))}
    </div>
  );
}
