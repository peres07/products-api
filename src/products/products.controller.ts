import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from 'src/users/users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Req() request: Request,
    @Body() createProductDto: CreateProductDto,
  ) {
    const userId = request['user'].sub;
    const user = await this.usersService.findOneById(userId);
    return (await this.productsService.create(createProductDto, user))
      .identifiers[0];
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(id);
    if (!product) throw new NotFoundException('Cannot find this product.');
    return this.productsService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productsService.findOne(id);
    if (!product) throw new NotFoundException('Cannot find this product.');
    if (product.user.id !== request['user'].sub)
      throw new UnauthorizedException('You cannot edit this product');
    return this.productsService.update(updateProductDto, product);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request: Request) {
    const product = await this.productsService.findOne(id);
    if (!product) throw new NotFoundException('Cannot find this product.');
    if (product.user.id !== request['user'].sub)
      throw new UnauthorizedException('You cannot edit this product');
    return this.productsService.remove(id);
  }
}
