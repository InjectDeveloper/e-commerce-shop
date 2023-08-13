import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import configuration from './configuration';
import { ILavaConfigService } from './config.interface';
import { LavaConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        LAVA_API_KEY: Joi.string().required(),
        LAVA_SHOP_ID: Joi.string().required(),
      }),
    }),
  ],
  providers: [
    {
      provide: ILavaConfigService,
      useClass: LavaConfigService,
    },
  ],
  exports: [
    {
      provide: ILavaConfigService,
      useClass: LavaConfigService,
    },
  ],
})
export class LavaConfigModule {}
