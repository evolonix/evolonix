// This script provides helpers to provide interactive functionality in previews

// Toggle the sidebar for mobile
export function toggleSidebar() {
  const overlay = document.querySelector('[role="dialog"] > div');
  const sidebar = overlay?.nextElementSibling;
  const isOpen = sidebar?.classList.contains('hidden');

  overlay?.classList.toggle('block', isOpen);
  overlay?.classList.toggle('hidden', !isOpen);

  sidebar?.classList.toggle('flex', isOpen);
  sidebar?.classList.toggle('hidden', !isOpen);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).toggleSidebar = toggleSidebar;

// Toggle the sidebar expanded state
export function toggleSidebarExpanded() {
  // the id="component" attribute is added to the wrapper element in the front matter of the Design System Nav component
  // to facilitate this functionality
  const component = document.querySelector('#component > .group');
  const isExpanded = component?.classList.contains('expanded');

  if (isExpanded) {
    component?.classList.remove('expanded');
  } else {
    component?.classList.add('expanded');
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).toggleSidebarExpanded = toggleSidebarExpanded;

// Called on page load to select the page in the sidebar with the name provided
export function selectSidebarNavItem(name: string) {
  const findIndices = (navItems: Element[], name: string): number[] => {
    const indices: number[] = [];
    navItems.forEach((item, index) => {
      if (item.textContent?.trim() === name) {
        indices.push(index);
      }
    });
    return indices;
  };

  const navItems = document.querySelectorAll('nav > ul > li > ul > li > a');
  const selectedIndices = findIndices(Array.from(navItems), name);
  // Current: "text-purple-800", Default: "text-neutral-800 hover:text-purple-800"
  navItems.forEach((item, index) => {
    item.classList.toggle('text-purple-800', selectedIndices.includes(index));
    const selectedIndicator = item.nextElementSibling;
    selectedIndicator?.classList.toggle(
      'hidden',
      !selectedIndices.includes(index),
    );

    item.classList.toggle('text-neutral-800', !selectedIndices.includes(index));
    item.classList.toggle(
      'hover:text-purple-800',
      !selectedIndices.includes(index),
    );
  });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).selectSidebarNavItem = selectSidebarNavItem;

// Toggle a menu for the specified button
export function toggleDropdown(buttonId: string, open = false) {
  const button = document.getElementById(buttonId);
  const menu = button?.parentElement?.nextElementSibling;
  const isOpen = open || menu?.classList.contains('hidden');

  menu?.classList.toggle('hidden', !isOpen);
  menu?.classList.toggle('block', isOpen);
  button?.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).toggleDropdown = toggleDropdown;

export function selectDropdownValue(
  buttonId: string,
  value: string,
  updateButtonValue = false,
) {
  const button = document.getElementById(buttonId);
  if (updateButtonValue) {
    const buttonSpan = button?.querySelector('span');
    if (buttonSpan) buttonSpan.textContent = value;
  }

  const menu = button?.parentElement?.nextElementSibling;
  const items = menu?.querySelectorAll('a, button');
  const selectedIndex = Array.from(items ?? []).findIndex(
    (item) => item.textContent?.trim() === value,
  );
  // Active: "font-semibold", Not Active: ""
  items?.forEach((item, index) => {
    item.classList.toggle('font-semibold', index === selectedIndex);
    item
      ?.querySelector('svg')
      ?.classList.toggle('hidden', index !== selectedIndex);
  });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).selectDropdownValue = selectDropdownValue;
