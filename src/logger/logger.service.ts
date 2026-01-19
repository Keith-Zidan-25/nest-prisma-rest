/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerService extends ConsoleLogger {
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

  log(message: unknown, context?: unknown): void {
    const entry = `${context}\t${message}`;
    this.logToFile(entry);

    super.log(message, context);
  }

  error(message: unknown, stack?: unknown, context?: unknown): void {
    const stackOrContext = stack ? stack : context;
    const entry = `${stackOrContext}\t${message}`;
    this.logToFile(entry);

    super.error(message, stackOrContext);
  }
}
