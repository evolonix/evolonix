import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';

import {
  Character,
  CharacterSchema,
} from '@evolonix/rick-and-morty-shared-data-access';
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
  ErrorMessage,
  Field,
  Input,
  Label,
} from '@evolonix/ui';

interface CharacterDialogProps {
  character?: Character;
  isOpen: boolean;
  onClose: (value: boolean) => void;
  onSave: (character: Character) => void;
}

export const CharacterDialog = ({
  character,
  isOpen,
  onClose,
  onSave,
}: CharacterDialogProps) => {
  const [form, fields] = useForm<Character>({
    id: `character-${character?.id ?? 'new'}`,
    defaultValue: character,
    shouldValidate: 'onSubmit',
    shouldRevalidate: 'onInput',
    onValidate({ formData }) {
      const errors = parseWithZod(formData, {
        schema: CharacterSchema,
      });
      console.log({ errors });
      return errors;
    },
    onSubmit(e, { formData }) {
      e.preventDefault();

      const submission = parseWithZod(formData, {
        schema: CharacterSchema,
      });

      if (submission.status === 'success') {
        console.log('Form submitted:', submission.value);
        onSave({ ...character, ...submission.value } as Character);
      }
      if (submission.status === 'error') {
        console.error('Form error:', submission.error);
        submission.reply();
      }
    },
  });

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <form
        id={form.id}
        method="POST"
        noValidate={form.noValidate}
        onSubmit={form.onSubmit}
      >
        <input type="hidden" name={fields.id.name} value={fields.id.value} />
        <DialogTitle>{character ? 'Edit' : 'New'} character</DialogTitle>
        <DialogDescription>
          {character ? (
            <>
              Edit the details of the character{' '}
              <span className="font-bold">{character?.name}</span>.
            </>
          ) : (
            <>Add a new character.</>
          )}
        </DialogDescription>
        <DialogBody>
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
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => onClose(false)}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
