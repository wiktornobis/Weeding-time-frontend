export type BasicResponse<T> = {
    map(arg0: (area: import("../mostPopularDirections/types").MostPopularDirections[]) => { name: any; value: any; }): import("react").SetStateAction<never[]>;
    data: T;
};