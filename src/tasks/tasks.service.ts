/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import type { Status } from '../generated/client.js';
import { Prisma } from '../generated/client.js';

@Injectable()
export class TasksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTaskDto: Prisma.TaskCreateInput) {
    return this.databaseService.task.create({
      data: createTaskDto,
    });
  }

  async findAll(status: Status | undefined) {
    if (status) {
      return this.databaseService.task.findMany({
        where: {
          status,
        },
      });
    }

    return this.databaseService.task.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.task.findUnique({
      where: {
        id,
      },
    });
  }

  async findUserTasks(userId: number) {
    return this.databaseService.task.findMany({
      where: {
        userId,
      },
    });
  }

  async update(id: number, updateTaskDto: Prisma.TaskUpdateInput) {
    return this.databaseService.task.update({
      where: {
        id,
      },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: updateTaskDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.task.delete({
      where: {
        id,
      },
    });
  }
}
