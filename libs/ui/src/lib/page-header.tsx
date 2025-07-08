import { Heading } from './catalyst';
import { GridLayout, GridLayoutItem } from './grid-layout';

export interface PageHeaderProps {
  label: string;
  actions?: React.ReactNode;
}

export const PageHeader = ({ label, actions }: PageHeaderProps) => {
  return (
    <GridLayout disableTopPadding>
      <GridLayoutItem>
        <div className="flex flex-wrap items-center justify-between gap-2 min-h-9">
          <Heading level={1}>{label}</Heading>
          {actions ? (
            <div className="flex flex-wrap items-center gap-2">{actions}</div>
          ) : null}
        </div>
      </GridLayoutItem>
    </GridLayout>
  );
};
