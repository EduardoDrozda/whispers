import { HttpStatus, Inject } from "@nestjs/common";
import { LoggerService } from "../../../../infrastructure/logger";
import { NotificationService } from "../../../../infrastructure/notification";
import { type IUserRepository, USER_REPOSITORY } from "../../../../infrastructure/repositories";
import { GetUserDTO } from "../dtos";

export class GetUserByEmailUseCase {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly notificationService: NotificationService,
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository
  ) { }

  async execute(email: string, returnFullData?: boolean): Promise<GetUserDTO | void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      this.notificationService.add("User not found", HttpStatus.NOT_FOUND);
      return;
    }

    const data: GetUserDTO = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    if (returnFullData) {
      data.password = user.password;
    }

    return data;
  }
}
