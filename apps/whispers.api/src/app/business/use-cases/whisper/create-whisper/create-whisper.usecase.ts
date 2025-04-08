import { Inject } from "@nestjs/common";
import { CreateWhisperDTO } from "../dtos/create-whisper.dto";
import { type IWhisperRepository, WHISPER_REPOSITORY } from "../../../../infrastructure/repositories/whispers";
import { LoggerService } from "../../../../infrastructure/logger";

export class CreateWhisperUseCase {
  constructor(
    private readonly loggerService: LoggerService,
    @Inject(WHISPER_REPOSITORY) private readonly whisperRepository: IWhisperRepository
  ) { }

  async execute(data: CreateWhisperDTO, userId: string) {
    const { title, content } = data;

    this.loggerService.info(`Creating a new whisper for user ${userId}`);

    const whisper = await this.whisperRepository.create({
      content,
      title,
      user: {
        connect: {
          id: userId,
        },
      }
    });

    this.loggerService.info(`Whisper created successfully`);
    return whisper;
  }
}
