export interface Episode {
  id?: string;
  air_date?: string;
  characters: Array<Character>;
  created?: string;
  episode?: string;
  name?: string;
}

export interface Location {
  id?: string;
  created?: string;
  dimension?: string;
  name?: string;
  residents: Array<Character>;
  type?: string;
}

export interface Character {
  id?: string;
  episode?: Array<Episode>;
  gender?: string;
  /**
   * Link to the character's image.
   * All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
   */
  image?: string;
  location?: Location;
  name?: string;
  origin?: Location;
  species?: string;
  status?: string;
  type?: string;
}

export interface Pagination {
  count?: number;
  next?: number;
  pages?: number;
  prev?: number;
}
