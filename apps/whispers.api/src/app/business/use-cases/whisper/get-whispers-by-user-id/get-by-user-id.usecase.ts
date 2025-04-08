import { Inject, Injectable } from "@nestjs/common";
import { LoggerService } from "../../../../infrastructure/logger";
import { type IWhisperRepository, WHISPER_REPOSITORY } from "../../../../infrastructure/repositories/whispers";
import { GetWhisperDTO } from "../dtos/get-whisper.dto";

@Injectable()
export class GetWhispersByUserIdUseCase {
  constructor(
    private readonly loggerService: LoggerService,
    @Inject(WHISPER_REPOSITORY) private readonly whisperRepository: IWhisperRepository
  ) { }

  async execute(userId: string): Promise<GetWhisperDTO[]> {
    this.loggerService.info(`Fetching whispers for user ${userId}`);

    const whispers = await this.whisperRepository.findAllByUserId(userId);

    this.loggerService.info(`Fetched ${whispers.length} whispers for user ${userId}`);

    return whispers.map(whisper => ({
      id: whisper.id,
      title: whisper.title,
      content: whisper.content,
      mood: whisper.mood,
      userId: whisper.userId,
      createdAt: whisper.createdAt,
      updatedAt: whisper.updatedAt,
    }));
  }
}
