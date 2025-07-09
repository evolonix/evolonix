import { useCharacters } from '@evolonix/rick-and-morty-characters-data-access';
import { Character } from '@evolonix/rick-and-morty-shared-data-access';
import { Button, Divider, Link } from '@evolonix/ui';
import { useScrollHeight } from '@evolonix/util';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router';

interface CharacterDetailsProps {
  character?: Character;
  onEdit: () => void;
  onDelete: () => void;
}

export const CharacterDetails = ({
  onEdit,
  onDelete,
}: CharacterDetailsProps) => {
  const { id } = useParams();
  const vm = useCharacters(id);
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
      className="flex h-full flex-col overflow-hidden md:max-h-[var(--details-scroll-height)]"
    >
      {id ? (
        vm.showSkeleton || (vm.isLoading && vm.selectedId !== id) ? (
          <CharacterDetailsSkeleton />
        ) : vm.selected ? (
          <>
            <header className="bg-zinc-100 dark:bg-zinc-900">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-bold">{vm.selected.name}</h2>
                <div className="flex flex-wrap items-center gap-2">
                  <Button onClick={onEdit}>Edit</Button>
                  <Button onClick={onDelete}>Delete</Button>
                </div>
              </div>
              <Divider />
            </header>

            <div className="flex grow flex-col gap-2 overflow-y-auto pt-4">
              {vm.selected.image ? (
                <img
                  src={vm.selected.image}
                  alt={vm.selected.name ?? ''}
                  className="h-48 w-48 rounded-lg object-cover"
                />
              ) : null}
              <dl className="grid max-w-min columns-2 gap-2">
                <dt className="font-bold">Location:</dt>
                <dd className="col-start-2 whitespace-nowrap">
                  {vm.selected.location?.name}
                </dd>

                <dt className="font-bold">Origin:</dt>
                <dd className="col-start-2 whitespace-nowrap">
                  {vm.selected.origin?.name}
                </dd>

                <dt className="font-bold">Gender:</dt>
                <dd className="col-start-2 whitespace-nowrap">
                  {vm.selected.gender}
                </dd>

                <dt className="font-bold">Species:</dt>
                <dd className="col-start-2 whitespace-nowrap">
                  {vm.selected.species}
                </dd>

                <dt className="font-bold">Status:</dt>
                <dd className="col-start-2 whitespace-nowrap">
                  {vm.selected.status}
                </dd>

                <dt className="font-bold">Type:</dt>
                <dd className="col-start-2 whitespace-nowrap">
                  {vm.selected.type}
                </dd>

                <dt className="font-bold">Episode:</dt>
                <dd className="col-start-2 whitespace-nowrap">
                  {vm.selected.episode?.map((episode) =>
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
            </div>
          </>
        ) : (
          <span>
            No character found with ID <b>{id}</b>.
          </span>
        )
      ) : (
        <>
          <h2 className="font-bold">Characters</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Explore the various characters from Rick & Morty. Click on a
            character to learn more about it.
          </p>
        </>
      )}
    </div>
  );
};

export const CharacterDetailsSkeleton = () => {
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
