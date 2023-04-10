import React from 'react';
import { PageContainerProps } from './PageContainer.types';
import { PageContainerWrappper } from './PageContainer.styles';

export function PageContainer({ children }: PageContainerProps) {
  return <PageContainerWrappper>{children}</PageContainerWrappper>;
}
