import {
  Details,
  DetailsActions,
  DetailsBody,
  DetailsBodySkeleton,
  DetailsHeader,
  DetailsTitle,
} from '@evolonix/manage-list-feature';
import { Episode } from '@evolonix/rick-and-morty-shared-data-access';
import { Avatar, Link } from '@evolonix/ui';

interface EpisodeDetailsProps {
  isLoading: boolean;
  episode?: Episode;
  onDelete: () => void;
}

export const EpisodeDetails = ({
  isLoading,
  episode,
  onDelete,
}: EpisodeDetailsProps) => {
  return episode ? (
    <Details entity={episode}>
      <DetailsHeader>
        <DetailsTitle>{episode?.name}</DetailsTitle>
        <DetailsActions
          editUrl={`/rick-and-morty/episodes/${episode?.id}/edit`}
          deletePrompt="Are you sure you want to delete this episode?"
          onDelete={onDelete}
        />
      </DetailsHeader>
      {isLoading ? (
        <DetailsBodySkeleton />
      ) : episode ? (
        <DetailsBody>
          <dl className="grid w-full gap-2 md:grid-cols-[auto_1fr]">
            <dt className="font-bold">Episode:</dt>
            <dd>{episode.episode}</dd>

            <dt className="font-bold">Air date:</dt>
            <dd>{episode.air_date}</dd>

            <dt className="font-bold">Episodes:</dt>
            <dd>
              {episode.characters?.map((character) =>
                character ? (
                  <Link
                    href={`/rick-and-morty/characters/${character.id}`}
                    key={character.id}
                    className="flex items-center gap-2 hover:text-cyan-700 dark:hover:text-cyan-500"
                  >
                    <Avatar
                      src={character.image ?? ''}
                      alt={character.name ?? ''}
                      initials={character.name
                        ?.split(' ')
                        ?.map((name) => name.charAt(0))
                        .join('')}
                      className="size-5"
                    />
                    {character.name}
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
        <h2 className="font-bold">Episodes</h2>
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Explore the various episodes from Rick & Morty. Click on an episode to
        learn more about it.
      </p>
    </>
  );
};
