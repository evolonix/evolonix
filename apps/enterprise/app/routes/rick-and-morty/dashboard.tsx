import { GridLayout, GridLayoutItem, Link, PageHeader } from '@evolonix/ui';

export const RickAndMorty = () => {
  return (
    <>
      <PageHeader label="Rick & Morty" />
      <GridLayout>
        <GridLayoutItem>
          <ul>
            <li>
              <Link href="/rick-and-morty/characters">Characters</Link>
            </li>
            <li>
              <Link href="/rick-and-morty/episodes">Episodes</Link>
            </li>
          </ul>
        </GridLayoutItem>
      </GridLayout>
    </>
  );
};

export default RickAndMorty;
