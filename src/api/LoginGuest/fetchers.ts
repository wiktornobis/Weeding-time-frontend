import { BASE_URL_LOGIN_GUEST } from "@/ts/constants/variables";

export const fetchTokenGuest = async (
    firstName: string,
    lastName: string,
    accessCode: string
) => {
    const response = await fetch(BASE_URL_LOGIN_GUEST, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName,
            lastName,
            accessCode
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData?.message || "Wystąpił błąd podczas logowania.";
        throw new Error(errorMessage);
    }
    return await response.json();
};
