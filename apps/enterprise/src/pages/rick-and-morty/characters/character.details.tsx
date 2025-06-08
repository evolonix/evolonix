import { Button, Divider } from '../../../components/catalyst';
import { Character } from '../../../lib/data-access';

interface CharacterDetailsProps {
  character: Character;
  onEdit: () => void;
  onDelete: () => void;
}

export const CharacterDetails = ({ character, onEdit, onDelete }: CharacterDetailsProps) => {
  return (
    <>
      <header className="mb-2 bg-zinc-100 dark:bg-zinc-900">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-bold">{character.name}</h2>
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={onEdit}>Edit</Button>
            <Button onClick={onDelete}>Delete</Button>
          </div>
        </div>
        <Divider />
      </header>

      <div className="flex grow flex-col gap-2 overflow-y-auto">
        {character.image ? <img src={character.image} alt={character.name ?? ''} className="h-48 w-48 rounded-lg object-cover" /> : null}
        <dl className="grid max-w-min columns-2 gap-2">
          <dt className="font-bold">Status:</dt>
          <dd className="col-start-2">{character.status}</dd>

          <dt className="font-bold">Species:</dt>
          <dd className="col-start-2">{character.species}</dd>

          {character.type ? (
            <>
              <dt className="font-bold">Type:</dt>
              <dd className="col-start-2">{character.type}</dd>
            </>
          ) : null}

          <dt className="font-bold">Gender:</dt>
          <dd className="col-start-2">{character.gender}</dd>
        </dl>
      </div>
    </>
  );
};

export const CharacterDetailsSkeleton = () => {
  return (
    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
      <h2 className="h-7 w-full animate-pulse rounded-full bg-zinc-900 font-bold sm:max-w-52 dark:bg-zinc-100">&nbsp;</h2>
      <div className="flex flex-wrap items-center gap-2">
        <Button disabled>Edit</Button>
        <Button disabled>Delete</Button>
      </div>
    </div>
  );
};
