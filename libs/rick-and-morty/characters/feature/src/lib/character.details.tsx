import {
  Details,
  DetailsActions,
  DetailsBody,
  DetailsBodySkeleton,
  DetailsHeader,
  DetailsHeaderSkeleton,
  DetailsTitle,
} from '@evolonix/manage-list-feature';
import { Character } from '@evolonix/rick-and-morty-shared-data-access';
import { Link } from '@evolonix/ui';
import { useParams } from 'react-router';

interface CharacterDetailsProps {
  isLoading: boolean;
  character?: Character;
  onDelete: () => void;
}

export const CharacterDetails = ({
  isLoading,
  character,
  onDelete,
}: CharacterDetailsProps) => {
  const { id } = useParams();

  return !id || (id === 'new' && !character) ? (
    <>
      <div className="flex h-9 items-center justify-between">
        <h2 className="font-bold">Characters</h2>
      </div>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Explore the various characters from Rick & Morty. Click on a character
        to learn more about it.
      </p>
    </>
  ) : (
    <Details entity={character}>
      {isLoading && !character ? (
        <>
          <DetailsHeaderSkeleton />
          <DetailsBodySkeleton />
        </>
      ) : character ? (
        <>
          <DetailsHeader>
            <DetailsTitle>{character.name}</DetailsTitle>
            <DetailsActions
              isLoading={isLoading}
              editUrl={`/rick-and-morty/characters/${character.id}/edit`}
              deletePrompt="Are you sure you want to delete this character?"
              onDelete={onDelete}
            />
          </DetailsHeader>
          <DetailsBody
            className={
              id !== character.id && id !== 'new' ? 'animate-pulse' : ''
            }
          >
            {character.image ? (
              <img
                src={character.image}
                alt={character.name}
                className="h-48 w-48 rounded-lg object-cover"
              />
            ) : null}
            <dl className="grid w-full gap-2 lg:grid-cols-[auto_1fr]">
              <dt className="font-bold">Location:</dt>
              <dd>
                {character.location?.id ? (
                  <Link
                    href={`/rick-and-morty/locations/${character.location?.id}`}
                    className="group hover:text-cyan-700 dark:hover:text-cyan-500"
                  >
                    {character.location?.name}
                  </Link>
                ) : (
                  character.location?.name
                )}
              </dd>

              <dt className="font-bold">Origin:</dt>
              <dd>
                {character.origin?.id ? (
                  <Link
                    href={`/rick-and-morty/locations/${character.origin?.id}`}
                    className="group hover:text-cyan-700 dark:hover:text-cyan-500"
                  >
                    {character.origin?.name}
                  </Link>
                ) : (
                  character.origin?.name
                )}
              </dd>

              <dt className="font-bold">Gender:</dt>
              <dd>{character.gender}</dd>

              <dt className="font-bold">Species:</dt>
              <dd>{character.species}</dd>

              <dt className="font-bold">Status:</dt>
              <dd>{character.status}</dd>

              <dt className="font-bold">Type:</dt>
              <dd>{character.type}</dd>

              <dt className="font-bold">Episodes:</dt>
              <dd>
                {character.episode?.map((episode) =>
                  episode ? (
                    <div key={episode.id}>
                      <Link
                        href={`/rick-and-morty/episodes/${episode.id}`}
                        className="group hover:text-cyan-700 dark:hover:text-cyan-500"
                      >
                        {episode.name}{' '}
                        <span className="text-zinc-600 group-hover:text-cyan-700 dark:text-zinc-400 dark:group-hover:text-cyan-500">
                          ({episode.episode})
                        </span>
                      </Link>
                    </div>
                  ) : null,
                )}
              </dd>
            </dl>
          </DetailsBody>
        </>
      ) : null}
    </Details>
  );
};
