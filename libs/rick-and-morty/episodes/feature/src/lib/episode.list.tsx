import clsx from 'clsx';
import { Fragment, useEffect, useMemo, useRef } from 'react';
import { NavLink, useLocation, useParams } from 'react-router';

import { Divider, Search } from '@evolonix/ui';

import { useEpisodes } from '@evolonix/rick-and-morty-episodes-data-access';
import { Pagination, PaginationNext, PaginationPrevious } from '@evolonix/ui';
import { useScrollHeight } from '@evolonix/util';

export const EpisodeList = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const searchParams = useMemo(() => {
    const searchParams = new URLSearchParams(search);
    return searchParams.size > 0 ? `?${searchParams.toString()}` : '';
  }, [search]);
  const vm = useEpisodes(id);
  const listRef = useRef<HTMLDivElement | null>(null);
  const listHeight = useScrollHeight(listRef, 48);

  useEffect(() => {
    const list = listRef.current?.querySelector('.overflow-y-auto');
    list?.scrollTo({ top: 0 });
  }, [vm.episodes]);

  return (
    <div
      ref={listRef}
      style={{ '--list-scroll-height': listHeight } as React.CSSProperties}
      className="flex h-96 flex-col md:h-[var(--list-scroll-height)]"
    >
      <Search
        initialQuery={vm.query}
        disabled={vm.isLoading}
        className="px-4"
        autoFocus
        onSearch={vm.search}
      />
      <Divider />
      <div className="grow overflow-y-auto">
        {vm.showSkeleton ? (
          <EpisodeListSkeleton />
        ) : vm.episodes.length ? (
          <ul className="flex h-full flex-col items-center">
            {vm.episodes.map((episode, index) =>
              episode ? (
                <Fragment key={episode.id}>
                  <li className="w-full">
                    <NavLink
                      to={`/rick-and-morty/episodes/${episode.id}${searchParams}`}
                      className={({ isActive }) =>
                        clsx(
                          'flex w-full items-center gap-2 p-4 font-bold',
                          'hover:text-cyan-700 dark:hover:text-cyan-500',
                          isActive ? 'text-cyan-600 dark:text-cyan-400' : '',
                        )
                      }
                    >
                      <span className="truncate">
                        {episode.name} ({episode.episode})
                      </span>
                    </NavLink>
                    {index < vm.episodes.length - 1 ? <Divider /> : null}
                  </li>
                </Fragment>
              ) : null,
            )}
          </ul>
        ) : (
          <div className="flex h-full">
            <p className="p-4 text-zinc-500 dark:text-zinc-400">
              No episodes found.
            </p>
          </div>
        )}
      </div>
      <Divider />
      <Pagination className="px-4 pt-4">
        <PaginationPrevious
          disabled={vm.isLoading || !vm.pagination?.prev}
          onClick={vm.previousPage}
        />
        <PaginationNext
          disabled={vm.isLoading || !vm.pagination?.next}
          onClick={vm.nextPage}
        />
      </Pagination>
    </div>
  );
};

export const EpisodeListSkeleton = () => {
  return (
    <ul className="flex h-full flex-col items-center">
      {Array.from({ length: 20 }).map((_, index) => (
        <Fragment key={index}>
          <li className="w-full">
            <div className="block w-full p-4 font-bold">
              <div className="h-6 animate-pulse rounded-full bg-zinc-900 dark:bg-zinc-100" />
            </div>
            {index < 10 ? <Divider /> : null}
          </li>
        </Fragment>
      ))}
    </ul>
  );
};
