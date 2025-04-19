import Logo from '../assets/logo.svg';
import {
  Avatar,
  Button,
  Checkbox,
  CheckboxField,
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

export const Register = () => {
  return (
    <form
      action="#"
      method="POST"
      className="grid w-full max-w-sm grid-cols-1 gap-8"
    >
      <Link
        href="/"
        className="flex items-center gap-3 text-zinc-950 dark:text-white forced-colors:text-[CanvasText]"
      >
        <Avatar src={Logo} square className="size-6" />
        <span className="truncate">Enterprise</span>
      </Link>
      <Heading>Create your account</Heading>
      <Field>
        <Label>Email</Label>
        <Input type="email" name="email" />
      </Field>
      <Field>
        <Label>Full name</Label>
        <Input name="name" />
      </Field>
      <Field>
        <Label>Password</Label>
        <Input type="password" name="password" autoComplete="new-password" />
      </Field>
      <Field>
        <Label>Country</Label>
        <Select name="country">
          <option>Canada</option>
          <option>Mexico</option>
          <option selected>United States</option>
        </Select>
      </Field>
      <CheckboxField>
        <Checkbox name="remember" />
        <Label>Get emails about product updates and news.</Label>
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
