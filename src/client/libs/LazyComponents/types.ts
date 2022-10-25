import { ComponentType } from 'react';

export type dynamicImportReturn = Promise<{ default: ComponentType<any>; }>;
