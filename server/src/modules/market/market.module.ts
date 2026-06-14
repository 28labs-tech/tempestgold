import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketDatum, MarketDatumSchema } from '../../schemas/market-datum.schema';
import { TickerData, TickerDataSchema } from '../../schemas/ticker-data.schema';
import { CompanyStat, CompanyStatSchema } from '../../schemas/company-stat.schema';
import { BotswanaLocation, BotswanaLocationSchema } from '../../schemas/botswana-location.schema';
import { FilterOption, FilterOptionSchema } from '../../schemas/filter-option.schema';
import { MarketController } from './market.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MarketDatum.name, schema: MarketDatumSchema },
      { name: TickerData.name, schema: TickerDataSchema },
      { name: CompanyStat.name, schema: CompanyStatSchema },
      { name: BotswanaLocation.name, schema: BotswanaLocationSchema },
      { name: FilterOption.name, schema: FilterOptionSchema },
    ]),
  ],
  controllers: [MarketController],
})
export class MarketModule {}
