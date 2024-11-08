import { useMediaQuery } from "@mui/material";
import { ReactNode } from 'react';
interface ConditionalRenderProps {
    condition: boolean;
    children: ReactNode; // Elementy do wyrenderowania, gdy warunek jest prawdziwy
    falseCondition?: ReactNode; // Elementy do wyrenderowania, gdy warunek jest fałszywy (opcjonalne)
}

export const isMobile = (): boolean => {
    return useMediaQuery('(max-width:767px)');
};

export const ConditionalRender: React.FC<ConditionalRenderProps> = ({ condition, children, falseCondition = null }) => {
    return condition ? children : falseCondition;
};

