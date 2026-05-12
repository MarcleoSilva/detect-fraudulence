import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { DatabaseService } from './database.service';
import type { TransactionEntity } from '../transaction/transaction.entity';

@Controller('database')
export class DatabaseController {
    
    constructor(private readonly database: DatabaseService){}

    @Public()
    @Post('register')
    @HttpCode(HttpStatus.OK)
    register(@Body() dto: TransactionEntity){
        return this.database.addTransaction(dto);
    }
}
