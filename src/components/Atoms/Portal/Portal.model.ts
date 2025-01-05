import { type ReactElement } from 'react';

export interface PortalModel {
    children: ReactElement;
    show: boolean;
}