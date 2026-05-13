import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { AnalysisModule } from './modules/analysis/analysis.module';

@Module({
  imports: [DatabaseModule, AnalysisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
