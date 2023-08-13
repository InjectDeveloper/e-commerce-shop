import {BadRequestException, Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import { GroupService } from './group.service';
import {AdminGuard} from "../../common/guards/admin.guard";

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  async getAll() {
    return await this.groupService.getAll();
  }

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body('title') title: string) {
    if (!title) {
      throw new BadRequestException('Введите название группы')
    }
    return await this.groupService.create(title);
  }

  @Delete('/:title')
  @UseGuards(AdminGuard)
  async delete(@Param('title') title: string) {
    return await this.groupService.delete(title);
  }

  @Get('/:title')
  @UseGuards(AdminGuard)
  async getByTitle(@Param('title') title: string) {
    return await this.groupService.getByTitle(title);
  }
}
