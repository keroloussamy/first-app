import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { HashService } from './hash.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}

  //We use this method in the LocalStrategy to validate the user.
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && (await this.hashService.comparePassword(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // We're using the @nestjs/jwt library, which supplies a sign() function to generate our JWT from a subset of the user object properties.
  async login(user: any): Promise<object> {
    const payload = { email: user.email, userId: user.userId };
    return { access_token: this.jwtService.sign(payload) };
  }
}
