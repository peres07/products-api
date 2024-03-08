import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const result = await this.usersRepository.insert(
      this.usersRepository.create(createUserDto),
    );
    return result.identifiers[0].id;
  }

  async update(updateUserDto: UpdateUserDto, user: User) {
    if (updateUserDto.password) {
      user.password = updateUserDto.password;
    }
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }
    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }
    return await this.usersRepository.save(user);
  }

  async findOneById(id: string) {
    return await this.usersRepository.findOneBy({
      id,
    });
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOneBy({
      email,
    });
  }
}
