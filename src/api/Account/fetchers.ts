import { BASE_URL_LOGGED_USER } from "@/ts/constants/variables";
import { Account } from "./types";

export const fetchAccountData = async (): Promise<Account[]> => {
    const response = await fetch(`${BASE_URL_LOGGED_USER}/ajax_account_settings.json`);

    if (response.ok) {
        console.log(response.json());
        return await response.json();
    }

    throw new Error("Failed to fetch data.");
};
