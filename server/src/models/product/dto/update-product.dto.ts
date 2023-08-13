import { IsNumber, IsString, IsUrl } from 'class-validator';

export class UpdateProductDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  shortDescription: string;

  @IsString()
  fullDescription: string;

  @IsUrl()
  image: string;

  @IsString()
  instruction: string;

  @IsNumber()
  price: number;
}
