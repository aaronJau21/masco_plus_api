import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/context/application/user/dtos/create-user.dto';
import { UserService } from 'src/context/application/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async registerUser(@Body() dto: CreateUserDto) {
    return await this.userService.registerUser(dto);
  }
}
