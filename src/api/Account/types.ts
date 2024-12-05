export enum RoleAccount {
    ADMIN = "ADMIN",
    GROOM = "GROOM",
    BRIDE = "BRIDE",
    WITNESS = "WITNESS",
    GUEST = "GOŚĆ",
}

export type Account = {
    id: number;
    firstName: string;
    secondName: string;
    partnerFirstName: string;
    processingData: boolean;
    email: string;
    role: RoleAccount;
    phoneNumber: number;
    weedingDate: Date;
};