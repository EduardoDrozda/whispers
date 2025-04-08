import { CreateWhisperUseCase } from "./create-whisper/create-whisper.usecase";
import { GetWhisperByIdUseCase } from "./get-whisper-by-id/get-whisper-by-id.usecase";
import { GetWhispersByUserIdUseCase } from "./get-whispers-by-user-id/get-by-user-id.usecase";

export const WHISPER_USE_CASES = [
  CreateWhisperUseCase,
  GetWhispersByUserIdUseCase,
  GetWhisperByIdUseCase
]

export * from "./create-whisper/create-whisper.usecase";
export * from "./get-whisper-by-id/get-whisper-by-id.usecase";
export * from "./get-whispers-by-user-id/get-by-user-id.usecase";
export * from "./dtos/create-whisper.dto";
export * from "./dtos/get-whisper.dto";
