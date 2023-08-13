import { IsString } from 'class-validator';
import { Contacts } from '@prisma/client';

type target = keyof Contacts;

export class UpdateContact {
  target: string;

  @IsString()
  newValue: string;
}
