import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../base";
import { IUserRepository } from "./iUser.repository";
import { User, Prisma } from "@prisma/client";

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly repository: BaseRepository) { }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await this.repository.user.create({ data });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.user.findFirst({
      where:
      {
        email: {
          equals: email,
          mode: 'insensitive'
        }
      }
    });
  }
}
