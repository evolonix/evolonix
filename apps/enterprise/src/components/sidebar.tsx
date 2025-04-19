import {
  ChevronUpIcon,
  Cog6ToothIcon,
  HomeIcon,
  InboxIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
} from '@heroicons/react/16/solid';

import Logo from '../assets/logo.svg';
import {
  Avatar,
  Sidebar as CatalystSidebar,
  Dropdown,
  DropdownButton,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from './catalyst';
import { ProfileDropdownMenu } from './profile-dropdown-menu';

export const Sidebar = () => {
  return (
    <CatalystSidebar>
      <SidebarHeader>
        <SidebarItem href="/" className="lg:mb-2.5">
          <Avatar src={Logo} square />
          <SidebarLabel>Enterprise</SidebarLabel>
        </SidebarItem>
        <SidebarSection className="max-lg:hidden">
          <SidebarItem href="/search">
            <MagnifyingGlassIcon />
            <SidebarLabel>Search</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="/inbox">
            <InboxIcon />
            <SidebarLabel>Inbox</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
      </SidebarHeader>
      <SidebarBody>
        <SidebarSection>
          <SidebarItem href="/">
            <HomeIcon />
            <SidebarLabel>Home</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="/settings">
            <Cog6ToothIcon />
            <SidebarLabel>Settings</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
        <SidebarSpacer />
        <SidebarSection>
          <SidebarItem href="/support">
            <QuestionMarkCircleIcon />
            <SidebarLabel>Support</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="/changelog">
            <SparklesIcon />
            <SidebarLabel>Changelog</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
      </SidebarBody>
      <SidebarFooter className="max-lg:hidden">
        <Dropdown>
          <DropdownButton as={SidebarItem}>
            <span className="flex min-w-0 items-center gap-3">
              <Avatar
                // src="/profile-photo.jpg"
                initials={'Erica'.charAt(0)}
                className="size-10"
                square
                alt=""
              />
              <span className="min-w-0">
                <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                  Erica
                </span>
                <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                  erica@example.com
                </span>
              </span>
            </span>
            <ChevronUpIcon />
          </DropdownButton>
          <ProfileDropdownMenu anchor="top start" />
        </Dropdown>
      </SidebarFooter>
    </CatalystSidebar>
  );
};
