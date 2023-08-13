import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSoloLicensesDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSoloLicenseDto)
    licenses: CreateSoloLicenseDto[];
}

class CreateSoloLicenseDto {
    @IsString()
    productTitle: string;

    @IsString()
    value: string;
}
