import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './context/infraestructure/prisma/prisma.module';
import { UserModule } from './module/user/user.module';
import { LibModule } from './lib/lib.module';
import { AuthModule } from './module/auth/auth.module';
import { BrandModule } from './module/brand/brand.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    LibModule,
    ConfigModule.forRoot(),
    AuthModule,
    BrandModule,
  ],
})
export class AppModule {}
