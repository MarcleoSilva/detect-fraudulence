import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { DatabaseService } from './database.service';
import type { TransactionEntity } from '../transaction/transaction.entity';

@Controller('database')
export class DatabaseController {
    
    constructor(private readonly database: DatabaseService){}

    @Public()
    @Get('list-vector')
    @HttpCode(HttpStatus.OK)
    async listVectors() {
        return this.database.getReferences();
    }
}
