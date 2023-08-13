import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../provider/database/prisma/provider.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return await this.prismaService.product.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async getById(productId: number) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  async create(createProductDto: CreateProductDto) {
    const product = await this.prismaService.product.findFirst({
      where: {
        title: createProductDto.title,
      },
    });

    if (product) {
      throw new BadRequestException('Продукт с таким названием уже существует');
    }

    const group = await this.prismaService.group.findUnique({
      where: {
        title: createProductDto.groupTitle
      }
    })
    if (!group) throw new BadRequestException('Группы с таким названием не существует')

    return await this.prismaService.product.create({
      data: createProductDto,
    });
  }

  async delete(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!product) {
      throw new BadRequestException('Продукта с таким ID не существует');
    }

    await this.prismaService.product.delete({
      where: {
        id: product.id,
      },
    });
    return { message: `Товар с ID "${product.id}" удалён` };
  }

  async update(updateDto: UpdateProductDto) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id: updateDto.id,
      },
    });

    if (!product) {
      throw new BadRequestException('Продукта с таким ID не существует');
    }

    return await this.prismaService.product.update({
      where: {
        id: product.id,
      },
      data: updateDto,
    });
  }
}
