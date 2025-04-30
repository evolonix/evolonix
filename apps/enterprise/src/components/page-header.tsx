import { Heading } from './catalyst';
import { GridLayout, GridLayoutItem } from './grid-layout';

export interface PageHeaderProps {
  label: string;
}

export const PageHeader = ({ label }: PageHeaderProps) => {
  return (
    <GridLayout disableTopPadding>
      <GridLayoutItem>
        <Heading level={1}>{label}</Heading>
      </GridLayoutItem>
    </GridLayout>
  );
};
