import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UsersService } from 'src/users/users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.findOneByEmailWithPassword(
      createUserDto.email,
    );
    if (user) {
      throw new BadRequestException('User already exists.');
    }
    try {
      const id = await this.usersService.create(createUserDto);
      return {
        id,
      };
    } catch (err) {
      throw new UnprocessableEntityException('Cannot create the user.');
    }
  }
}
