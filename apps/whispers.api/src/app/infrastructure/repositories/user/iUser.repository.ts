import { Prisma, User } from '@prisma/client';

export const USER_REPOSITORY = Symbol('IUserRepository');

export interface IUserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
