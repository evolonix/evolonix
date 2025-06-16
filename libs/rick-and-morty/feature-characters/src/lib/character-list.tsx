import { useCharactersQuery } from '@evolonix/rick-and-morty-data-access-characters';

export function CharacterList() {
  const { loading, data } = useCharactersQuery();

  return loading ? (
    <p>Loading ...</p>
  ) : (
    <ul className="mx-6 w-full list-none">
      {data &&
        data.characters?.results?.map((character) =>
          character ? (
            <li key={character.id} className="p-2 even:bg-slate-200">
              <div className="flex items-center gap-4">
                <img
                  className="h-16 w-16 rounded-full"
                  src={character.image ?? ''}
                  alt={character.name ?? ''}
                />
                <div>
                  <h3 className="text-lg font-semibold">{character.name}</h3>
                  <p className="text-sm text-gray-600">{character.species}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Status: {character.status}
              </p>
            </li>
          ) : null
        )}
    </ul>
  );
}

export default CharacterList;
