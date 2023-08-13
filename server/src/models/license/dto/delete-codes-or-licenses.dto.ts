import { IsArray, IsString } from 'class-validator';

export class DeleteCodesOrLicensesDto {
  @IsArray()
  @IsString({ each: true })
  values: string[];
}
