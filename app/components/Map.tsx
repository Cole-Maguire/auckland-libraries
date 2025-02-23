"use client";

import { LatLngExpression } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { Dispatch, JSX, SetStateAction } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import { Days, Library } from "../models/Library";

const today = new Date();

interface MapProps {
  startPosition: LatLngExpression;
  zoom?: number;
  libraries: Library[];
  highlightedLibrary: Library | null;
  setHighlightedLibrary: Dispatch<SetStateAction<Library | null>>;
}

export default function Map({
  startPosition,
  zoom = 13,
  libraries,
  highlightedLibrary,
  setHighlightedLibrary,
}: MapProps): JSX.Element {
  return (
    <MapContainer
      center={startPosition}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {libraries.map((library) => (
        <LibraryDot
          key={library.libraryId}
          library={library}
          highlightedLibrary={highlightedLibrary}
          setHighlightedLibrary={setHighlightedLibrary}
        />
      ))}

      {highlightedLibrary !== null && (
        <LibraryPopup
          today={today}
          library={highlightedLibrary}
          setHighlightedLibrary={setHighlightedLibrary}
        />
      )}
    </MapContainer>
  );
}

type LibraryDotProps = {
  library: Library;
  highlightedLibrary: Library | null;
  setHighlightedLibrary: Dispatch<SetStateAction<Library | null>>;
};

function LibraryDot({
  library,
  setHighlightedLibrary,
}: LibraryDotProps): JSX.Element {
  const color = library.visited ? "green" : "red";
  const openSundays = library.hours.Sunday !== "Closed" ? 1 : 0.1;

  return (
    <CircleMarker
      center={[parseFloat(library.lat), parseFloat(library.lon)]}
      pathOptions={{ color: color, fillColor: color, fillOpacity: openSundays }}
      radius={5}
      eventHandlers={{ click: () => setHighlightedLibrary(library) }}
    />
  );
}

type LibraryPopupProps = {
  library: Library;
  today: Date;
  setHighlightedLibrary: Dispatch<SetStateAction<Library | null>>;
};

function LibraryPopup({
  library,
  today,
  setHighlightedLibrary,
}: LibraryPopupProps): JSX.Element {
  return (
    <Popup
      position={[parseFloat(library.lat), parseFloat(library.lon)]}
      eventHandlers={{
        remove: () => setHighlightedLibrary(null),
      }}
    >
      <span className="font-bold">{library.name}</span>
      <div>
        {...Days.map((day) => (
          <div
            key={day}
            className={getDayName(today) == day ? "font-bold" : ""}
          >
            {day} - {library.hours[day]}
          </div>
        ))}
      </div>
    </Popup>
  );
}

function getDayName(date: Date): string {
  return date.toLocaleDateString("en-NZ", { weekday: "long" });
}
