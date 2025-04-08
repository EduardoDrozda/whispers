import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { UserId } from "../../../infrastructure/jwt";
import {
  CreateWhisperDTO,
  CreateWhisperUseCase,
  GetWhisperByIdUseCase,
  GetWhispersByUserIdUseCase
} from "../../../business/use-cases/whisper";

@Controller({ path: "whispers", version: "1" })
export class WhisperController {
  constructor(
    private readonly createWhiserUseCase: CreateWhisperUseCase,
    private readonly getWhispersUseCase: GetWhispersByUserIdUseCase,
    private readonly getWhisperByIdUseCase: GetWhisperByIdUseCase
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createWhisper(@Body() data: CreateWhisperDTO, @UserId() userId: string) {
    return this.createWhiserUseCase.execute(data, userId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getWhispers(@UserId() userId: string) {
    return this.getWhispersUseCase.execute(userId);
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  getWhisperById(@Param("id") id: string, @UserId() userId: string, ) {
    return this.getWhisperByIdUseCase.execute(id, userId);
  }
}
