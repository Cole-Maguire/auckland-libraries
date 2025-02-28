export const Days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

type Days = (typeof Days)[number];

type NumericString = `${number}`;

export type Library = {
  libraryId: number;
  osm_id?: NumericString | number | "";
  name: string;
  address: string;
  hours: Record<Days, string>;
  lat: NumericString;
  lon: NumericString;
  visited: boolean;
};

export type Visits = Record<Library["libraryId"], boolean>;
