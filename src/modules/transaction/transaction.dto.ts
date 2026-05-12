import { IsNotEmpty, IsString } from "class-validator";
import type { Customer } from "src/common/types/customer.type";
import type { LastTransaction } from "src/common/types/last-transaction.type";
import type { Merchant } from "src/common/types/merchant.type";
import type { Terminal } from "src/common/types/terminal.type";
import type { TransactionInfo } from "src/common/types/transaction-info.type";

export class TransactionDto {
    @IsNotEmpty()
    transactionInfo!: TransactionInfo;
    
    @IsNotEmpty()
    merchant!: Merchant;
    
    @IsNotEmpty()
    customer!:  Customer;
    
    @IsNotEmpty()
    terminal!: Terminal;
    
    @IsNotEmpty()
    lastTrasaction!: LastTransaction;
}