import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  productId: number;

  @IsString()
  phone: string;
}
