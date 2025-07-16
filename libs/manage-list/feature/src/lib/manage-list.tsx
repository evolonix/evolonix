import { Button, Divider, PageHeader } from '@evolonix/ui';

interface ManagerListProps {
  label: string;
  newUrl: string;
  children: React.ReactNode;
}

export function ManageList({ label, newUrl, children }: ManagerListProps) {
  return (
    <>
      <PageHeader label={label} actions={<Button href={newUrl}>Add</Button>} />
      <Divider className="mt-4" />

      {children}
    </>
  );
}

export default ManageList;
