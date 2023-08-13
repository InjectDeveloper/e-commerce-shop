import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import * as process from 'process';
import { Response } from 'express';

@Controller('admin')
export class AdminController {
  @Post('login')
  async loginAdmin(
    @Res({ passthrough: true }) res: Response,
    @Body('password') password: string,
  ) {
    if (!password || password != process.env.APP_ADMIN_PASSWORD) {
      throw new ForbiddenException();
    }
    res.cookie('password', password, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
    });
    return { message: 'success' };
  }
}
