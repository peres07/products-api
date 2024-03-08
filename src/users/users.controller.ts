import {
  Controller,
  // Body,
  // Patch,
  // Param,
  // NotFoundException,
  // BadRequestException,
  // UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
// import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
// import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseGuards(AuthGuard)
  // @Patch('/update/:id')
  // async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   const user = await this.usersService.findOneById(id);
  //   if (!user) {
  //     throw new NotFoundException('User not found.');
  //   }
  //   try {
  //     await this.usersService.update(updateUserDto, user);
  //     return {
  //       message: 'User updated successfully.',
  //       data: updateUserDto,
  //     };
  //   } catch (err) {
  //     throw new BadRequestException('Cannot update the especify user.');
  //   }
  // }
}
