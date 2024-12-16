import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from 'src/context/application/user/user.service';
import { UserPrismaRepository } from 'src/context/infraestructure/user/user-prisma.repository';
import { PrismaService } from 'src/context/infraestructure/prisma/prisma.service';
import { LibModule } from 'src/lib/lib.module';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    UserService,
    { provide: 'UserRepository', useClass: UserPrismaRepository },
  ],
  exports: [UserService],
  imports: [LibModule],
})
export class UserModule {}
