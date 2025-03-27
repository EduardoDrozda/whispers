import { HttpStatus, Inject, Injectable } from "@nestjs/common";

import { type IUserRepository, USER_REPOSITORY } from "../../../../infrastructure/repositories";
import { User } from "@prisma/client";
import { NotificationService } from "../../../../infrastructure/notification";
import { LoggerService } from "../../../../infrastructure/logger";
import { HashService } from "../../../../infrastructure/hash";
import { CreateUserDTO, GetUserDTO } from "../dtos";

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    private readonly notificationService: NotificationService,
    private readonly logger: LoggerService,
    private readonly hashService: HashService
  ) { }

  async execute(data: CreateUserDTO): Promise<GetUserDTO | void> {
    const { email, name, password } = data;

    const user = await this.findUserByEmail(email);

    if (user) {
      const message = `User already exists with email ${email}`;
      this.logger.error(message);
      this.notificationService.add(message, HttpStatus.CONFLICT);
      return;
    }

    const { id, createdAt, updatedAt } = await this.userRepository.create({
      name,
      email,
      password: await this.hashService.hash(password)
    });

    this.logger.info(`User created with email ${email}`);

    return {
      id,
      name,
      email,
      createdAt,
      updatedAt
    }
  }

  private async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
