import { Module } from '@nestjs/common';
import { HashService } from './hash/hash.service';
import { JsonWebTokenService } from './json-web-token/json-web-token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [HashService, JsonWebTokenService],
  exports: [HashService, JsonWebTokenService],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class LibModule {}
