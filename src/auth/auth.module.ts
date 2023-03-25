import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { HashService } from './hash.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' }, // After 7d => 401 Unauthorized
    }), // Passing in a configuration object, using register method.
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, HashService], //Need to put LocalStrategy & JwtStrategy, so the PassportJS authentication framework know how to handle authentication requests for those strategies.
  controllers: [AuthController],
  exports: [HashService],
})
export class AuthModule {}

// Difference between imports, providers, and exports?
// https://stackoverflow.com/questions/43164554/what-is-the-difference-between-imports-providers-and-exports-in-nestjs
