import { IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
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

  @IsString()
  groupTitle: string;
}
