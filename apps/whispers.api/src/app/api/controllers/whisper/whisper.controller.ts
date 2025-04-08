import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { CreateWhisperUseCase } from "../../../business/use-cases/whisper/create-whisper/create-whisper.usecase";
import { CreateWhisperDTO } from "../../../business/use-cases/whisper/dtos/create-whisper.dto";
import { UserId } from "../../../infrastructure/jwt";

@Controller({ path: "whispers", version: "1" })
export class WhisperController {
  constructor(private readonly createWhisersUseCase: CreateWhisperUseCase) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createWhisper(@Body() data: CreateWhisperDTO, @UserId() userId: string) {
    return this.createWhisersUseCase.execute(data, userId);
  }
}
