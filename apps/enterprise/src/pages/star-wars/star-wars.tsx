import { NavLink } from 'react-router';
import { GridLayout, GridLayoutItem } from '../../components';
import { Divider } from '../../components/catalyst';
import { PageHeader } from '../../components/page-header';

export const StarWars = () => {
  return (
    <>
      <PageHeader label="Star Wars" />
      <Divider className="mt-4" />
      <GridLayout>
        <GridLayoutItem>
          <NavLink to="/star-wars/starships">Starships</NavLink>
        </GridLayoutItem>
      </GridLayout>
    </>
  );
};

export default StarWars;
