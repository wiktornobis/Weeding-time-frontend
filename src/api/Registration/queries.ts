import { useQuery } from "react-query";
import { registration } from "./fetchers";
import { AuthResponseData } from "../common/types";

enum QueryKeys {
    Registration = "Registration",
}

export const useRegisterApi = (
    firstName: string,
    lastName: string,
    email: string,
    tel: string | null,
    encryptedPassword: string,
    role: string,
    weddingDate: Date,
    accessCode?: string | undefined
) => {
    return useQuery<AuthResponseData, Error>({
        queryKey: [
            QueryKeys.Registration, firstName, lastName, email, tel, encryptedPassword, role, weddingDate, accessCode,
        ],
        queryFn: () =>
            registration(firstName, lastName, email, tel, encryptedPassword, role, weddingDate, accessCode),
    });
};
