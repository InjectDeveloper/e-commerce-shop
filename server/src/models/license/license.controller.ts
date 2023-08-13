import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { LicenseService } from './license.service';
import { AdminGuard } from '../../common/guards/admin.guard';
import type { Response } from 'express';
import { createReadStream } from 'fs';
import * as path from 'path';
import { CreateCodesDto } from './dto/create-code.dto';
import { CreateLicensesDto } from './dto/create-licenses.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateWithRelationDto } from './dto/create-with-relation.dto';
import { DeleteCodesOrLicensesDto } from './dto/delete-codes-or-licenses.dto';
import { yellow } from '@nestjs/common/utils/cli-colors.util';
import {CreateSoloLicensesDto} from "./dto/create-solo-license.dto";

@Controller('license')
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) {}

  @Get('/byCode/:code')
  async getByCode(@Param('code') code: string) {
    return this.licenseService.getByCode(code);
  }

  @Post('/code')
  @UseGuards(AdminGuard)
  async createCodes(@Body() createCodesDto: CreateCodesDto) {
    return this.licenseService.createCodes(createCodesDto);
  }

  @Post('/byGroup')
  @UseGuards(AdminGuard)
  async createLicensesByGroup(@Body() createLicensesDto: CreateLicensesDto) {
    return this.licenseService.createLicensesByGroup(createLicensesDto);
  }

  @Post('/solo')
  @UseGuards(AdminGuard)
  async createLicenses(@Body() createLicensesDto: CreateSoloLicensesDto) {
    return this.licenseService.createLicenses(createLicensesDto);
  }

  @Get('/activate/:code')
  async activateCode(@Param('code') code: string) {
    return this.licenseService.activateLicense(code);
  }

  @Post('/buy')
  async buy(@Body() createOrderDto: CreateOrderDto) {
    return this.licenseService.createOrder(createOrderDto);
  }

  @Get('/history/activations')
  async getActivations(@Res({ passthrough: true }) res: Response) {
    await this.licenseService.activations();
    const file = createReadStream(
      path.join(__dirname, '..', '..', '..', '..', 'public/activations.csv'),
    );
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="activations.csv"',
    });
    return new StreamableFile(file);
  }

  @Get('/history/orders')
  async getOrders(@Res({ passthrough: true }) res: Response) {
    await this.licenseService.orders();
    const file = createReadStream(
      path.join(__dirname, '..', '..', '..', '..', 'public/orders.csv'),
    );
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="orders.csv"',
    });
    return new StreamableFile(file);
  }

  @Get('/download')
  async download(@Res({ passthrough: true }) res: Response) {
    await this.licenseService.download();
    const file = createReadStream(
      path.join(__dirname, '..', '..', '..', '..', 'public/licenses.txt'),
    );
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="licenses.txt"',
    });
    return new StreamableFile(file);
  }

  @Get('/download/code')
  async downloadCode(@Res({ passthrough: true }) res: Response) {
    await this.licenseService.code();
    const file = createReadStream(
        path.join(__dirname, '..', '..', '..', '..', 'public/code.csv')
    );
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="code.csv"',
    });
    return new StreamableFile(file);
  }

  @Post('/webhook')
  async webhook(@Body() payOkWebhook: any) {
    try {
      await this.licenseService.webhook(Number(payOkWebhook.order_id));
      return true;
    } catch (e) {
      console.log(e)
      return
    }
  }

  @Delete('/deleteCodes')
  @UseGuards(AdminGuard)
  async deleteCodes(@Body() deleteDto: DeleteCodesOrLicensesDto) {
    return this.licenseService.deleteCodes(deleteDto);
  }

  @Delete('/deleteLicenses')
  @UseGuards(AdminGuard)
  async deleteLicenses(@Body() deleteDto: DeleteCodesOrLicensesDto) {
    return this.licenseService.deleteLicenes(deleteDto);
  }

  @Post('/createWithRelation')
  @UseGuards(AdminGuard)
  async createWithRelation(@Body() createDto: CreateWithRelationDto) {
    return this.licenseService.createWithRelations(createDto);
  }
}
