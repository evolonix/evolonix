import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { z } from 'zod';

import {
  Button,
  Checkbox,
  CheckboxField,
  ErrorMessage,
  Field,
  Heading,
  Input,
  Label,
  Link,
  Select,
  Strong,
  Text,
  TextLink,
} from '../components/catalyst';
import { Logo } from '../components/logo';

const schema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address'),
  name: z.string({ required_error: 'Full name is required' }),
  password: z.string({ required_error: 'Password is required' }),
  country: z.string({ required_error: 'Country is required' }),
  subscribe: z.boolean().optional(),
});

export const Register = () => {
  const [form, { email, name, password, country, subscribe }] = useForm({
    shouldValidate: 'onSubmit',
    shouldRevalidate: 'onBlur',
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema,
      });
    },
    onSubmit(e, { formData }) {
      e.preventDefault();

      const data: { [key: string]: string } = {};
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });
      console.log('Form submitted:', data);
    },
  });

  return (
    <form
      id={form.id}
      method="POST"
      className="grid w-full max-w-sm grid-cols-1 gap-8"
      noValidate={form.noValidate}
      onSubmit={form.onSubmit}
    >
      <Link
        href="/"
        className="flex items-center gap-3 text-zinc-950 dark:text-white forced-colors:text-[CanvasText]"
      >
        <Logo className="size-7 sm:size-6" />
        <span className="truncate">Enterprise</span>
      </Link>
      <Heading>Create your account</Heading>
      <Field>
        <Label>Email</Label>
        <Input type="email" name={email.name} required={email.required} />
        {email.errors ? <ErrorMessage>{email.errors}</ErrorMessage> : null}
      </Field>
      <Field>
        <Label>Full name</Label>
        <Input name={name.name} required={name.required} />
        {name.errors ? <ErrorMessage>{name.errors}</ErrorMessage> : null}
      </Field>
      <Field>
        <Label>Password</Label>
        <Input
          type="password"
          autoComplete="new-password"
          name={password.name}
          required={password.required}
        />
        {password.errors ? (
          <ErrorMessage>{password.errors}</ErrorMessage>
        ) : null}
      </Field>
      <Field>
        <Label>Country</Label>
        <Select name={country.name} required={country.required}>
          <option>Canada</option>
          <option>Mexico</option>
          <option selected>United States</option>
        </Select>
        {country.errors ? <ErrorMessage>{country.errors}</ErrorMessage> : null}
      </Field>
      <CheckboxField>
        <Checkbox name={subscribe.name} />
        <Label>Get emails about product updates and news.</Label>
        {subscribe.errors ? (
          <ErrorMessage>{subscribe.errors}</ErrorMessage>
        ) : null}
      </CheckboxField>
      <Button type="submit" className="w-full">
        Create account
      </Button>
      <Text>
        Already have an account?{' '}
        <TextLink href="../login">
          <Strong>Sign in</Strong>
        </TextLink>
      </Text>
    </form>
  );
};

export default Register;
