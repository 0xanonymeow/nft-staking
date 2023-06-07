import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

export const Providers = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};
