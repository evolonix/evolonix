import { useEpisodes } from '@evolonix/rick-and-morty-episodes-data-access';
import { Avatar, Button, Divider, Link } from '@evolonix/ui';
import { useScrollHeight } from '@evolonix/util';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router';

interface EpisodeDetailsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const EpisodeDetails = ({ onEdit, onDelete }: EpisodeDetailsProps) => {
  const { id } = useParams();
  const vm = useEpisodes(id);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const detailsHeight = useScrollHeight(detailsRef, 48);

  useEffect(() => {
    const details = detailsRef.current?.querySelector('.overflow-y-auto');
    details?.scrollTo({ top: 0 });
  }, [vm.selected]);

  return (
    <div
      ref={detailsRef}
      style={
        {
          '--details-scroll-height': detailsHeight,
        } as React.CSSProperties
      }
      className="flex h-full flex-col md:max-h-[var(--details-scroll-height)]"
    >
      {id ? (
        vm.showSkeleton || (vm.isLoading && vm.selectedId !== id) ? (
          <EpisodeDetailsSkeleton />
        ) : vm.selected ? (
          <>
            <header className="bg-zinc-100 dark:bg-zinc-900">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-bold">{vm.selected.name}</h2>
                <div className="flex flex-wrap items-center gap-2">
                  <Button outline onClick={onEdit}>
                    Edit
                  </Button>
                  <Button color="red" onClick={onDelete}>
                    Delete
                  </Button>
                </div>
              </div>
              <Divider />
            </header>

            <div className="flex grow flex-col gap-2 overflow-y-auto pt-4">
              <dl className="grid max-w-min columns-2 gap-2">
                <dt className="font-bold">Episode:</dt>
                <dd className="col-start-2 whitespace-nowrap">
                  {vm.selected.episode}
                </dd>

                <dt className="font-bold">Air date:</dt>
                <dd className="col-start-2 whitespace-nowrap">
                  {vm.selected.air_date}
                </dd>

                <dt className="font-bold">Characters:</dt>
                <dd className="col-start-2 whitespace-nowrap">
                  {vm.selected.characters?.map((character) =>
                    character ? (
                      <Link
                        href={`/rick-and-morty/characters/${character.id}`}
                        key={character.id}
                        className="flex items-center gap-2 hover:text-cyan-700 dark:hover:text-cyan-500"
                      >
                        <Avatar
                          src={character.image ?? ''}
                          alt={character.name ?? ''}
                          initials={character.name?.charAt(0)}
                          className="size-5"
                        />
                        {character.name}
                      </Link>
                    ) : null,
                  )}
                </dd>
              </dl>
            </div>
          </>
        ) : (
          <span>
            No episode found with ID <b>{id}</b>.
          </span>
        )
      ) : (
        <>
          <div className="flex h-9 items-center justify-between">
            <h2 className="font-bold">Episodes</h2>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Explore the various episodes from Rick & Morty. Click on a episode
            to learn more about it.
          </p>
        </>
      )}
    </div>
  );
};

export const EpisodeDetailsSkeleton = () => {
  return (
    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
      <h2 className="h-7 w-full animate-pulse rounded-full bg-zinc-900 font-bold sm:max-w-52 dark:bg-zinc-100">
        &nbsp;
      </h2>
      <div className="flex flex-wrap items-center gap-2">
        <Button disabled>Edit</Button>
        <Button disabled>Delete</Button>
      </div>
    </div>
  );
};
