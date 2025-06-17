import { z } from 'zod';

import {
  Character,
  Episode,
  Location,
} from '@evolonix/rick-and-morty-data-access-characters';

// 🔧 Utility Types
const zMaybeString = z.string().nullable();
const zMaybeInt = z.number().int().nullable();

// 📦 Info
export const InfoSchema = z.object({
  count: zMaybeInt,
  next: zMaybeInt,
  pages: zMaybeInt,
  prev: zMaybeInt,
});

// 📦 Episode
export const EpisodeSchema: z.ZodType<Episode> = z.lazy(() =>
  z.object({
    air_date: zMaybeString,
    characters: z.array(z.lazy(() => CharacterSchema.nullable())),
    created: zMaybeString,
    episode: zMaybeString,
    id: zMaybeString,
    name: zMaybeString,
  }),
);

// 📦 Location
export const LocationSchema: z.ZodType<Location> = z.lazy(() =>
  z.object({
    created: zMaybeString,
    dimension: zMaybeString,
    id: zMaybeString,
    name: zMaybeString,
    residents: z.array(z.lazy(() => CharacterSchema.nullable())),
    type: zMaybeString,
  }),
);

// 📦 Character
export const CharacterSchema: z.ZodType<Character> = z.lazy(() =>
  z.object({
    created: zMaybeString,
    episode: z.array(z.lazy(() => EpisodeSchema.nullable())),
    gender: zMaybeString,
    id: zMaybeString,
    image: zMaybeString,
    location: LocationSchema.nullable(),
    name: zMaybeString,
    origin: LocationSchema.nullable(),
    species: zMaybeString,
    status: zMaybeString,
    type: zMaybeString,
  }),
);

// 📦 Characters
export const CharactersSchema = z.object({
  info: InfoSchema.nullable(),
  results: z.array(CharacterSchema.nullable()).nullable(),
});

// 📦 Episodes
export const EpisodesSchema = z.object({
  info: InfoSchema.nullable(),
  results: z.array(EpisodeSchema.nullable()).nullable(),
});

// 📦 Locations
export const LocationsSchema = z.object({
  info: InfoSchema.nullable(),
  results: z.array(LocationSchema.nullable()).nullable(),
});

// 📦 FilterCharacter
export const FilterCharacterSchema = z.object({
  gender: zMaybeString,
  name: zMaybeString,
  species: zMaybeString,
  status: zMaybeString,
  type: zMaybeString,
});

// 📦 FilterEpisode
export const FilterEpisodeSchema = z.object({
  episode: zMaybeString,
  name: zMaybeString,
});

// 📦 FilterLocation
export const FilterLocationSchema = z.object({
  dimension: zMaybeString,
  name: zMaybeString,
  type: zMaybeString,
});
