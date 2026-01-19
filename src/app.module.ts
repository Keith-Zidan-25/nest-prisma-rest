import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service.js';
import { TasksModule } from './tasks/tasks.module.js';
import { UsersModule } from './users/users.module.js';
import { DatabaseModule } from './database/database.module.js';
import { LoggerModule } from './logger/logger.module.js';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TasksModule,
    UsersModule,
    DatabaseModule,
    ConfigModule.forRoot(),
    LoggerModule,
    ThrottlerModule.forRoot([
      {
        ttl: 1000,
        limit: 1,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
