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
  Strong,
  Text,
  TextLink,
} from '../components/catalyst';
import { Logo } from '../components/logo';

const schema = z.object({
  email: z.string({ required_error: 'Email is required' }).email('Invalid email address'),
  password: z.string({ required_error: 'Password is required' }),
});

export const Login = () => {
  const [form, { email, password }] = useForm({
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
      <Link href="/" className="flex items-center gap-3 text-zinc-950 dark:text-white forced-colors:text-[CanvasText]">
        <Logo className="size-7 sm:size-6" />
        <span className="truncate">Enterprise</span>
      </Link>
      <Heading>Sign in to your account</Heading>
      <Field>
        <Label>Email</Label>
        <Input type="email" name={email.name} required={email.required} />
        {email.errors ? <ErrorMessage>{email.errors}</ErrorMessage> : null}
      </Field>
      <Field>
        <Label>Password</Label>
        <Input type="password" name={password.name} required={password.required} />
        {password.errors ? <ErrorMessage>{password.errors}</ErrorMessage> : null}
      </Field>
      <div className="flex items-center justify-between">
        <CheckboxField>
          <Checkbox name="remember" />
          <Label>Remember me</Label>
        </CheckboxField>
        <Text>
          <TextLink href="../forgot-password">
            <Strong>Forgot password?</Strong>
          </TextLink>
        </Text>
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
      <Text>
        Don't have an account?{' '}
        <TextLink href="../register">
          <Strong>Sign up</Strong>
        </TextLink>
      </Text>
    </form>
  );
};

export default Login;
