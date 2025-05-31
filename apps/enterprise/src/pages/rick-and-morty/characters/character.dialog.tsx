import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { z } from 'zod';

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
} from '../../../components/catalyst';
import { Character } from '../../../lib/data-access';

interface CharacterDialogProps {
  character?: Character;
  isOpen: boolean;
  onClose: () => void;
  onSave: (character: Character) => void;
}

const schema = z.object({
  id: z.string().optional(),
  name: z.string({ required_error: 'Name is required' }),
});

export const CharacterDialog = ({ character, isOpen, onClose, onSave }: CharacterDialogProps) => {
  const [form, fields] = useForm<Character>({
    id: `character-${character?.id ?? 'new'}`,
    defaultValue: character,
    shouldValidate: 'onSubmit',
    shouldRevalidate: 'onInput',
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema,
      });
    },
    onSubmit(e, { formData }) {
      e.preventDefault();

      const submission = parseWithZod(formData, {
        schema,
      });

      if (submission.status === 'success') {
        console.log('Form submitted:', submission.value);
        onSave(submission.value);
      }
      if (submission.status === 'error') {
        console.error('Form error:', submission.error);
        submission.reply();
      }
    },
  });

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <form id={form.id} method="POST" noValidate={form.noValidate} onSubmit={form.onSubmit}>
        <input type="hidden" name={fields.id.name} value={fields.id.value} />
        <DialogTitle>{character ? 'Edit' : 'New'} character</DialogTitle>
        <DialogDescription>
          {character ? (
            <>
              Edit the details of the character <span className="font-bold">{character?.name}</span>.
            </>
          ) : (
            <>Add a new character.</>
          )}
        </DialogDescription>
        <DialogBody>
          <Field>
            <Label>Name</Label>
            <Input name={fields.name.name} placeholder="Millennium Falcon" defaultValue={fields.name.value} required autoFocus />
            {fields.name.errors ? <ErrorMessage>{fields.name.errors}</ErrorMessage> : null}
          </Field>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => onClose()}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
