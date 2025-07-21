import {
  Details,
  DetailsActions,
  DetailsBody,
  DetailsBodySkeleton,
  DetailsHeader,
  DetailsHeaderSkeleton,
  DetailsTitle,
} from '@evolonix/manage-list-feature';
import { Episode } from '@evolonix/rick-and-morty-data-access';
import { Avatar, Link } from '@evolonix/ui';
import { useParams } from 'react-router';

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
  const { id } = useParams();

  return !id || (id === 'new' && !episode) ? (
    <>
      <div className="flex h-9 items-center justify-between">
        <h2 className="font-bold">Episodes</h2>
      </div>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Explore the various episodes from Rick & Morty. Click on an episode to
        learn more about it.
      </p>
    </>
  ) : (
    <Details entity={episode}>
      {isLoading && !episode ? (
        <>
          <DetailsHeaderSkeleton />
          <DetailsBodySkeleton />
        </>
      ) : episode ? (
        <>
          <DetailsHeader>
            <DetailsTitle>{episode?.name}</DetailsTitle>
            <DetailsActions
              isLoading={isLoading}
              editUrl={`/admin/rick-and-morty/episodes/${episode?.id}/edit`}
              deletePrompt="Are you sure you want to delete this episode?"
              onDelete={onDelete}
            />
          </DetailsHeader>
          <DetailsBody
            className={id !== episode.id && id !== 'new' ? 'animate-pulse' : ''}
          >
            <dl className="grid w-full gap-2 lg:grid-cols-[auto_1fr]">
              <dt className="font-bold">Episode:</dt>
              <dd>{episode.episode}</dd>

              <dt className="font-bold">Air date:</dt>
              <dd>{episode.air_date}</dd>

              <dt className="font-bold">Characters:</dt>
              <dd>
                {episode.characters?.map((character) =>
                  character ? (
                    <div key={character.id}>
                      <Link
                        href={`/admin/rick-and-morty/characters/${character.id}`}
                        className="inline-flex items-center gap-2 hover:text-cyan-700 dark:hover:text-cyan-500"
                      >
                        <Avatar
                          src={character.image}
                          alt={character.name}
                          initials={character.name
                            ?.split(' ')
                            ?.map((name) => name.charAt(0))
                            .join('')}
                          className="size-5"
                        />
                        {character.name}
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
