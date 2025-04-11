import { IsString, MaxLength } from "class-validator";

export class UpdateWhisperDTO {
  @IsString()
  @MaxLength(100)
  title?: string;

  @IsString()
  @MaxLength(10000)
  content?: string;

  @IsString()
  mood?: string;
}
