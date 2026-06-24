import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminUser } from '../schemas/admin-user.schema';
import { Inject } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(AdminUser.name) private adminUserModel: Model<AdminUser>,
    @Inject('ENV_CONFIG') config: { jwtSecret: string },
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtSecret,
    });
  }

  async validate(payload: { sub: string; email: string }) {
    const user = await this.adminUserModel.findById(payload.sub);
    if (!user || !user.isActive) throw new UnauthorizedException();
    return { id: user._id, email: user.email };
  }
}
