/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import type { Status, Task } from '../generated/client.js';
import { Prisma } from '../generated/client.js';
import { PrismaPromise } from '@prisma/client/runtime/client';

@Injectable()
export class TasksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTaskDto: Prisma.TaskCreateInput) {
    return this.databaseService.task.create({
      data: createTaskDto,
    });
  }

  async findAll(status: Status | undefined) {
    let tasks: PrismaPromise<Task[]>;

    if (status) {
      tasks = this.databaseService.task.findMany({
        where: {
          status,
        },
      });
    } else {
      tasks = this.databaseService.task.findMany();
    }

    if (!(await tasks).values) {
      throw new NotFoundException();
    }

    return tasks;
  }

  async findOne(id: number) {
    const task = this.databaseService.task.findUnique({
      where: {
        id,
      },
    });

    if (!(await task)) {
      throw new NotFoundException();
    }

    return task;
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
