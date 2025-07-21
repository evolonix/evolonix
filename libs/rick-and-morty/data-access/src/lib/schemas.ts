import { z } from 'zod';

import { Character, Episode, Location } from './models';

// 📦 Info
export const InfoSchema = z.object({
  count: z.number().int(),
  next: z.number().int(),
  pages: z.number().int(),
  prev: z.number().int(),
});

// 📦 Episode
export const EpisodeSchema: z.ZodType<Episode> = z.lazy(() =>
  z.object({
    air_date: z.string(),
    characters: z.array(z.lazy(() => CharacterSchema)),
    created: z.string(),
    episode: z.string(),
    id: z.string(),
    name: z.string(),
  }),
);

// 📦 Location
export const LocationSchema: z.ZodType<Location> = z.lazy(() =>
  z.object({
    created: z.string(),
    dimension: z.string(),
    id: z.string(),
    name: z.string(),
    residents: z.array(z.lazy(() => CharacterSchema)),
    type: z.string(),
  }),
);

// 📦 Character
export const CharacterSchema: z.ZodType<Character> = z.lazy(() =>
  z.object({
    created: z.string().optional(),
    episode: z.array(z.lazy(() => EpisodeSchema)),
    gender: z.string(),
    id: z.string().optional(),
    image: z.string().optional(),
    location: LocationSchema.optional(),
    name: z.string(),
    origin: LocationSchema.optional(),
    species: z.string(),
    status: z.string(),
    type: z.string().optional(),
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
  gender: z.string(),
  name: z.string(),
  species: z.string(),
  status: z.string(),
  type: z.string(),
});

// 📦 FilterEpisode
export const FilterEpisodeSchema = z.object({
  episode: z.string(),
  name: z.string(),
});

// 📦 FilterLocation
export const FilterLocationSchema = z.object({
  dimension: z.string(),
  name: z.string(),
  type: z.string(),
});
