import { Global, Module } from '@nestjs/common';
import { PrismaService } from './provider.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaProviderModule {}
