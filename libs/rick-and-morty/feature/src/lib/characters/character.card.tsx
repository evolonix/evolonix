import { Character } from '@evolonix/rick-and-morty-data-access';
import { Heading } from '@evolonix/ui';
import clsx from 'clsx';

interface CharacterCardProps {
  isLoading?: boolean;
  character?: Character;
}

export const CharacterCard = ({ isLoading, character }: CharacterCardProps) => {
  return character ? (
    <div className={isLoading ? 'animate-pulse' : ''}>
      <div className="flex flex-col overflow-hidden rounded-lg bg-zinc-100 shadow sm:flex-row dark:bg-zinc-800">
        {character.image ? (
          <img
            src={character.image}
            alt={character.name}
            className="object-cover sm:size-56"
          />
        ) : null}
        <div className="flex grow flex-col gap-4 overflow-hidden p-4">
          <div>
            <Heading level={3}>{character.name}</Heading>
            <div className="flex items-center gap-2">
              <div
                className={clsx(
                  'size-2 rounded-full',
                  character.status === 'Alive'
                    ? 'bg-green-500'
                    : character.status === 'Dead'
                      ? 'bg-red-500'
                      : 'bg-zinc-500',
                )}
              ></div>
              <span className="truncate">
                {character.status} - {character.species}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-zinc-600 dark:text-zinc-400">
              Last known location:
            </span>
            <span className="truncate">{character.location?.name}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-zinc-600 dark:text-zinc-400">
              First seen in:
            </span>
            <span className="truncate">{character.episode?.[0].name}</span>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export const CharacterCardSkeleton = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-zinc-100 shadow sm:flex-row dark:bg-zinc-800">
      <div className="h-56 w-full animate-pulse bg-zinc-200 sm:size-56"></div>
      <div className="flex grow flex-col gap-4 overflow-hidden p-4">
        <Heading
          level={3}
          className="h-6 w-1/2 animate-pulse rounded-full bg-zinc-200"
        ></Heading>
        <div className="flex items-center gap-2">
          <div className="size-2 animate-pulse rounded-full bg-zinc-200"></div>
          <span className="h-4 w-1/3 animate-pulse rounded-full bg-zinc-200"></span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="h-4 w-40 animate-pulse rounded-full bg-zinc-200 text-zinc-600 dark:text-zinc-400"></span>
          <span className="h-4 w-64 animate-pulse rounded-full bg-zinc-200"></span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="h-4 w-40 animate-pulse rounded-full bg-zinc-200 text-zinc-600 dark:text-zinc-400"></span>
          <span className="h-4 w-64 animate-pulse rounded-full bg-zinc-200"></span>
        </div>
      </div>
    </div>
  );
};
