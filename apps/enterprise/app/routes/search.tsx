import {
  Divider,
  GridLayout,
  GridLayoutItem,
  PageHeader,
  Search as UiSearch,
} from '@evolonix/ui';

export const Search = () => {
  return (
    <>
      <PageHeader label="Search" />
      <Divider className="mt-4" />
      <GridLayout>
        <GridLayoutItem>
          <UiSearch
            className="max-w-80"
            autoFocus
            onSearch={(query) => {
              console.log('Search query:', query);
            }}
          />
        </GridLayoutItem>
      </GridLayout>
    </>
  );
};

export default Search;
