import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ILavaConfigService } from './config.interface';

@Injectable()
export class LavaConfigService implements ILavaConfigService {
  constructor(private readonly configService: ConfigService) {}

  get apiSecretKey(): string {
    return String(this.configService.get<string>(`lava.apiSecretKey`));
  }

  get shopId(): string {
    return String(this.configService.get<string>('lava.shopId'));
  }
}
