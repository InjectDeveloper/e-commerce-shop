import { Module } from '@nestjs/common';
import { LicenseController } from './license.controller';
import { LicenseService } from './license.service';
import { LavaConfigModule } from '../../config/lava/config.module';

@Module({
  imports: [LavaConfigModule],
  controllers: [LicenseController],
  providers: [LicenseService],
})
export class LicenseModule {}
