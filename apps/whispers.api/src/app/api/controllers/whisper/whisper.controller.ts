import { Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { CreateWhisperUseCase } from "../../../business/use-cases/whisper/create-whisper/create-whisper.usecase";

@Controller({ path: "whispers", version: "1" })
export class WhisperController {
  constructor(private readonly createWhisersUseCase: CreateWhisperUseCase) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createWhisper() {
    const data = {
      title: "Test title",
      content: "Test content",
    };

    return this.createWhisersUseCase.execute(data, "");
  }
}
