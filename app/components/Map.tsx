"use client";

import { LatLngExpression } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { JSX } from "react";
import { Circle, MapContainer, Popup, TileLayer } from "react-leaflet";
import { Days, Library } from "../models/Library";

const today = new Date();

interface MapProps {
  startPosition: LatLngExpression;
  zoom?: number;
  libraries: Library[];
}

export default function Map({
  startPosition,
  zoom = 13,
  libraries,
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
        <LibraryDot key={library.libraryId} library={library} />
      ))}
    </MapContainer>
  );
}

type LibraryDotProps = {
  library: Library;
};

export function LibraryDot({ library }: LibraryDotProps): JSX.Element {
  const color = library.visited ? "green" : "red";
  const openSundays = library.hours.Sunday !== "Closed" ? 1 : 0.1;

  return (
    <Circle
      center={[parseFloat(library.lat), parseFloat(library.lon)]}
      color={color}
      fillColor={color}
      fillOpacity={openSundays}
      radius={300}
    >
      <LibraryPopup library={library} today={today} />
    </Circle>
  );
}

type LibraryPopupProps = {
  library: Library;
  today: Date;
};

function LibraryPopup({ library, today }: LibraryPopupProps): JSX.Element {
  return (
    <Popup>
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
