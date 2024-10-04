import { Dispatch, SetStateAction } from 'react';

export interface TopbarProps {
    setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}