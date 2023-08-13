import { PrismaProviderModule } from './provider/database/prisma/provider.module';
import { ContactModule } from './models/contact/contact.module';
import { Module } from '@nestjs/common';
import { ProductModule } from './models/product/product.module';
import { AdminModule } from './models/admin/admin.module';
import { LicenseModule } from './models/license/license.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import {GroupModule} from "./models/group/group.module";

@Module({
  imports: [
    PrismaProviderModule,
    ContactModule,
    ProductModule,
    AdminModule,
    LicenseModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', '..', 'client/dist'),
    }),
    GroupModule
  ],
})
export class AppModule {}
