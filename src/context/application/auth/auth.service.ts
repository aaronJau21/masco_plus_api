import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AuthRepository } from 'src/context/domain/auth/auth.repository';
import { LoginDto } from './dtos/login.dto';
import { HashService } from 'src/lib/hash/hash.service';
import { JsonWebTokenService } from 'src/lib/json-web-token/json-web-token.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @Inject('AuthRepository') private readonly authRepository: AuthRepository,
    private readonly hashService: HashService,
    private readonly jsonWebTokenService: JsonWebTokenService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.authRepository.login(data);

    const compare = await this.hashService.comparePassword(
      data.password,
      user.password,
    );

    if (!compare) {
      this.logger.error('Invalid credentials');
      throw new NotFoundException('Invalid credentials');
    }

    const token = await this.jsonWebTokenService.sign(
      user.name,
      user.email,
      user.role,
    );

    return {
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
