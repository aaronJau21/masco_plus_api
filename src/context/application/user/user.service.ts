import { Inject, Injectable } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';

import { UserRepository } from 'src/context/domain/user/user.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from 'src/context/domain/user/user.entity';
import { HashService } from 'src/lib/hash/hash.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
  ) {}

  async registerUser(data: CreateUserDto) {
    const { name, email, password } = data;
    const hashedPassword = await this.hashService.hashPassword(password);
    const user = new User(uuidv4(), name, email, hashedPassword, 'EMPLOYE');

    await this.userRepository.save(user);
    const { password: omit, ...rest } = user;
    return rest;
  }
}
