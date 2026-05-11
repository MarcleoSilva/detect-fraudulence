import { Customer } from "src/common/types/customer.type";
import { LastTransaction } from "src/common/types/last-transaction.type";
import { Merchant } from "src/common/types/merchant.type";
import { Terminal } from "src/common/types/terminal.type";
import { TransactionInfo } from "src/common/types/transaction-info.type";

export interface TransactionEntity {
    id: string;
    transactionInfo: TransactionInfo;
    merchant: Merchant;
    customer:  Customer;
    terminal: Terminal;
    lastTrasaction: LastTransaction;
}