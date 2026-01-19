import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { DatabaseService } from '../database/database.service.js';

@Module({
  controllers: [UsersController],
  providers: [UsersService, DatabaseService],
})
export class UsersModule {}
