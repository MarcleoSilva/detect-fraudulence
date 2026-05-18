import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { parser } from 'stream-json';
import { streamArray } from 'stream-json/streamers/StreamArray';
import { VectorizedData } from 'src/common/types/vector-response.dto';

@Injectable()
export class DatabaseService {

    async getReferences(limit: number = 1): Promise<VectorizedData[]> {
        return new Promise((resolve, reject) => {
            const results: VectorizedData[] = [];
            
            // 1. Create the source read stream
            const fileStream = fs.createReadStream('data/references.json');
            
            // 2. Build the pipeline (using 'as any' to bypass TS stream-json strictness)
            const pipeline = fileStream
                .pipe(parser() as any)
                .pipe(streamArray() as any);

            pipeline.on('data', (chunk: any) => {
                results.push(chunk.value);

                if (results.length >= limit) {
                    // 3. FIX: Destroy the source file stream directly
                    fileStream.destroy(); 
                    resolve(results);
                }
            });

            pipeline.on('end', () => {
                resolve(results);
            });

            pipeline.on('error', (err: any) => {
                reject(err);
            });
            
            // Handle file stream errors just in case the file is missing
            fileStream.on('error', (err: any) => {
                reject(err);
            });
        });
    }
}