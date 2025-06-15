import { useCharactersQuery } from '@evolonix/rick-and-morty-data-access-characters';

export function CharacterList() {
  const { loading, data } = useCharactersQuery();

  return loading ? (
    <p>Loading ...</p>
  ) : (
    <ul className="mx-6 w-full list-none">
      {data?.characters?.results
        ?.filter((character) => character !== null)
        .map((character) => (
          <li key={character.id} className="p-2 even:bg-slate-200">
            <h3 className="text-lg font-bold">{character.name}</h3>
            <p className="text-sm text-gray-600">
              {character.species} - {character.status}
            </p>
          </li>
        ))}
    </ul>
  );
}

export default CharacterList;
