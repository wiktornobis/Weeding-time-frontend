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
