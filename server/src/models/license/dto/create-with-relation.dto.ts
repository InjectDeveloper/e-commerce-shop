import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWithRelationDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWithDto)
  values: CreateWithDto[];
}

class CreateWithDto {
  @IsString()
  code: string;

  @IsString()
  license: string;

  @IsString()
  product: string;
}
