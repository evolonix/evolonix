interface MobileDetailsDrawerProps {
  children: React.ReactNode;
}

export const MobileDetailsDrawer = ({ children }: MobileDetailsDrawerProps) => {
  return <div>{children}</div>;
};

interface MobileDetailsHeaderProps {
  children: React.ReactNode;
}

export const MobileDetailsHeader = ({ children }: MobileDetailsHeaderProps) => {
  return <div>{children}</div>;
};

export default MobileDetailsDrawer;
