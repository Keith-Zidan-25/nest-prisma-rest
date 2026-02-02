import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtStrategy } from '../strategies/jwt.strategy.js';
import { DatabaseService } from '../database/database.service.js';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '../strategies/local.strategy.js';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: '1d43806d2c2189d413f58a5c7aec43c5cb5fadc0',
      signOptions: { expiresIn: '1hr' },
    }),
  ],
  providers: [AuthService, JwtStrategy, DatabaseService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
