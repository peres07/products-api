import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto, user: User) {
    return this.productsRepository.insert(
      this.productsRepository.create({
        ...createProductDto,
        user,
      }),
    );
  }

  async findAll() {
    return this.productsRepository.find();
  }

  findOne(id: string) {
    return this.productsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(updateProductDto: UpdateProductDto, product: Product) {
    if (updateProductDto.description) {
      product.description = updateProductDto.description;
    }
    if (updateProductDto.name) {
      product.name = updateProductDto.name;
    }
    if (updateProductDto.price) {
      product.price = updateProductDto.price;
    }
    return this.productsRepository.save(product);
  }

  async remove(id: string) {
    return this.productsRepository.delete(id);
  }
}
