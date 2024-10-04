export type BasicResponse<T> = {
    map(arg0: (area: import("@/api/Account/types").Account[]) => { name: any; value: any; }): import("react").SetStateAction<never[]>;
    data: T;
};