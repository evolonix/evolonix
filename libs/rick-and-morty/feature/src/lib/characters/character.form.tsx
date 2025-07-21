import { useForm } from '@evolonix/manage-list-feature';
import {
  Character,
  CharacterSchema,
} from '@evolonix/rick-and-morty-data-access';
import {
  ErrorMessage,
  Field,
  ImageUploader,
  ImageUploaderRef,
  Input,
  Label,
} from '@evolonix/ui';
import { useRef } from 'react';

import missingImage from '../assets/missing-image.jpg';

interface CharacterEditFormProps {
  ref?: React.Ref<HTMLFormElement>;
  character?: Character;
  onSubmit: (character: Character) => Promise<void>;
}

export const CharacterEditForm = ({
  ref,
  character,
  onSubmit,
}: CharacterEditFormProps) => {
  const uploaderRef = useRef<ImageUploaderRef>(null);

  const interceptSubmit = async (character: Character) => {
    const file = uploaderRef.current?.getFile();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      // const res = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData,
      // });

      // if (!res.ok) throw new Error('Upload failed');
      // const { url } = await res.json();
      const url =
        'https://i.etsystatic.com/31548528/r/il/ffde13/5804742914/il_300x300.5804742914_ap2d.jpg'; // Mock URL for testing

      uploaderRef.current?.setUploadedUrl(url);
      character = { ...character, image: url };
    }

    onSubmit(character);
  };

  const [form, fields] = useForm<Character>(
    character,
    CharacterSchema,
    interceptSubmit,
  );

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
      <ImageUploader
        ref={uploaderRef}
        name={fields.image.name}
        initialImageUrl={character?.image}
        missingImage={missingImage}
      />
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
        />
        {fields.gender.errors ? (
          <ErrorMessage>{fields.gender.errors}</ErrorMessage>
        ) : null}
      </Field>
    </form>
  );
};

export default CharacterEditForm;
