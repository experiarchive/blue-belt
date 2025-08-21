export interface Timetable {
  stops: string[];
  departures: (string | null)[][];
}

export interface Route {
  name: string;
  slug: string;
  csvUrl: string;
}

export interface FeaturedArea {
  label: string;
  slug: string;
}