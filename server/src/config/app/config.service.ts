import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAppConfigService } from './config.interface';

@Injectable()
export class AppConfigService implements IAppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get port(): string {
    return String(this.configService.get<string>(`app.port`));
  }

  get adminPassword(): string {
    return String(this.configService.get<string>(`app.adminPassword`));
  }
}
