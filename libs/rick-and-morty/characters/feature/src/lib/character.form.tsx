import { useForm } from '@evolonix/feature';
import {
  Character,
  CharacterSchema,
} from '@evolonix/rick-and-morty-shared-data-access';
import { ErrorMessage, Field, Input, Label } from '@evolonix/ui';

interface CharacterEditFormProps {
  character?: Character;
  onSubmit: (character: Character) => void;
}

export const CharacterEditForm = ({
  character,
  onSubmit,
  ...props
}: CharacterEditFormProps & React.ComponentProps<'form'>) => {
  const [form, fields] = useForm<Character>(
    character,
    CharacterSchema,
    onSubmit,
  );

  return (
    <form
      {...props}
      id={form.id}
      method="POST"
      noValidate={form.noValidate}
      onSubmit={form.onSubmit}
    >
      <input type="hidden" name={fields.id.name} value={fields.id.value} />
      <Field>
        <Label>Name</Label>
        <Input
          name={fields.name.name}
          placeholder="Rick Sanchez"
          defaultValue={fields.name.value}
          required
          autoFocus
        />
        {fields.name.errors ? (
          <ErrorMessage>{fields.name.errors}</ErrorMessage>
        ) : null}
      </Field>
      <Field>
        <Label>Status</Label>
        <Input
          name={fields.status.name}
          placeholder="Alive"
          defaultValue={fields.status.value}
          required
          autoFocus
        />
        {fields.status.errors ? (
          <ErrorMessage>{fields.status.errors}</ErrorMessage>
        ) : null}
      </Field>
      <Field>
        <Label>Species</Label>
        <Input
          name={fields.species.name}
          placeholder="Human"
          defaultValue={fields.species.value}
          required
          autoFocus
        />
        {fields.species.errors ? (
          <ErrorMessage>{fields.species.errors}</ErrorMessage>
        ) : null}
      </Field>
      <Field>
        <Label>Type</Label>
        <Input
          name={fields.type.name}
          placeholder=""
          defaultValue={fields.type.value}
          required
          autoFocus
        />
        {fields.type.errors ? (
          <ErrorMessage>{fields.type.errors}</ErrorMessage>
        ) : null}
      </Field>
      <Field>
        <Label>Gender</Label>
        <Input
          name={fields.gender.name}
          placeholder="Male"
          defaultValue={fields.gender.value}
          required
          autoFocus
        />
        {fields.gender.errors ? (
          <ErrorMessage>{fields.gender.errors}</ErrorMessage>
        ) : null}
      </Field>
    </form>
  );
};

export default CharacterEditForm;
