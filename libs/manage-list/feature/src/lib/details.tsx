import { Entity } from '@evolonix/data-access';
import { Alert, AlertActions, AlertTitle, Button, Divider } from '@evolonix/ui';
import { useScrollHeight } from '@evolonix/util';
import { useEffect, useRef, useState } from 'react';

interface DetailsProps<T> {
  entity?: T;
  children: React.ReactNode;
}

export const Details = <T extends Entity>({
  entity,
  children,
}: DetailsProps<T>) => {
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const detailsHeight = useScrollHeight(detailsRef, 48);

  useEffect(() => {
    const details = detailsRef.current?.querySelector('.overflow-y-auto');
    details?.scrollTo({ top: 0 });
  }, [entity]);

  return (
    <div
      ref={detailsRef}
      style={
        {
          '--details-scroll-height': detailsHeight,
        } as React.CSSProperties
      }
      className="flex h-full flex-col md:max-h-[var(--details-scroll-height)]"
    >
      {children}
    </div>
  );
};

export const DetailsTitle = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="font-bold">{children}</h2>;
};

interface DetailsActionsProps {
  deletePrompt: string;
  editUrl: string;
  onDelete: () => void;
}

export const DetailsActions = ({
  deletePrompt,
  editUrl,
  onDelete,
}: DetailsActionsProps) => {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <Button href={editUrl} outline>
          Edit
        </Button>
        <Button color="red" onClick={() => setShowAlert(true)}>
          Delete
        </Button>
      </div>

      <Alert open={showAlert} onClose={setShowAlert}>
        <AlertTitle>{deletePrompt}</AlertTitle>
        <AlertActions>
          <Button plain onClick={() => setShowAlert(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setShowAlert(false);
              onDelete();
            }}
          >
            Confirm
          </Button>
        </AlertActions>
      </Alert>
    </>
  );
};

interface DetailsHeaderProps {
  children: React.ReactNode;
}

export const DetailsHeader = ({ children }: DetailsHeaderProps) => {
  return (
    <header className="bg-zinc-100 dark:bg-zinc-900">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        {children}
      </div>
      <Divider />
    </header>
  );
};

interface DetailsBodyProps {
  children: React.ReactNode;
}

export const DetailsBody = ({ children }: DetailsBodyProps) => {
  return (
    <div className="flex grow flex-col gap-2 overflow-y-auto pt-4">
      {children}
    </div>
  );
};

export const DetailsBodySkeleton = () => {
  return <div>Loading...</div>;
};

export default Details;
