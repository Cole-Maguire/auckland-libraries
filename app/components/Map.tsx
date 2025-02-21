"use client"

import { LatLngExpression } from "leaflet"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, TileLayer } from "react-leaflet"
import { Library } from "./Library"

interface MapProps {
	startPosition: LatLngExpression,
	zoom?: number,
	libraries: Library[]
}

export default function Map({ startPosition, zoom = 13, libraries }: MapProps) {

  return  <MapContainer center={startPosition} zoom={zoom} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
  <TileLayer
	attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {libraries.map((library) => (
	<Marker key={library.libraryId} position={[parseFloat(library.lat), parseFloat(library.lon)]}  />
  ))}
 
</MapContainer>
}