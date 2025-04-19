import Logo from '../assets/logo.svg';
import {
  Avatar,
  Button,
  Field,
  Heading,
  Input,
  Label,
  Link,
  Strong,
  Text,
  TextLink,
} from '../components/catalyst';

export const ForgotPassword = () => {
  return (
    <form
      action=""
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
      <Heading>Reset your password</Heading>
      <Text>
        Enter your email and we’ll send you a link to reset your password.
      </Text>
      <Field>
        <Label>Email</Label>
        <Input type="email" name="email" />
      </Field>
      <Button type="submit" className="w-full">
        Reset password
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

export default ForgotPassword;
