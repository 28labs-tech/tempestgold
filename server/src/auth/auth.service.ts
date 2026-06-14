import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { AdminUser } from '../schemas/admin-user.schema';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectModel(AdminUser.name) private adminUserModel: Model<AdminUser>,
    @Inject('ENV_CONFIG') private config: { adminEmail: string; adminPassword: string },
  ) {}

  async onModuleInit() {
    await this.seedAdmin();
  }

  private async seedAdmin() {
    const { adminEmail, adminPassword } = this.config;
    const existing = await this.adminUserModel.findOne({ email: adminEmail });

    if (existing) {
      const isMatch = await bcrypt.compare(adminPassword, existing.passwordHash);
      if (!isMatch) {
        existing.passwordHash = await bcrypt.hash(adminPassword, 12);
        await existing.save();
        console.log('Admin password updated from environment');
      }
      return;
    }

    const hash = await bcrypt.hash(adminPassword, 12);
    await this.adminUserModel.create({ email: adminEmail, passwordHash: hash });
    console.log('Admin user seeded from environment');
  }

  async validateUser(email: string, password: string): Promise<AdminUser | null> {
    const user = await this.adminUserModel.findOne({ email, isActive: true });
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    return isMatch ? user : null;
  }
}
