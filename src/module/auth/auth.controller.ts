import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/context/application/auth/auth.service';
import { LoginDto } from 'src/context/application/auth/dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }
}
