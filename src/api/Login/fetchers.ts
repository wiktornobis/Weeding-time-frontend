import { BASE_URL_LOGIN } from "@/ts/constants/variables";

export const fetchToken = async (
    email: string,
    encryptedPassword: string
) => {
    const response = await fetch(BASE_URL_LOGIN, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            encryptedPassword,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch token");
    }
    return await response.json();
};
