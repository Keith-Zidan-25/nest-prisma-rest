/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { Prisma } from '../generated/client.js';
import type { Status } from '../generated/client.js';
import { LoggerService } from '../logger/logger.service.js';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private logger: LoggerService,
  ) {}

  @Post()
  create(@Body() createTaskDto: Prisma.TaskCreateInput) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(@Query('status') status?: Status) {
    return this.tasksService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Get(':userId')
  findTasksForUser(@Param('userId') userId: string) {
    return this.tasksService.findUserTasks(+userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: Prisma.TaskUpdateInput,
  ) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
