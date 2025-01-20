type TransactionType = 'Income' | 'Expediture';

export interface TransactionModel{
    id: string;
    transaction_type: TransactionType;
    account_type: string;
    amount: number;
    timestamp: Date;
    description:string;
    fromAccount: string;
    fromPocket: string;
    userId: string;
}
