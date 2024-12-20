import { useQuery } from "react-query";
import { fetchToken } from "./fetchers";
import { AuthResponseData } from "../common/types";

enum QueryKeys {
    Login = "Login",
}

export const useAuthApi = (
    email: string,
    encryptedPassword: string
) =>
    useQuery<AuthResponseData, Error>({
        queryKey: [QueryKeys.Login, email, encryptedPassword],  // Klucz zapytania, zależny od argumentów
        queryFn: () => fetchToken(email, encryptedPassword),
        staleTime: 1000 * 10,  // 10 sekund
    });
