import { Inject } from "@nestjs/common";
import { CreateWhisperDTO } from "../dtos/create-whisper.dto";
import { type IWhisperRepository, WHISPER_REPOSITORY } from "../../../../infrastructure/repositories/whispers";
import { LoggerService } from "../../../../infrastructure/logger";
import { GetWhisperDTO } from "../dtos/get-whisper.dto";

export class CreateWhisperUseCase {
  constructor(
    private readonly loggerService: LoggerService,
    @Inject(WHISPER_REPOSITORY) private readonly whisperRepository: IWhisperRepository
  ) { }

  async execute(data: CreateWhisperDTO, userId: string): Promise<GetWhisperDTO> {
    const { title, content, mood } = data;

    this.loggerService.info(`Creating a new whisper for user ${userId}`);

    const whisper = await this.whisperRepository.create({
      content,
      title,
      mood,
      user: {
        connect: {
          id: userId,
        },
      }
    });

    this.loggerService.info(`Whisper created successfully`);
    return {
      id: whisper.id,
      title: whisper.title,
      content: whisper.content,
      createdAt: whisper.createdAt,
      updatedAt: whisper.updatedAt,
      userId: whisper.userId,
      mood: whisper.mood,
    };
  }
}
