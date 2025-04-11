import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { UserId } from "../../../infrastructure/jwt";
import {
  CreateWhisperDTO,
  UpdateWhisperDTO,
  CreateWhisperUseCase,
  DeleteWhisperUseCase,
  GetWhisperByIdUseCase,
  GetWhispersByUserIdUseCase,
  UpdateWhisperUseCase
} from "../../../business/use-cases/whisper";

@Controller({ path: "whispers", version: "1" })
export class WhisperController {
  constructor(
    private readonly createWhiserUseCase: CreateWhisperUseCase,
    private readonly getWhispersUseCase: GetWhispersByUserIdUseCase,
    private readonly getWhisperByIdUseCase: GetWhisperByIdUseCase,
    private readonly updateWhisperUseCase: UpdateWhisperUseCase,
    private readonly deleteWhisperUseCase: DeleteWhisperUseCase,
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

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  updateWhisper(@Param("id") id: string, @Body() data: UpdateWhisperDTO, @UserId() userId: string) {
    return this.updateWhisperUseCase.execute({
      id,
      userId,
      data
    });
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  deleteWhisper(@Param("id") id: string, @UserId() userId: string) {
    return this.deleteWhisperUseCase.execute(id, userId);
  }
}
