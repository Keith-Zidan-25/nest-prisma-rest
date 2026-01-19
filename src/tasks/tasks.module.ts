import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { TasksController } from './tasks.controller.js';
import { DatabaseService } from '../database/database.service.js';

@Module({
  controllers: [TasksController],
  providers: [TasksService, DatabaseService],
})
export class TasksModule {}
