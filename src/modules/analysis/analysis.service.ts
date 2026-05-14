import { Injectable } from '@nestjs/common';
import { TransactionDto } from '../transaction/transaction.dto';
import { MccRisk } from 'src/common/types/mcc-risk';
import { VectorizedData } from 'src/common/types/vector-response.dto';
import { ValuesLimits } from 'src/common/limits/values-limits';

@Injectable()
export class AnalysisService {

    async processTransaction() {

    }

    normalizeValue(value: number | null, max: number): number {
        if (value === null) {
            return -1
        }

        if (value > max) {
            value = max;
        }
        
        return value / max;
    }

    normalizeBoolean(value: boolean) {
        if (value) {
            return 1;
        } else {
            return 0;
        }
    }
    
    applyMccRisk(mcc: string){

        if (mcc in MccRisk) {

            return MccRisk[mcc as keyof typeof MccRisk];

        } else return 1;
    }

    isMerchantUnknown(mcc: string) {
        if (mcc in MccRisk) {
            return 0;
        } else {return 0;}
    }

    normalizeHour(value: Date) {
        return value.getHours() / 23
    }

    normalizeDay(value: Date) {
        return value.getDay() / 6
    }

    vectorizeData(dto: TransactionDto): number[] {
        const vector: number[] = [
            this.normalizeValue(dto.transactionInfo.amount, ValuesLimits.maxAmount),
            this.normalizeValue(dto.transactionInfo.installments, ValuesLimits.maxInstallments),
            this.normalizeValue((dto.transactionInfo.amount / dto.customer.averageAmount), ValuesLimits.amountVsAvgRatio),
            this.normalizeHour(dto.transactionInfo.requestedAt),
            this.normalizeValue(dto.lastTrasaction.timestamp.getMinutes(), ValuesLimits.maxMinutes),
            this.normalizeValue(dto.lastTrasaction.distance, ValuesLimits.maxKm),
            this.normalizeValue(dto.terminal.kmFromHome, ValuesLimits.maxKm),
            this.normalizeBoolean(dto.terminal.isOnline),
            this.normalizeBoolean(dto.terminal.cardPresent),
            this.isMerchantUnknown(dto.merchant.id),
            this.applyMccRisk(dto.merchant.id),
            this.normalizeValue(dto.merchant.averageAmount, ValuesLimits.maxMerchantAvgAmount)
        ]
        return vector;
    }
    
    vectorSearchManhattanDistance(firstItem: number[], secondItem: number[]): number{

        let finalSum: number = 0;
        for (let a = 0; a < firstItem.length; a++) {
            for (let b = 0; b < secondItem.length; b++) {
                if (a === b) {
                    finalSum = finalSum + Math.abs(firstItem[a] - secondItem[b])
                }
            }
        }
        return finalSum;
    }

    //vectorSearchAgainstDatabase(currentVector: number[], )
    
}
