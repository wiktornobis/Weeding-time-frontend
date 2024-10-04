import { useQuery } from "react-query";
import { fetchAccountData } from "./fetchers";
import { BasicResponse } from "../common/types";
import { Account } from "./types";

enum QueryKeys {
    Account = "Account",
}

export const useAccountApi = () =>
    useQuery<BasicResponse<Account[]>, Error>({
        queryKey: [QueryKeys.Account],
        queryFn: fetchAccountData,
        staleTime: 1000 * 10, //10 sekund - ten kod nadpisuje stan w main.tsx (default 5 minut)
    });
