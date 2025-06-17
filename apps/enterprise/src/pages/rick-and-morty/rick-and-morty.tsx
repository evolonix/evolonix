import { Divider, GridLayout, GridLayoutItem, PageHeader } from '@evolonix/ui';
import { NavLink } from 'react-router';

export const RickAndMorty = () => {
  return (
    <>
      <PageHeader label="Rick & Morty" />
      <Divider className="mt-4" />
      <GridLayout>
        <GridLayoutItem>
          <NavLink to="/rick-and-morty/characters">Characters</NavLink>
        </GridLayoutItem>
      </GridLayout>
    </>
  );
};

export default RickAndMorty;
