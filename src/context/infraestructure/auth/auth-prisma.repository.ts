import { AuthRepository } from 'src/context/domain/auth/auth.repository';
import { PrismaService } from '../prisma/prisma.service';
import { Auth } from 'src/context/domain/auth/auth.entity';
import { User } from 'src/context/domain/user/user.entity';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';

@Injectable()
export class AuthPrismaRepository implements AuthRepository {
  private readonly logger = new Logger(AuthPrismaRepository.name);
  constructor(private readonly prisma: PrismaService) {}
  async login(auth: Auth): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: auth.email,
      },
    });

    if (!user) {
      this.logger.error('Invalid credentials');
      throw new NotFoundException('Invalid credentials');
    }

    return user;
  }
}
