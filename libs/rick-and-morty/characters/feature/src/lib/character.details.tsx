import {
  Details,
  DetailsActions,
  DetailsBody,
  DetailsBodySkeleton,
  DetailsHeader,
  DetailsTitle,
} from '@evolonix/manage-list-feature';
import { Character } from '@evolonix/rick-and-morty-shared-data-access';
import { Link, Lipsum } from '@evolonix/ui';

interface CharacterDetailsProps {
  loading: boolean;
  character: Character;
  onDelete: () => void;
}

export const CharacterDetails = ({
  loading,
  character,
  onDelete,
}: CharacterDetailsProps) => {
  return (
    <Details entity={character}>
      <DetailsHeader>
        <DetailsTitle>{character?.name}</DetailsTitle>
        <DetailsActions
          deletePrompt="Are you sure you want to delete this character?"
          editUrl={`/rick-and-morty/characters/${character?.id}/edit`}
          onDelete={onDelete}
        />
      </DetailsHeader>
      {loading ? (
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
          <dl className="grid w-full columns-2 gap-2">
            <dt className="font-bold">Location:</dt>
            <dd className="col-start-2">{character.location?.name}</dd>

            <dt className="font-bold">Origin:</dt>
            <dd className="col-start-2">{character.origin?.name}</dd>

            <dt className="font-bold">Gender:</dt>
            <dd className="col-start-2">{character.gender}</dd>

            <dt className="font-bold">Species:</dt>
            <dd className="col-start-2">{character.species}</dd>

            <dt className="font-bold">Status:</dt>
            <dd className="col-start-2">{character.status}</dd>

            <dt className="font-bold">Type:</dt>
            <dd className="col-start-2">{character.type}</dd>

            <dt className="font-bold">Episode:</dt>
            <dd className="col-start-2">
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

          <Lipsum />
        </DetailsBody>
      ) : null}
    </Details>
  );
};
