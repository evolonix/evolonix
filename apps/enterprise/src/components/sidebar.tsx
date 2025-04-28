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

import { CSSProperties, useCallback } from 'react';
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

export interface SidebarProps {
  isExpanded?: boolean;
}

export const Sidebar = ({ isExpanded = false }: SidebarProps) => {
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
    [pathname]
  );

  return (
    <CatalystSidebar>
      <SidebarHeader>
        <SidebarItem
          href="/"
          className="lg:mb-2.5"
          title={isExpanded ? undefined : 'Enterprise'}
        >
          <Avatar
            style={{ '--avatar-radius': 0 } as CSSProperties}
            src={Logo}
            square
            disableOutline
          />
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
            href="/settings"
            title={isExpanded ? undefined : 'Settings'}
            current={isCurrent('/settings')}
          >
            <Cog6ToothIcon />
            <SidebarLabel>Settings</SidebarLabel>
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
          'max-lg:hidden transition-[padding] duration-300 ease-in-out',
          isExpanded ? '' : 'px-1.5'
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
    </CatalystSidebar>
  );
};
