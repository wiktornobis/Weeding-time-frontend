import { useMediaQuery } from "@mui/material";
import { ReactNode } from 'react';
interface ConditionalRenderProps {
    condition: boolean;
    children: ReactNode; // Elementy do wyrenderowania, gdy warunek jest prawdziwy
    falseCondition?: ReactNode; // Elementy do wyrenderowania, gdy warunek jest fałszywy (opcjonalne)
}
export const Cookies = {
    createCookie: (name: string, value: string, days?: number, unescapeValue?: boolean): void => {
        let expires = "";

        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }

        if (unescapeValue) {
            document.cookie = `${encodeURIComponent(name)}=${value}${expires}; path=/`;
        } else {
            document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}${expires}; path=/`;
        }
    },

    readCookie: (name: string): string | null => {
        const nameEQ = `${encodeURIComponent(name)}=`;
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(nameEQ) === 0) {
                return decodeURIComponent(cookie.substring(nameEQ.length));
            }
        }
        return null;
    },
};

export const isMobile = (): boolean => {
    return useMediaQuery('(max-width:767px)');
};

export const ConditionalRender: React.FC<ConditionalRenderProps> = ({ condition, children, falseCondition = null }) => {
    return condition ? children : falseCondition;
};
