import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MarketDatum } from '../../schemas/market-datum.schema';
import { TickerData } from '../../schemas/ticker-data.schema';
import { CompanyStat } from '../../schemas/company-stat.schema';
import { BotswanaLocation } from '../../schemas/botswana-location.schema';
import { FilterOption } from '../../schemas/filter-option.schema';
import { JwtAuth } from '../../auth/jwt-auth.decorator';

@Controller('market')
export class MarketController {
  constructor(
    @InjectModel(MarketDatum.name) private marketDataModel: Model<MarketDatum>,
    @InjectModel(TickerData.name) private tickerModel: Model<TickerData>,
    @InjectModel(CompanyStat.name) private statsModel: Model<CompanyStat>,
    @InjectModel(BotswanaLocation.name) private locationModel: Model<BotswanaLocation>,
    @InjectModel(FilterOption.name) private filterModel: Model<FilterOption>,
  ) {}

  // Market Data
  @Get('data')
  async getMarketData() {
    return this.marketDataModel.find().exec();
  }

  @Post('data')
  @JwtAuth()
  async createMarketData(@Body() dto: Partial<MarketDatum>) {
    return this.marketDataModel.create(dto);
  }

  @Put('data/:id')
  @JwtAuth()
  async updateMarketData(@Param('id') id: string, @Body() dto: Partial<MarketDatum>) {
    return this.marketDataModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  @Delete('data/:id')
  @JwtAuth()
  async removeMarketData(@Param('id') id: string) {
    return this.marketDataModel.findByIdAndDelete(id).exec();
  }

  // Ticker
  @Get('ticker')
  async getTicker() {
    return this.tickerModel.find().exec();
  }

  @Post('ticker')
  @JwtAuth()
  async createTicker(@Body() dto: Partial<TickerData>) {
    return this.tickerModel.create(dto);
  }

  @Put('ticker/:id')
  @JwtAuth()
  async updateTicker(@Param('id') id: string, @Body() dto: Partial<TickerData>) {
    return this.tickerModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  @Delete('ticker/:id')
  @JwtAuth()
  async removeTicker(@Param('id') id: string) {
    return this.tickerModel.findByIdAndDelete(id).exec();
  }

  // Company Stats
  @Get('stats')
  async getStats() {
    return this.statsModel.find().exec();
  }

  @Post('stats')
  @JwtAuth()
  async createStat(@Body() dto: Partial<CompanyStat>) {
    return this.statsModel.create(dto);
  }

  @Put('stats/:id')
  @JwtAuth()
  async updateStat(@Param('id') id: string, @Body() dto: Partial<CompanyStat>) {
    return this.statsModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  @Delete('stats/:id')
  @JwtAuth()
  async removeStat(@Param('id') id: string) {
    return this.statsModel.findByIdAndDelete(id).exec();
  }

  // Locations
  @Get('locations')
  async getLocations() {
    return this.locationModel.find().exec();
  }

  @Post('locations')
  @JwtAuth()
  async createLocation(@Body() dto: Partial<BotswanaLocation>) {
    return this.locationModel.create(dto);
  }

  @Put('locations/:id')
  @JwtAuth()
  async updateLocation(@Param('id') id: string, @Body() dto: Partial<BotswanaLocation>) {
    return this.locationModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  @Delete('locations/:id')
  @JwtAuth()
  async removeLocation(@Param('id') id: string) {
    return this.locationModel.findByIdAndDelete(id).exec();
  }

  // Filters
  @Get('filters')
  async getFilters(@Param('category') category: string) {
    const query = category ? { category } : {};
    return this.filterModel.find(query).sort({ order: 1 }).exec();
  }

  @Post('filters')
  @JwtAuth()
  async createFilter(@Body() dto: Partial<FilterOption>) {
    return this.filterModel.create(dto);
  }

  @Put('filters/:id')
  @JwtAuth()
  async updateFilter(@Param('id') id: string, @Body() dto: Partial<FilterOption>) {
    return this.filterModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  @Delete('filters/:id')
  @JwtAuth()
  async removeFilter(@Param('id') id: string) {
    return this.filterModel.findByIdAndDelete(id).exec();
  }
}
