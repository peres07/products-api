import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdatePasswordDTO } from './dto/updatePassword.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('/changePassword')
  async update(
    @Req() request: Request,
    @Body() updatePasswordDTO: UpdatePasswordDTO,
  ) {
    const user = await this.usersService.findOneById(request['user'].sub, true);

    if (!(await user.comparePassword(updatePasswordDTO.password)))
      throw new UnauthorizedException('Wrong password.');

    user.password = updatePasswordDTO.newPassword;
    user.hashPassword();

    await this.usersService.update(user);
    return {
      message: 'Password updated successfully.',
    };
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOneById(id);
    if (!user) throw new NotFoundException('User not found.');
    return user;
  }
}
