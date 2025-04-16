import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateWhisperDTO {
  userId?: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  title: string;

  @IsString()
  @MaxLength(10000)
  content: string;

  @IsString()
  mood?: string;
}
