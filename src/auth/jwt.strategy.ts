import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

// Note Strategy parameter from 'passport-jwt'.
// 1-JWT strategy to create JWT using a secret constant. To validate requests with JWT technique.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //it specifies how to extract the JWT from the request object.
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // This function is called by the Passport middleware after a token has been verified, so that the application can retrieve information about the authenticated user.
  async validate(payload: any) {
    return { userId: payload.userId, email: payload.email };
  }
}

/*
-This code defines an implementation of Passport's JWT authentication strategy.
-The authentication strategy is used to verify user authentication tokens, which are sent with authorization headers in HTTP requests.

-The JwtStrategy class is decorated with @Injectable() to mark it as a class that can be injected with dependencies. 
*/
