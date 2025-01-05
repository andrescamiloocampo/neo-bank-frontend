export interface UserModel {
    id: string;
    email: string;
    username: string;
    name: string; 
    lastname: string;
    password?: string;
    balance?: BalanceModel[];
}

export interface BalanceModel {
    id: string;
    totalAmount: number;
    accountType: string;
    pockets?: PocketModel[];
}

export interface PocketModel {
    id: string;
    name: string;
    sub_amount: number;
}