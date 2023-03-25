import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashService } from 'src/auth/hash.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schema/user.schema';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly hashService: HashService,
  ) {}

  async findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findUserByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException('User with this email is already exist!');
    }
    const createdUser = new this.userModel(createUserDto);
    // Hash Password
    createdUser.password = await this.hashService.hashPassword(
      createdUser.password,
    );
    return createdUser.save();
  }

  async getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
