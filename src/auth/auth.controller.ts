import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guards/jwt/jwt.guard.js';
import express from 'express';
import { LocalGuard } from '../guards/local/local.guard.js';

@Controller('auth')
export class AuthController {
  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: express.Request) {
    return req.user;
  }

  @Get('status')
  @UseGuards(JwtGuard)
  status(@Req() req: express.Request) {
    console.log('Inside AuthController status method');
    console.log(req.user);
    return req.user;
  }
}
