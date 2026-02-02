import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCredentials } from './dto/userCredentials.dyo.js';
import { DatabaseService } from '../database/database.service.js';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly databaseService: DatabaseService,
  ) {}

  async validateUser({ email, password }: UserCredentials) {
    const user = await this.databaseService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    if (user.password === password) {
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      return this.jwtService.sign(payload);
    } else {
      console.log('User credentials dont match');
      throw new UnauthorizedException();
    }
  }
}
