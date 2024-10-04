export enum RoleAccount {
    Groom = "Pan młody",
    Bride = "Panna młoda",
    Witness = "Świadek",
    Other = "Inna"
}

export type Account = {
    id: number;
    firstName: string;
    secondName: string;
    partnerFirstName: string;
    processingData: boolean;
    email: string;
    role: RoleAccount;
    tel: number;
    weedingDate: Date;
};