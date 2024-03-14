import { ReturnUserDTO } from 'src/users/dto/returnUser.dto';
import { Product } from '../entities/product.entity';

export class ReturnProductDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  owner: ReturnUserDTO;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;
    this.owner = product.user ? new ReturnUserDTO(product.user) : undefined;
  }
}
