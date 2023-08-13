import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCodesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CodeDto)
  codes: CodeDto[];
}

class CodeDto {
  @IsString()
  productTitle: string;

  @IsString()
  value: string;
}
