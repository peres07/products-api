import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'jonhdoe@gmail.com',
    description: 'The email of the User',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '@Jonhpassword2',
    description: 'The password of the User',
  })
  password: string;
}
