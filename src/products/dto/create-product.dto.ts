import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Product name',
    description: 'The name of the Product',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Product Description',
    description: 'The description of the Product',
  })
  @IsString()
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
