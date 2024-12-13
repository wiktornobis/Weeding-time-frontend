import { useQuery } from "react-query";
import { fetchTokenGuest } from "./fetchers";
import { AuthResponseData } from "../common/types";

enum QueryKeys {
    LoginGuest = "LoginGuest",
}

export const useAuthApi = (
    firstName: string,
    lastName: string,
    accessCode: string
) =>
    useQuery<AuthResponseData, Error>({
        queryKey: [QueryKeys.LoginGuest, firstName, lastName, accessCode],  // Klucz zapytania, zależny od argumentów
        queryFn: () => fetchTokenGuest(firstName, lastName, accessCode),
        staleTime: 1000 * 10,  // 10 sekund
    });
