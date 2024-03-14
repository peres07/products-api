import { User } from '../entities/user.entity';

export class ReturnUserDTO {
  userId: string;
  email: string;
  name: string;

  constructor(user: User) {
    this.userId = user.id;
    this.email = user.email;
    this.name = user.name;
  }
}
