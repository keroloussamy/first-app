import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HashService } from 'src/auth/hash.service';
import { UserSchema } from './schema/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UsersService, HashService],
  controllers: [UsersController],
  exports: [UsersService], //To be visible outside this module (we'll use it in our AuthService).
})
export class UsersModule {}
