import { useCallback, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { GridLayout, GridLayoutItem } from '../../../components';
import { Button, Divider } from '../../../components/catalyst';
import { PageHeader } from '../../../components/page-header';
import { useScrollHeight } from '../../../lib';
import { Starship, useStarships } from '../../../lib/data-access';
import { StarshipDetails, StarshipDetailsSkeleton } from './starship.details';
import { StarshipDialog } from './starship.dialog';
import { StarshipList, StarshipListSkeleton } from './starship.list';

export const Starships = () => {
  const { id } = useParams();
  const vm = useStarships(id);
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement | null>(null);
  const listHeight = useScrollHeight(listRef, 48);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const detailsHeight = useScrollHeight(detailsRef, 48);
  const [isOpen, setIsOpen] = useState(false);
  const starship = useRef<Starship | undefined>(undefined);

  const handleAdd = () => {
    starship.current = undefined;
    setIsOpen(true);
  };

  const handleEdit = () => {
    starship.current = vm.selected;
    setIsOpen(true);
  };

  const handleSave = useCallback(
    async (starship: Starship) => {
      const updated = await vm.save(starship);
      setIsOpen(false);
      navigate(`/star-wars/starships/${updated?.id}`);
    },
    [vm, navigate]
  );

  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    if (vm.selected?.id && confirm(`Are you sure you want to delete the starship "${vm.selected.name}"?`)) {
      vm.delete(vm.selected.id);
      navigate('/star-wars/starships', { replace: true });
    }
  };

  return (
    <>
      <PageHeader label="Starships" actions={<Button onClick={handleAdd}>Add starship</Button>} />
      <Divider className="mt-4" />
      <GridLayout>
        <GridLayoutItem md={4} lg={5} xl={4}>
          <div
            ref={listRef}
            style={{ '--list-scroll-height': listHeight } as React.CSSProperties}
            className="flex h-full flex-col overflow-hidden rounded border border-zinc-200 md:h-[var(--list-scroll-height)] dark:border-zinc-600"
          >
            <div className="grow overflow-y-auto">
              {vm.showSkeleton ? <StarshipListSkeleton /> : <StarshipList starships={vm.starships} />}
            </div>
          </div>
        </GridLayoutItem>
        <GridLayoutItem md={4} lg={7} xl={8}>
          <div
            ref={detailsRef}
            style={{ '--details-scroll-height': detailsHeight } as React.CSSProperties}
            className="h-full overflow-hidden md:max-h-[var(--details-scroll-height)]"
          >
            <div className="flex h-full flex-col">
              {id ? (
                vm.showSkeleton || (vm.isLoading && vm.selected) ? (
                  <StarshipDetailsSkeleton />
                ) : (
                  <StarshipDetails starship={vm.selected} onEdit={handleEdit} onDelete={handleDelete} />
                )
              ) : (
                <>
                  <h2 className="font-bold">Starships</h2>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Explore the various starships from the Star Wars universe. Click on a starship to learn more about it.
                  </p>
                </>
              )}
            </div>
          </div>
        </GridLayoutItem>
      </GridLayout>

      <StarshipDialog starship={starship.current} isOpen={isOpen} onClose={() => setIsOpen(false)} onSave={handleSave} />
    </>
  );
};

export default Starships;
