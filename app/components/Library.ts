type Days =
	| "Saturday"
	| "Sunday"
	| "Monday"
	| "Tuesday"
	| "Wednesday"
	| "Thursday"
	| "Friday";

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
