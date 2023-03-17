import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService], //To be visible outside this module (we'll soon use it in our AuthService).
})
export class UsersModule {}
