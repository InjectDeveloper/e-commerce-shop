import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLicensesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLicenseDto)
  licenses: CreateLicenseDto[];
}

class CreateLicenseDto {
  @IsString()
  groupTitle: string;

  @IsString()
  value: string;
}
