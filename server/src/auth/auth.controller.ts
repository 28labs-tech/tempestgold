import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthTokenService } from './auth-token.service';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail() email: string;
  @IsString() password: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private authTokenService: AuthTokenService,
  ) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) {
      return { success: false, message: 'Invalid credentials' };
    }
    const token = await this.authTokenService.signToken({
      sub: String(user._id),
      email: user.email,
    });
    return { success: true, token, email: user.email };
  }
}
