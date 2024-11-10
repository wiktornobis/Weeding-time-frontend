import { BASE_URL_REGISTRATION } from "@/ts/constants/variables";

export const registration = async (
    firstName: string,
    lastName: string,
    email: string,
    tel: string | null,
    encryptedPassword: string,
    role: string,
    weddingDate: string,
    accessCode?: string
) => {
    const response = await fetch(BASE_URL_REGISTRATION, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            tel,
            encryptedPassword,
            role,
            weddingDate,
            accessCode,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to registration");
    }

    return await response.json();
};
