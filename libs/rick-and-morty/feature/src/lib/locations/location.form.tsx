import { useForm } from '@evolonix/manage-list-feature';
import { Location, LocationSchema } from '@evolonix/rick-and-morty-data-access';
import { ErrorMessage, Field, Input, Label } from '@evolonix/ui';

interface LocationEditFormProps {
  ref?: React.Ref<HTMLFormElement>;
  location?: Location;
  onSubmit: (location: Location) => Promise<void>;
}

export const LocationEditForm = ({
  ref,
  location,
  onSubmit,
}: LocationEditFormProps) => {
  const [form, fields] = useForm<Location>(location, LocationSchema, onSubmit);

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
          placeholder="Location name"
          defaultValue={fields.name.value}
          required
          autoFocus
        />
        {fields.name.errors ? (
          <ErrorMessage>{fields.name.errors}</ErrorMessage>
        ) : null}
      </Field>
      <Field>
        <Label>Type</Label>
        <Input
          name={fields.type.name}
          placeholder=""
          defaultValue={fields.type.value}
          required
        />
        {fields.type.errors ? (
          <ErrorMessage>{fields.type.errors}</ErrorMessage>
        ) : null}
      </Field>
      <Field>
        <Label>Dimension</Label>
        <Input
          name={fields.dimension.name}
          placeholder=""
          defaultValue={fields.dimension.value}
          required
        />
        {fields.dimension.errors ? (
          <ErrorMessage>{fields.dimension.errors}</ErrorMessage>
        ) : null}
      </Field>
    </form>
  );
};

export default LocationEditForm;
