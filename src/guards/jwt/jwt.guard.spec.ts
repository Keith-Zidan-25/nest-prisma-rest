import { JwtGuard } from './jwt/jwt.guard.js';

describe('JwtGuard', () => {
  it('should be defined', () => {
    expect(new JwtGuard()).toBeDefined();
  });
});
