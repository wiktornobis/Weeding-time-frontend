import { useQuery } from "react-query";
import { fetchRegistration } from "./fetchers";
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
    weddingDate: string,
    accessCode?: string
) => {
    return useQuery<AuthResponseData, Error>({
        queryKey: [
            QueryKeys.Registration, firstName, lastName, email, encryptedPassword, role, weddingDate, accessCode,
        ],
        queryFn: () =>
            fetchRegistration(firstName, lastName, email, tel, encryptedPassword, role, weddingDate, accessCode),
    });
};
