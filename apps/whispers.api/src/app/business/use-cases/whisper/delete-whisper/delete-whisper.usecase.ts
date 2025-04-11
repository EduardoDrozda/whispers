import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { LoggerService } from "../../../../infrastructure/logger";
import { NotificationService } from "../../../../infrastructure/notification";
import { type IWhisperRepository, WHISPER_REPOSITORY } from "../../../../infrastructure/repositories/whispers";

@Injectable()
export class DeleteWhisperUseCase {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly notificationService: NotificationService,
    @Inject(WHISPER_REPOSITORY) private readonly whisperRepository: IWhisperRepository
  ) { }

  async execute(id: string, userId: string): Promise<void> {
    const whisper = await this.whisperRepository.findOneByIdAndUserId(id, userId);

    if (!whisper) {
      const message = `Whisper with id ${id} not found`;
      this.loggerService.error(message);
      this.notificationService.add(message, HttpStatus.NOT_FOUND);
      return;
    }

    await this.whisperRepository.delete(id, userId);
  }
}
