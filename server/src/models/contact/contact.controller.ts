import { AdminGuard } from './../../common/guards/admin.guard';
import { ContactService } from './contact.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  async getAll() {
    return await this.contactService.getAll();
  }

  @Patch('/:target')
  @UseGuards(AdminGuard)
  async updateContect(
    @Param('target') target: string,
    @Body('newValue') newValue: string,
  ) {
    return await this.contactService.updateContact({
      target: target,
      newValue: newValue,
    });
  }
}
