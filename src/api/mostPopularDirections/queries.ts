import { useQuery, QueryClient } from "react-query";
import { fetchMostPopularDirection } from "./fetchers";
import { BasicResponse } from "../common/types";
import { MostPopularDirections } from "./types";

enum QueryKeys {
    DIRECTIONS = "MOSTPOPULARDIRECTION",
}

export const useMostPopularDirection = () =>
    useQuery<BasicResponse<MostPopularDirections[]>, Error>({
        queryKey: [QueryKeys.DIRECTIONS],
        queryFn: fetchMostPopularDirection,
        staleTime: 1000 * 10, //10 sekund - ten kod nadpisuje stan w main.tsx (default 5 minut)
    });

export const prefetchAREAS = async (queryClient: QueryClient) =>
    await queryClient.prefetchQuery({
        queryKey: [QueryKeys.DIRECTIONS],
        queryFn: fetchMostPopularDirection,
    });
