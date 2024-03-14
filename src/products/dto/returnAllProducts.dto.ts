import { Product } from '../entities/product.entity';

export class ReturnAllProductsDTO {
  id: string;
  name: string;
  description: string;
  price: number;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
  }
}
