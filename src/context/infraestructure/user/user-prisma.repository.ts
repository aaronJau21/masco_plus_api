import { User } from 'src/context/domain/user/user.entity';
import { UserRepository } from 'src/context/domain/user/user.repository';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async save(user: User): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: user,
    });

    return newUser;
  }
}
