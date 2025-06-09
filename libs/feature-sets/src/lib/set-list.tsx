import { useGetAllSetsQuery } from '@evolonix/data-access';

export function SetList() {
  const { loading, data } = useGetAllSetsQuery();

  return loading ? (
    <p>Loading ...</p>
  ) : (
    <ul className="mx-6 w-full list-none">
      {data &&
        data.allSets?.map((set) => (
          <li className="p-2 even:bg-slate-200">
            {set?.year} - <strong>{set?.name}</strong> ({set?.numParts} parts)
          </li>
        ))}
    </ul>
  );
}

export default SetList;
