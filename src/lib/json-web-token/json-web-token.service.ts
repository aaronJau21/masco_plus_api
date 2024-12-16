import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JsonWebTokenService {
  constructor(private jwtService: JwtService) {}

  async sign(name: string, email: string, role: string): Promise<string> {
    const payload = { name, email, role };
    return await this.jwtService.signAsync(payload);
  }
}
