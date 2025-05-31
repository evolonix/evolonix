import { GridLayout, GridLayoutItem } from '../../components';
import { Divider } from '../../components/catalyst';
import { PageHeader } from '../../components/page-header';
import { useStarships } from '../../lib/data-access';

export const StarWars = () => {
  const vm = useStarships();

  return (
    <>
      <PageHeader label="Star Wars" />
      <Divider className="mt-4" />
      <GridLayout>
        <GridLayoutItem>
          <h2 className="text-lg font-bold">Starships</h2>
        </GridLayoutItem>
        {vm.showSkeleton
          ? Array.from({ length: 20 }).map((_, index) => (
              <GridLayoutItem key={index} md={4}>
                <div className="flex h-full flex-col items-center justify-center rounded border border-zinc-200 p-4 text-center dark:border-zinc-600">
                  <h3 className="h-7 w-full animate-pulse rounded-full bg-zinc-900 font-bold dark:bg-zinc-100">&nbsp;</h3>
                </div>
              </GridLayoutItem>
            ))
          : vm.starships.map((starship) => (
              <GridLayoutItem key={starship.id} md={4}>
                <div className="flex h-full flex-col items-center justify-center rounded border border-zinc-200 p-4 text-center dark:border-zinc-600">
                  <h3 className="font-bold">{starship.name}</h3>
                </div>
              </GridLayoutItem>
            ))}
      </GridLayout>
    </>
  );
};

export default StarWars;
