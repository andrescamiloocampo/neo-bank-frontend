import { BalanceModel } from "../../../models/User.model";

export interface BalanceSelectorModel {
  balance: BalanceModel | null;
}

export type AccountType ='Savings Account'|'Current Account'|'Credit Card'|'Pocket'

export interface SelectBalanceModel {
  accountId?: string;
  accountType?: AccountType; 
  amount?: number;
}

export interface ReceiverModel {
  username?: string;
  amount?: number;  
  description?: string;
}