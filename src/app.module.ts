import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module.js';
import { UsersModule } from './users/users.module.js';
import { DatabaseModule } from './database/database.module.js';
import { LoggerModule } from './logger/logger.module.js';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LoggerMiddleware } from './logger/logger.middleware.js';
import { AuthModule } from './auth/auth.module.js';

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
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
