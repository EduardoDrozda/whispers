import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { LoggerService } from "../../../../infrastructure/logger";
import { NotificationService } from "../../../../infrastructure/notification";
import { GetAuthDTO } from "../dtos";
import { CreateAuthDTO } from "../dtos/create-auth.dto";
import { JwtService } from "@nestjs/jwt";
import { EnviromentService } from "../../../../infrastructure/enviroment";
import { HashService } from "../../../../infrastructure/hash";
import { type IUserRepository, USER_REPOSITORY } from "../../../../infrastructure/repositories";

@Injectable()
export class CreateAuthUseCase {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly notificationService: NotificationService,
    private readonly jwtService: JwtService,
    private readonly enviromentService: EnviromentService,
    private readonly hashService: HashService,
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository
  ) { }

  async execute(data: CreateAuthDTO): Promise<GetAuthDTO | void> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user || !await this.hashService.compare(data.password, user!.password!)) {
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
