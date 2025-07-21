import {
  Details,
  DetailsActions,
  DetailsBody,
  DetailsBodySkeleton,
  DetailsHeader,
  DetailsHeaderSkeleton,
  DetailsTitle,
} from '@evolonix/manage-list-feature';
import { Location } from '@evolonix/rick-and-morty-data-access';
import { Avatar, Link } from '@evolonix/ui';
import { useParams } from 'react-router';

interface LocationDetailsProps {
  isLoading: boolean;
  location?: Location;
  onDelete: () => void;
}

export const LocationDetails = ({
  isLoading,
  location,
  onDelete,
}: LocationDetailsProps) => {
  const { id } = useParams();

  return !id || (id === 'new' && !location) ? (
    <>
      <div className="flex h-9 items-center justify-between">
        <h2 className="font-bold">Locations</h2>
      </div>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Explore the various locations from Rick & Morty. Click on an location to
        learn more about it.
      </p>
    </>
  ) : (
    <Details entity={location}>
      {isLoading && !location ? (
        <>
          <DetailsHeaderSkeleton />
          <DetailsBodySkeleton />
        </>
      ) : location ? (
        <>
          <DetailsHeader>
            <DetailsTitle>{location?.name}</DetailsTitle>
            <DetailsActions
              isLoading={isLoading}
              editUrl={`/admin/rick-and-morty/locations/${location?.id}/edit`}
              deletePrompt="Are you sure you want to delete this location?"
              onDelete={onDelete}
            />
          </DetailsHeader>
          <DetailsBody
            className={
              id !== location.id && id !== 'new' ? 'animate-pulse' : ''
            }
          >
            <dl className="grid w-full gap-2 lg:grid-cols-[auto_1fr]">
              <dt className="font-bold">Type:</dt>
              <dd>{location.type}</dd>

              <dt className="font-bold">Dimension:</dt>
              <dd>{location.dimension}</dd>

              <dt className="font-bold">Residents:</dt>
              <dd>
                {location.residents?.map((character) =>
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
