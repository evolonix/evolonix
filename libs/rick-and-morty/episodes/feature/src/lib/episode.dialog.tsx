import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';

import {
  Episode,
  EpisodeSchema,
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

interface EpisodeDialogProps {
  episode?: Episode;
  isOpen: boolean;
  onClose: (value: boolean) => void;
  onSave: (episode: Episode) => void;
}

export const EpisodeDialog = ({
  episode,
  isOpen,
  onClose,
  onSave,
}: EpisodeDialogProps) => {
  const [form, fields] = useForm<Episode>({
    id: `episode-${episode?.id ?? 'new'}`,
    defaultValue: episode,
    shouldValidate: 'onSubmit',
    shouldRevalidate: 'onInput',
    onValidate({ formData }) {
      const errors = parseWithZod(formData, {
        schema: EpisodeSchema,
      });
      console.log({ errors });
      return errors;
    },
    onSubmit(e, { formData }) {
      e.preventDefault();

      const submission = parseWithZod(formData, {
        schema: EpisodeSchema,
      });

      if (submission.status === 'success') {
        console.log('Form submitted:', submission.value);
        onSave({ ...episode, ...submission.value } as Episode);
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
        <DialogTitle>{episode ? 'Edit' : 'New'} episode</DialogTitle>
        <DialogDescription>
          {episode ? (
            <>
              Edit the details of the episode{' '}
              <span className="font-bold">{episode?.name}</span>.
            </>
          ) : (
            <>Add a new episode.</>
          )}
        </DialogDescription>
        <DialogBody>
          <Field>
            <Label>Name</Label>
            <Input
              name={fields.name.name}
              placeholder="Episode name"
              defaultValue={fields.name.value}
              required
              autoFocus
            />
            {fields.name.errors ? (
              <ErrorMessage>{fields.name.errors}</ErrorMessage>
            ) : null}
          </Field>
          <Field>
            <Label>Air date</Label>
            <Input
              name={fields.air_date.name}
              placeholder=""
              defaultValue={fields.air_date.value}
              required
              autoFocus
            />
            {fields.air_date.errors ? (
              <ErrorMessage>{fields.air_date.errors}</ErrorMessage>
            ) : null}
          </Field>
          <Field>
            <Label>Episode</Label>
            <Input
              name={fields.episode.name}
              placeholder=""
              defaultValue={fields.episode.value}
              required
              autoFocus
            />
            {fields.episode.errors ? (
              <ErrorMessage>{fields.episode.errors}</ErrorMessage>
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
