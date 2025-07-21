import { useForm } from '@evolonix/manage-list-feature';
import { Episode, EpisodeSchema } from '@evolonix/rick-and-morty-data-access';
import { ErrorMessage, Field, Input, Label } from '@evolonix/ui';

interface EpisodeEditFormProps {
  ref?: React.Ref<HTMLFormElement>;
  episode?: Episode;
  onSubmit: (episode: Episode) => Promise<void>;
}

export const EpisodeEditForm = ({
  ref,
  episode,
  onSubmit,
}: EpisodeEditFormProps) => {
  const [form, fields] = useForm<Episode>(episode, EpisodeSchema, onSubmit);

  return (
    <form
      ref={ref}
      id={form.id}
      method="POST"
      className="flex flex-col gap-8"
      noValidate={form.noValidate}
      onSubmit={form.onSubmit}
    >
      <input type="hidden" name={fields.id.name} value={fields.id.value} />
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
        />
        {fields.episode.errors ? (
          <ErrorMessage>{fields.episode.errors}</ErrorMessage>
        ) : null}
      </Field>
    </form>
  );
};

export default EpisodeEditForm;
