import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { LoggerService } from "../../../../infrastructure/logger";
import { type IWhisperRepository, WHISPER_REPOSITORY } from "../../../../infrastructure/repositories/whispers";
import { NotificationService } from "../../../../infrastructure/notification";
import { GetWhisperDTO } from "../dtos/get-whisper.dto";

@Injectable()
export class GetWhisperByIdUseCase {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly notificationService: NotificationService,
    @Inject(WHISPER_REPOSITORY) private readonly whisperRepository: IWhisperRepository
  ) { }

  async execute(whisperId: string, userId: string): Promise<GetWhisperDTO | void> {
    this.loggerService.info(`Fetching whisper with ID ${whisperId} for user ${userId}`);

    const whisper = await this.whisperRepository.findOneByIdAndUserId(whisperId, userId);

    if (!whisper) {
      const message = `Whisper with ID ${whisperId} not found`;
      this.loggerService.error(message);
      this.notificationService.add(message, HttpStatus.NOT_FOUND);
      return;
    }

    return {
      id: whisper.id,
      title: whisper.title,
      content: whisper.content,
      mood: whisper.mood,
      userId: whisper.userId,
      createdAt: whisper.createdAt,
      updatedAt: whisper.updatedAt,
    };
  }
}
