import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

// Note Strategy from 'passport-local'.
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

/*
This script is an implementation of a Local Strategy for Passport, which is a Node.js middleware used for authentication. 
Overall, this script implements a local authentication strategy that verifies a user's credentials and returns a user object for further use in the application.
*/
