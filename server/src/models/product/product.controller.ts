import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AdminGuard } from '../../common/guards/admin.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async get() {
    return await this.productService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.getById(id);
  }

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Put()
  @UseGuards(AdminGuard)
  async update(@Body() updateProductDto: UpdateProductDto) {
    return await this.productService.update(updateProductDto);
  }

  @Delete('/:productId')
  @UseGuards(AdminGuard)
  async delete(@Param('productId', ParseIntPipe) id: number) {
    return await this.productService.delete(id);
  }
}
