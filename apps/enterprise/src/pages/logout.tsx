import Logo from '../assets/logo.svg';
import { Avatar, Button, Heading, Link } from '../components/catalyst';

export const Logout = () => {
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
      <Heading>Sign out of your account</Heading>
      <Button type="submit" className="w-full">
        Logout
      </Button>
    </form>
  );
};

export default Logout;
