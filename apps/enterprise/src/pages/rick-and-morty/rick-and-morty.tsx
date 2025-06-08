import { NavLink } from 'react-router';
import { GridLayout, GridLayoutItem } from '../../components';
import { Divider } from '../../components/catalyst';
import { PageHeader } from '../../components/page-header';

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
