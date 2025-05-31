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
import { Starship } from '../../../lib/data-access';

interface StarshipDialogProps {
  starship?: Starship;
  isOpen: boolean;
  onClose: () => void;
  onSave: (starship: Starship) => void;
}

const schema = z.object({
  id: z.string().optional(),
  name: z.string({ required_error: 'Name is required' }),
});

export const StarshipDialog = ({ starship, isOpen, onClose, onSave }: StarshipDialogProps) => {
  const [form, fields] = useForm<Starship>({
    id: `starship-${starship?.id ?? 'new'}`,
    defaultValue: starship,
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
        <DialogTitle>{starship ? 'Edit' : 'New'} starship</DialogTitle>
        <DialogDescription>
          {starship ? (
            <>
              Edit the details of the starship <span className="font-bold">{starship?.name}</span>.
            </>
          ) : (
            <>Add a new starship.</>
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
