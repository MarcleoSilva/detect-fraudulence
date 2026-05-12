import { Injectable, OnModuleInit } from '@nestjs/common';
import { TransactionEntity } from '../transaction/transaction.entity';
import { nanoid } from 'nanoid';
import { TransactionDto } from '../transaction/transaction.dto';

export interface DatabaseSchema {
    transactions: TransactionEntity[];
}

@Injectable()
export class DatabaseService implements OnModuleInit {


    private db: any;
    async onModuleInit() {
        const { JSONFilePreset } = await import('lowdb/node');
        const defaultData: DatabaseSchema = { transactions: [] }

        this.db = await JSONFilePreset('data/database.json', defaultData);
    };

    getTransactions(): TransactionEntity[] {
        return this.db.data.transactions;
    };

    async addTransaction(transaction: TransactionDto): Promise<TransactionEntity> {

        const id = nanoid(12)
        
        const newTransaction: TransactionEntity = {
            ...transaction,
            id: id,
        }
        await this.db.update((data: DatabaseSchema) => {
            data.transactions.push(newTransaction);
        })

        return newTransaction;
    };
}