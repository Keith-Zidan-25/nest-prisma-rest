import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { TasksController } from './tasks.controller.js';
import { DatabaseService } from '../database/database.service.js';
import { LoggerService } from '../logger/logger.service.js';

@Module({
  controllers: [TasksController],
  providers: [TasksService, DatabaseService, LoggerService],
})
export class TasksModule {}
