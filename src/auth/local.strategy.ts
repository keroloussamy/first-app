import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

// Note Strategy parameter from 'passport-local'.
// 2-Local strategy to check and validate the user email and password. To validate requests with credentials Like Login, we can't use JWT so we use this local strategy.
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException({
        message:
          'Invalid credentials, You have entered a wrong email or password',
      });
    }
    return user;
  }
}

/*
This script is an implementation of a Local Strategy for Passport, which is a Node.js middleware used for authentication. 
Overall, this script implements a local authentication strategy that verifies a user's credentials and returns a user object for further use in the application.
*/
