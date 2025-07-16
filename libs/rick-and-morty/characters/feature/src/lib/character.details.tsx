import {
  Details,
  DetailsActions,
  DetailsBody,
  DetailsBodySkeleton,
  DetailsHeader,
  DetailsTitle,
} from '@evolonix/manage-list-feature';
import { Character } from '@evolonix/rick-and-morty-shared-data-access';
import { Link } from '@evolonix/ui';

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
  return character ? (
    <Details entity={character}>
      <DetailsHeader>
        <DetailsTitle>{character?.name}</DetailsTitle>
        <DetailsActions
          editUrl={`/rick-and-morty/characters/${character?.id}/edit`}
          deletePrompt="Are you sure you want to delete this character?"
          onDelete={onDelete}
        />
      </DetailsHeader>
      {isLoading ? (
        <DetailsBodySkeleton />
      ) : character ? (
        <DetailsBody>
          {character.image ? (
            <img
              src={character.image}
              alt={character.name ?? ''}
              className="h-48 w-48 rounded-lg object-cover"
            />
          ) : null}
          <dl className="grid w-full gap-2 md:grid-cols-[auto_1fr]">
            <dt className="font-bold">Location:</dt>
            <dd>{character.location?.name}</dd>

            <dt className="font-bold">Origin:</dt>
            <dd>{character.origin?.name}</dd>

            <dt className="font-bold">Gender:</dt>
            <dd>{character.gender}</dd>

            <dt className="font-bold">Species:</dt>
            <dd>{character.species}</dd>

            <dt className="font-bold">Status:</dt>
            <dd>{character.status}</dd>

            <dt className="font-bold">Type:</dt>
            <dd>{character.type}</dd>

            <dt className="font-bold">Episode:</dt>
            <dd>
              {character.episode?.map((episode) =>
                episode ? (
                  <Link
                    href={`/rick-and-morty/episodes/${episode.id}`}
                    key={episode.id}
                    className="flex items-center gap-2 hover:text-cyan-700 dark:hover:text-cyan-500"
                  >
                    {episode.name} ({episode.episode})
                  </Link>
                ) : null,
              )}
            </dd>
          </dl>
        </DetailsBody>
      ) : null}
    </Details>
  ) : (
    <>
      <div className="flex h-9 items-center justify-between">
        <h2 className="font-bold">Characters</h2>
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Explore the various characters from Rick & Morty. Click on a character
        to learn more about it.
      </p>
    </>
  );
};
