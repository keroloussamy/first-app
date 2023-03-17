import { Controller, Post, Request, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard) //instead of AuthGuard('local') directly, to not use magic strings in the codebase, create your own class.
  @Post('auth/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard) //instead of AuthGuard('jwt') directly, to not use magic strings in the codebase, create your own class.
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
  // When our GET /profile route is hit, the Guard will automatically invoke our passport-jwt custom configured logic, validating the JWT, and assigning the user property to the Request object.
}
