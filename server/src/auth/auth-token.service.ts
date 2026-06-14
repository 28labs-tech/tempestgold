import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthTokenService {
  constructor(
    private jwtService: JwtService,
    @Inject('ENV_CONFIG') private config: { jwtSecret: string },
  ) {}

  async signToken(payload: { sub: string; email: string }): Promise<string> {
    return this.jwtService.signAsync(payload, { expiresIn: '24h' });
  }

  async verifyToken(token: string): Promise<{ sub: string; email: string }> {
    return this.jwtService.verifyAsync(token);
  }
}
