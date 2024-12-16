import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/context/infraestructure/prisma/prisma.service';
import { AuthService } from 'src/context/application/auth/auth.service';
import { AuthPrismaRepository } from 'src/context/infraestructure/auth/auth-prisma.repository';
import { LibModule } from 'src/lib/lib.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthService,
    { provide: 'AuthRepository', useClass: AuthPrismaRepository },
  ],
  exports: [AuthService],
  imports: [LibModule, UserModule],
})
export class AuthModule {}
