import {
  ChevronUpIcon,
  Cog6ToothIcon,
  HomeIcon,
  InboxIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
} from '@heroicons/react/16/solid';
import clsx from 'clsx';
import { useLocation } from 'react-router';

import { useCallback } from 'react';
import {
  Avatar,
  Dropdown,
  DropdownButton,
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from './catalyst';
import { RickAndMortyIcon, RickIcon } from './icons';
import { Logo } from './logo';
import { ProfileDropdownMenu } from './profile-dropdown-menu';

export interface SidebarProps {
  isExpanded?: boolean;
}

export const CustomSidebar = ({ isExpanded = false }: SidebarProps) => {
  const { pathname } = useLocation();

  const isCurrent = useCallback(
    (href: string, end = false) => {
      const endSlashPosition =
        href !== '/' && href.endsWith('/') ? href.length - 1 : href.length;
      return (
        pathname === href ||
        (!end &&
          pathname.startsWith(href) &&
          pathname.charAt(endSlashPosition) === '/')
      );
    },
    [pathname],
  );

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarItem
          href="/"
          className="lg:mb-2.5"
          title={isExpanded ? undefined : 'Enterprise'}
        >
          <Logo />
          <SidebarLabel>Enterprise</SidebarLabel>
        </SidebarItem>
        <SidebarSection className="max-lg:hidden">
          <SidebarItem
            href="/search"
            title={isExpanded ? undefined : 'Search'}
            current={isCurrent('/search')}
          >
            <MagnifyingGlassIcon />
            <SidebarLabel>Search</SidebarLabel>
          </SidebarItem>
          <SidebarItem
            href="/inbox"
            title={isExpanded ? undefined : 'Inbox'}
            current={isCurrent('/inbox')}
          >
            <InboxIcon />
            <SidebarLabel>Inbox</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
      </SidebarHeader>
      <SidebarBody>
        <SidebarSection>
          <SidebarItem
            href="/"
            title={isExpanded ? undefined : 'Home'}
            current={isCurrent('/')}
          >
            <HomeIcon />
            <SidebarLabel>Home</SidebarLabel>
          </SidebarItem>
          <SidebarItem
            href="/admin/settings"
            title={isExpanded ? undefined : 'Settings'}
            current={isCurrent('/admin/settings')}
          >
            <Cog6ToothIcon />
            <SidebarLabel>Settings</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
        <SidebarSection>
          <SidebarHeading
            isExpanded={isExpanded}
            initials="RM"
            aria-label="Rick & Morty"
          >
            Rick & Morty
          </SidebarHeading>
          <SidebarItem
            href="/rick-and-morty"
            title={isExpanded ? undefined : 'Dashboard'}
            current={isCurrent('/rick-and-morty', true)}
          >
            <RickAndMortyIcon />
            <SidebarLabel>Dashboard</SidebarLabel>
          </SidebarItem>
          <SidebarItem
            href="/rick-and-morty/characters"
            title={isExpanded ? undefined : 'Characters'}
            current={isCurrent('/rick-and-morty/characters')}
          >
            <RickIcon />
            <SidebarLabel>Characters</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
        <SidebarSpacer />
        <SidebarSection>
          <SidebarItem
            href="/support"
            title={isExpanded ? undefined : 'Support'}
            current={isCurrent('/support')}
          >
            <QuestionMarkCircleIcon />
            <SidebarLabel>Support</SidebarLabel>
          </SidebarItem>
          <SidebarItem
            href="/changelog"
            title={isExpanded ? undefined : 'Changelog'}
            current={isCurrent('/changelog')}
          >
            <SparklesIcon />
            <SidebarLabel>Changelog</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
      </SidebarBody>
      <SidebarFooter
        className={clsx(
          'transition-[padding] duration-300 ease-in-out max-lg:hidden',
          isExpanded ? '' : 'px-1.5',
        )}
      >
        <Dropdown>
          <DropdownButton
            as={SidebarItem}
            title={isExpanded ? undefined : 'Erica <erica@example.com>'}
          >
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
                <span className="block truncate text-xs/5 font-normal text-zinc-600 dark:text-zinc-400">
                  erica@example.com
                </span>
              </span>
            </span>
            {isExpanded ? <ChevronUpIcon /> : null}
          </DropdownButton>
          <ProfileDropdownMenu anchor="top start" />
        </Dropdown>
      </SidebarFooter>
    </Sidebar>
  );
};
