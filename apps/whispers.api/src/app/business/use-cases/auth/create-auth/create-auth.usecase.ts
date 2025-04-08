import { HttpStatus, Injectable } from "@nestjs/common";
import { LoggerService } from "../../../../infrastructure/logger";
import { NotificationService } from "../../../../infrastructure/notification";
import { GetUserByEmailUseCase } from "../../users/get-user-by-email/get-user-by-email.usecase";
import { GetAuthDTO } from "../dtos";
import { CreateAuthDTO } from "../dtos/create-auth.dto";
import { JwtService } from "@nestjs/jwt";
import { EnviromentService } from "../../../../infrastructure/enviroment";
import { HashService } from "../../../../infrastructure/hash";

@Injectable()
export class CreateAuthUseCase {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly notificationService: NotificationService,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly jwtService: JwtService,
    private readonly enviromentService: EnviromentService,
    private readonly hashService: HashService,
  ) { }

  async execute(data: CreateAuthDTO): Promise<GetAuthDTO | void> {
    const user = await this.getUserByEmailUseCase.execute(data.email, true);

    if (
      !user
      || this.notificationService.hasNotification
      || await this.hashService.compare(data.password, user!.password!)
    ) {
      this.notificationService.add("Invalid credentials", HttpStatus.UNAUTHORIZED);
      this.loggerService.error(`${this.constructor.name} - Invalid credentials`);
      return;
    }

    const token = await this.jwtService.signAsync({
      id: user!.id,
    });

    return {
      token,
      expiresIn: this.enviromentService.get("JWT_EXPIRES_IN")!,
      user: {
        id: user!.id,
        name: user!.name,
      },
    }
  }
}
