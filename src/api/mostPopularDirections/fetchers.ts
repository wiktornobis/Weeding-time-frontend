import {BASE_URL} from "@/ts/constants/variables";
import {BasicResponse} from "../common/types";
import {MostPopularDirections} from "./types";

export const fetchMostPopularDirection = async (): Promise<BasicResponse<MostPopularDirections[]>> => {
    const response = await fetch(`${BASE_URL}/mostPopularDirection.json`);

    if (response.ok) {
        return await response.json();
    }

    throw new Error("Failed to fetch data.");
};
