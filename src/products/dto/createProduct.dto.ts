import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Product name',
    description: 'The name of the Product',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    example: 'Product Description',
    description: 'The description of the Product',
  })
  @IsString()
  @MinLength(10)
  @MaxLength(255)
  description: string;

  @ApiProperty({
    example: 100.0,
    description: 'The price of the Product',
  })
  @IsNumber({
    maxDecimalPlaces: 2,
    allowInfinity: false,
  })
  price: number;
}
