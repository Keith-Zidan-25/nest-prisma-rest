import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import * as fs from 'fs';
import path from 'path';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logDir = path.join(process.cwd(), 'logs');

  private logToFile(entry: string) {
    try {
      if (!fs.existsSync(this.logDir)) {
        fs.mkdirSync(this.logDir, { recursive: true });
      }

      const timestamp = new Intl.DateTimeFormat('en-IN', {
        dateStyle: 'short',
        timeStyle: 'medium',
        timeZone: 'Asia/Kolkata',
      }).format(new Date());

      fs.appendFileSync(
        path.join(this.logDir, 'combined.log'),
        `${timestamp}\t${entry}\n`,
      );
    } catch (e) {
      console.error('File logger error:', e);
    }
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.logToFile(req.url);
    next();
  }
}
