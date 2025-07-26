import { useCharacters } from '@evolonix/rick-and-morty-data-access';
import {
  GridLayout,
  GridLayoutItem,
  PageHeader,
  PageHeaderSkeleton,
} from '@evolonix/ui';
import clsx from 'clsx';
import { useParams } from 'react-router';
import { breadcrumbMap } from '../../breadcrumbs';

export const RickAndMortyCharacter = () => {
  const { id } = useParams();
  const vm = useCharacters(id);

  return (
    <>
      {vm.selected?.name ? (
        <PageHeader label={vm.selected.name} breadcrumbMap={breadcrumbMap} />
      ) : (
        <PageHeaderSkeleton />
      )}
      <GridLayout>
        <GridLayoutItem>
          {vm.showSkeleton ? (
            <RickAndMortyCharacterSkeleton />
          ) : vm.selected ? (
            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
              <div className="lg:pl-20">
                <div className="px-2.5 pt-2.5 sm:max-w-xs lg:max-w-none">
                  <img
                    src={vm.selected.image}
                    alt=""
                    sizes="(min-width: 1024px) 32rem, (min-width: 640px) 20rem, 40rem"
                    className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 lg:order-first lg:row-span-2">
                <div className="flex items-center gap-2">
                  <div
                    className={clsx(
                      'size-2 rounded-full',
                      vm.selected.status === 'Alive'
                        ? 'bg-green-500'
                        : vm.selected.status === 'Dead'
                          ? 'bg-red-500'
                          : 'bg-zinc-500',
                    )}
                  ></div>
                  <span className="truncate">
                    {vm.selected.status} - {vm.selected.species}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Last known location:
                  </span>
                  <span className="truncate">{vm.selected.location?.name}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-600 dark:text-zinc-400">
                    First seen in:
                  </span>
                  <span className="truncate">
                    {vm.selected.episodes?.[0].name}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Appears in {vm.selected.episodes?.length}{' '}
                    {vm.selected.episodes?.length === 1
                      ? 'episode'
                      : 'episodes'}
                    :
                  </span>
                  <ul>
                    {vm.selected.episodes?.map((episode) =>
                      episode ? (
                        <li key={episode.id}>
                          {/* <Link
                            href={`/admin/rick-and-morty/episodes/${episode.id}`}
                            className="group hover:text-cyan-700 dark:hover:text-cyan-500"
                          > */}
                          {episode.name}{' '}
                          <span
                            className={clsx(
                              'text-zinc-600 dark:text-zinc-400',
                              // 'group-hover:text-cyan-700 dark:group-hover:text-cyan-500',
                            )}
                          >
                            ({episode.episode})
                          </span>
                          {/* </Link> */}
                        </li>
                      ) : null,
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
        </GridLayoutItem>
      </GridLayout>
    </>
  );
};

const RickAndMortyCharacterSkeleton = () => {
  return <div></div>;
};

export default RickAndMortyCharacter;
