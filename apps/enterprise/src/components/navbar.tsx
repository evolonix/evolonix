import { InboxIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid';

import { Avatar, Navbar as CatalystNavbar, Dropdown, DropdownButton, NavbarItem, NavbarSection, NavbarSpacer } from './catalyst';
import { ProfileDropdownMenu } from './profile-dropdown-menu';

export const Navbar = () => {
  return (
    <CatalystNavbar>
      <NavbarSpacer />
      <NavbarSection>
        <NavbarItem href="/search" aria-label="Search">
          <MagnifyingGlassIcon />
        </NavbarItem>
        <NavbarItem href="/inbox" aria-label="Inbox">
          <InboxIcon />
        </NavbarItem>
        <Dropdown>
          <DropdownButton as={NavbarItem}>
            <Avatar
              // src="/profile-photo.jpg"
              initials={'Erica'.charAt(0)}
              square
              alt=""
            />
          </DropdownButton>
          <ProfileDropdownMenu anchor="bottom end" />
        </Dropdown>
      </NavbarSection>
    </CatalystNavbar>
  );
};
