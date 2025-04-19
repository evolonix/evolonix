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
  Strong,
  Text,
  TextLink,
} from '../components/catalyst';

export const Login = () => {
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
      <Heading>Sign in to your account</Heading>
      <Field>
        <Label>Email</Label>
        <Input type="email" name="email" />
      </Field>
      <Field>
        <Label>Password</Label>
        <Input type="password" name="password" />
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
        Don’t have an account?{' '}
        <TextLink href="../register">
          <Strong>Sign up</Strong>
        </TextLink>
      </Text>
    </form>
  );
};

export default Login;
