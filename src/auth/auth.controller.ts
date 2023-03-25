import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard) //instead of AuthGuard('local') directly, to not use magic strings in the codebase, create your own class.
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
