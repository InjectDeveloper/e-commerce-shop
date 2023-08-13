import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../provider/database/prisma/provider.service';

@Injectable()
export class GroupService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return await this.prismaService.group.findMany({});
  }

  async create(title: string) {
    const group = await this.prismaService.group.findUnique({
      where: {
        title: title,
      },
    });
    if (group)
      throw new BadRequestException('Группа с таким названием уже существует');
    return await this.prismaService.group.create({
      data: {
        title: title,
      },
    });
  }

  async delete(title: string) {
    const group = await this.prismaService.group.findUnique({
      where: {
        title: title,
      },
    });
    if (!group)
      throw new BadRequestException('Группы с таким названием не существует');
    return await this.prismaService.group.delete({
      where: {
        title: title,
      },
    });
  }

  async getByTitle(title: string) {
    return await this.prismaService.group.findUnique({
      where: {
        title: title,
      },
      include: {
        products: true,
      },
    });
  }
}
