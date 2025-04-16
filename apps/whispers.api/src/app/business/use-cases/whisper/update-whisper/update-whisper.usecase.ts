import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { LoggerService } from "../../../../infrastructure/logger";
import { NotificationService } from "../../../../infrastructure/notification";
import { type IWhisperRepository, WHISPER_REPOSITORY } from "../../../../infrastructure/repositories/whispers";
import { UpdateWhisperDTO } from "../dtos/update-whisper.dto";
import { GetWhisperDTO } from "../dtos/get-whisper.dto";

interface UpdateWhisperData {
  data: UpdateWhisperDTO,
  id: string,
  userId: string
}

@Injectable()
export class UpdateWhisperUseCase {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly notificationService: NotificationService,
    @Inject(WHISPER_REPOSITORY) private readonly whisperRepository: IWhisperRepository
  ) { }

  async execute({ data, id, userId }: UpdateWhisperData): Promise<GetWhisperDTO | void> {
    const whisper = await this.whisperRepository.findOneByIdAndUserId(id, userId);

    if (!whisper) {
      const message = `Whisper with id ${id} not found`;
      this.loggerService.error(message);
      this.notificationService.add(message, HttpStatus.NOT_FOUND);
      return;
    }

    const updatedWhisper = await this.whisperRepository.update(id, userId, data);

    return {
      id: updatedWhisper.id,
      title: updatedWhisper.title,
      content: updatedWhisper.content,
      mood: updatedWhisper.mood,
      userId: updatedWhisper.userId,
      createdAt: updatedWhisper.createdAt,
      updatedAt: updatedWhisper.updatedAt
    }
  }
}
