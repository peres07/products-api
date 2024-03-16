import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';
import { Match } from 'src/common/validations/decorators/match.decorator';

export class UpdatePasswordDTO {
  @ApiProperty({
    description: 'Current user password',
    example: 'password',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'New user password',
    example: 'newPassword',
  })
  @IsStrongPassword()
  newPassword: string;

  @ApiProperty({
    description: 'New user password confirmation',
    example: 'newPassword',
  })
  @Match('newPassword', {
    message: 'New password confirmation must match password',
  })
  confirmNewPassword: string;
}
